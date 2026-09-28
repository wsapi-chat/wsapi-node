import { describe, it, expect, vi, afterEach } from 'vitest';
import { WSApiClient } from '../../src/ApiClient/WSApiClient';

// Observe what actually goes out on the wire instead of asking the SDK.
function stubFetch() {
  const calls: { url: string; headers: Record<string, string> }[] = [];
  const fetchMock = vi.fn(async (input: any, init: any = {}) => {
    calls.push({ url: String(input), headers: { ...init.headers } });
    return new Response('', { status: 401 });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { calls, fetchMock };
}

async function firstStreamRequest(calls: { url: string }[]) {
  await vi.waitFor(() => expect(calls.some((c) => c.url.endsWith('/events/stream'))).toBe(true));
  return calls.find((c) => c.url.endsWith('/events/stream'))!;
}

describe('SSEClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the API key and instance ID as headers on /events/stream', async () => {
    const { calls } = stubFetch();
    const client = new WSApiClient({
      baseUrl: 'https://api.example.test',
      apiKey: 'key-123',
      instanceId: 'ins-456',
      sseOptions: { sseConfig: { autoReconnect: false } },
    });

    await client.sse.startAsync();
    const req = await firstStreamRequest(calls);
    client.sse.dispose();

    expect(req.headers['X-API-Key']).toBe('key-123');
    expect(req.headers['X-Instance-Id']).toBe('ins-456');
    expect(req.url).not.toContain('key-123');
  });

  it('keeps the credentials when custom SSE headers are given', async () => {
    const { calls } = stubFetch();
    const client = new WSApiClient({
      baseUrl: 'https://api.example.test',
      apiKey: 'key-123',
      instanceId: 'ins-456',
      sseOptions: { sseConfig: { autoReconnect: false, headers: { 'X-Trace': 't1' } } },
    });

    await client.sse.startAsync();
    const req = await firstStreamRequest(calls);
    client.sse.dispose();

    expect(req.headers['X-API-Key']).toBe('key-123');
    expect(req.headers['X-Instance-Id']).toBe('ins-456');
    expect(req.headers['X-Trace']).toBe('t1');
  });
});
