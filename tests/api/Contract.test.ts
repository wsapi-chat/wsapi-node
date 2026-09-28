import { afterEach, describe, expect, it, vi } from 'vitest';
import { HttpClient } from '../../src/ApiClient/HttpClient';
import { MessagesClient } from '../../src/ApiClient/MessagesClient';
import { GroupsClient } from '../../src/ApiClient/GroupsClient';
import { SessionClient } from '../../src/ApiClient/SessionClient';
import { ChatsClient } from '../../src/ApiClient/ChatsClient';
import { CallsClient } from '../../src/ApiClient/CallsClient';
import { AccountClient } from '../../src/ApiClient/AccountClient';
import { EventFactory } from '../../src/Events/EventFactory';

afterEach(() => vi.unstubAllGlobals());

function transport(status = 200, payload: unknown = { id: 'created' }) {
  const fetch = vi.fn(
    async () =>
      new Response(status === 204 ? null : JSON.stringify(payload), {
        status,
        headers: { 'Content-Type': 'application/json' },
      }),
  );
  vi.stubGlobal('fetch', fetch);
  return { fetch, http: new HttpClient({ baseUrl: 'https://contract.invalid' }) };
}

describe('current REST contract through the real HTTP serializer', () => {
  it.each(['Image', 'Video', 'Audio', 'Voice', 'Document', 'Sticker'] as const)(
    'normalizes legacy %s fields for both error-handling variants',
    async (kind) => {
      const { http, fetch } = transport();
      const client = new MessagesClient(http);
      const stem = kind.toLowerCase();
      const request = {
        to: '12025550123',
        [stem + 'Url']: 'https://example.com/legacy',
        url: 'https://example.com/current',
        [stem + 'Base64']: 'YWJj',
        fileName: 'doc.pdf',
      };
      for (const prefix of ['send', 'trySend']) {
        const method = (prefix + kind + 'Async') as 'sendImageAsync';
        await client[method](request);
        const [url, options] = fetch.mock.calls.at(-1)! as unknown as [string, RequestInit];
        expect(url).toBe('https://contract.invalid/messages/' + stem);
        expect(options.method).toBe('POST');
        expect(JSON.parse(options.body as string)).toEqual({
          to: '12025550123',
          data: 'YWJj',
          url: 'https://example.com/current',
          filename: 'doc.pdf',
        });
      }
      expect(request[stem + 'Url']).toBe('https://example.com/legacy');
    },
  );

  it.each(['sendEditTextAsync', 'trySendEditTextAsync'] as const)('edits with %s', async (method) => {
    const { http, fetch } = transport();
    await new MessagesClient(http)[method]('msg', { to: '12025550123', text: 'edited' });
    expect(fetch.mock.calls[0]).toEqual([
      'https://contract.invalid/messages/msg/edit',
      expect.objectContaining({ method: 'POST' }),
    ]);
  });

  it.each([
    ['markAsReadAsync', 'read'],
    ['starAsync', 'star'],
    ['deleteAsync', 'delete'],
    ['deleteForMeAsync', 'delete-for-me'],
    ['pinMessageAsync', 'pin'],
  ] as const)('%s handles 204 in normal and Try variants', async (method, path) => {
    const { http, fetch } = transport(204);
    const client = new MessagesClient(http);
    const request = {
      chatId: '12025550123@s.whatsapp.net',
      senderId: '12025550123@s.whatsapp.net',
      receiptType: 'read',
      starred: false,
      pinned: false,
      time: new Date('2026-09-21T00:00:00Z'),
    };
    await client[method]('msg', request);
    const tryMethod = ('try' + method[0].toUpperCase() + method.slice(1)) as 'tryDeleteAsync';
    expect((await client[tryMethod]('msg', request)).isSuccess).toBe(true);
    for (const call of fetch.mock.calls) {
      const [url, options] = call as unknown as [string, RequestInit];
      expect(url).toBe('https://contract.invalid/messages/msg/' + path);
      expect(options.method).toBe('POST');
      const body = JSON.parse(options.body as string);
      expect(body.starred).toBe(false);
      expect(body.timestamp).toBe('2026-09-21T00:00:00.000Z');
      expect(body).not.toHaveProperty('time');
    }
  });

  it('uses settings paths and canonical bool fields, preserving false', async () => {
    const { http, fetch } = transport(204);
    const groups = new GroupsClient(http);
    await groups.setAnnounceAsync('g', { announce: true, enabled: false });
    await groups.trySetLockedAsync('g', { locked: true });
    await groups.setJoinApprovalAsync('g', { enabled: true });
    await groups.trySetMemberAddModeAsync('g', { onlyAdmins: true });
    const calls = fetch.mock.calls as unknown as [string, RequestInit][];
    expect(calls.map(([url]) => url.replace('https://contract.invalid', ''))).toEqual([
      '/groups/g/settings/announce',
      '/groups/g/settings/locked',
      '/groups/g/settings/join-approval',
      '/groups/g/settings/member-add-mode',
    ]);
    expect(calls.map(([, o]) => JSON.parse(o.body as string))).toEqual([
      { enabled: false },
      { enabled: true },
      { enabled: true },
      { onlyAdminAdd: true },
    ]);
  });

  it('rotates invites with POST and returns the current link shape', async () => {
    const { http, fetch } = transport(200, { link: 'https://chat.whatsapp.com/example' });
    const groups = new GroupsClient(http);
    expect((await groups.getInviteLinkAsync('g', true)).link).toContain('example');
    expect((await groups.tryGetInviteLinkAsync('g', true)).result?.link).toContain('example');
    expect(fetch.mock.calls[0]).toEqual([
      'https://contract.invalid/groups/g/invite-link/reset',
      expect.objectContaining({ method: 'POST' }),
    ]);
  });

  it('does not parse JSON from a successful empty invite response', async () => {
    const { http } = transport(204);
    const groups = new GroupsClient(http);
    const request = { groupId: 'g', inviterId: 'u', code: 'code' };
    expect(await groups.joinByInviteAsync(request)).toBeUndefined();
    expect((await groups.tryJoinByInviteAsync(request)).isSuccess).toBe(true);
  });

  it('uses current session, presence, clear, leave and call routes', async () => {
    const { http, fetch } = transport();
    const session = new SessionClient(http);
    await session.getLoginQRCodeAsync();
    await session.tryGetLoginPairCodeAsync('12025550123');
    const chats = new ChatsClient(http);
    await chats.setPresenceAsync('c', { state: 'typing' });
    await chats.updateEphemeralAsync('c', { ephemeralExpiration: 'off' });
    await chats.clearAsync('c');
    await new GroupsClient(http).leaveAsync('g');
    await new CallsClient(http).rejectCallAsync('call', { callerId: 'u' });
    const calls = fetch.mock.calls as unknown as [string, RequestInit][];
    expect(calls.map(([u, o]) => [o.method, u.replace('https://contract.invalid', '')])).toEqual([
      ['GET', '/session/qr/text'],
      ['GET', '/session/pair-code/12025550123'],
      ['PUT', '/chats/c/presence'],
      ['PUT', '/chats/c/ephemeral'],
      ['POST', '/chats/c/clear'],
      ['POST', '/groups/g/leave'],
      ['POST', '/calls/call/reject'],
    ]);
    expect(JSON.parse(calls[3][1].body as string)).toEqual({ expiration: 'off' });
  });

  it('encodes optional instance names in both variants', async () => {
    const { http, fetch } = transport(200, 'instance');
    const account = new AccountClient(http);
    await account.createSubscriptionInstanceAsync('sub', 'A + B& C');
    await account.tryCreateSubscriptionInstanceAsync('sub', 'A + B& C');
    for (const call of fetch.mock.calls) expect(new URL(call[0]).searchParams.get('name')).toBe('A + B& C');
  });
});

it('preserves optional CTWA attribution in messages and history', () => {
  const message = {
    id: 'm',
    time: '2026-09-21T00:00:00Z',
    chatId: 'c',
    sender: { id: 'u' },
    type: 'text',
    text: 'hello',
    adReferral: { ctwaClid: 'click', showAdAttribution: false },
  };
  const envelope = {
    eventId: 'e',
    instanceId: 'i',
    receivedAt: message.time,
    eventType: 'message',
    eventData: message,
  };
  const event = EventFactory.parseRawEvent(envelope);
  if (event.eventType === 'message') expect(event.adReferral?.ctwaClid).toBe('click');
  const history = EventFactory.parseRawEvent({
    ...envelope,
    eventType: 'message_history_sync',
    eventData: { messages: [message] },
  });
  if (history.eventType === 'message_history_sync') expect(history.messages[0].adReferral).toEqual(message.adReferral);
  expect(() =>
    EventFactory.parseRawEvent({ ...envelope, eventData: { ...message, adReferral: undefined } }),
  ).not.toThrow();
});
