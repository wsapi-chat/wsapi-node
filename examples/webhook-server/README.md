# WSApi Webhook Server Example

This example demonstrates how to set up an HTTP server to receive and parse webhook events from WSApi.

## Features

- Receives webhook POST requests
- Verifies HMAC-SHA256 webhook signatures (when `WEBHOOK_SIGNING_SECRET` is set)
- Parses events using the `EventFactory` from `@wsapichat/client`
- Type-safe event handling for different event types
- Health check endpoint
- Graceful shutdown

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

Or with hot-reload for development:

```bash
npm run dev
```

3. Configure your WSApi instance webhook URL to point to your server:

```
http://your-server:3000/webhook
```

## Endpoints

| Method | Path       | Description          |
| ------ | ---------- | -------------------- |
| POST   | `/webhook` | Receive events       |
| POST   | `/`        | Receive events (alt) |
| GET    | `/health`  | Health check         |

## Environment Variables

| Variable                 | Default | Description                                                                     |
| ------------------------ | ------- | ------------------------------------------------------------------------------- |
| `PORT`                   | `3000`  | Server port                                                                     |
| `WEBHOOK_SIGNING_SECRET` | (none)  | HMAC-SHA256 signing secret. When set, incoming webhook signatures are verified. |

## Example Event Payload

```json
{
  "receivedAt": "2025-01-01T12:00:00Z",
  "instanceId": "your-instance-id",
  "eventType": "message",
  "eventData": {
    "id": "msg123",
    "chatId": "1234567890@s.whatsapp.net",
    "sender": {
      "id": "1234567890@s.whatsapp.net",
      "name": "John"
    },
    "senderName": "John Doe",
    "time": "2025-01-01T11:59:00Z",
    "isGroup": false,
    "isStatus": false,
    "type": "text",
    "text": "Hello, World!",
    "expiration": "off"
  }
}
```

## Testing with curl

Send a test message event (without signature verification):

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "receivedAt": "2025-01-01T12:00:00Z",
    "instanceId": "test-instance",
    "eventType": "message",
    "eventData": {
      "id": "msg123",
      "chatId": "1234567890@s.whatsapp.net",
      "sender": { "id": "1234567890@s.whatsapp.net" },
      "senderName": "Test User",
      "time": "2025-01-01T11:59:00Z",
      "isGroup": false,
      "isStatus": false,
      "type": "text",
      "text": "Hello, World!",
      "expiration": "off"
    }
  }'
```

Send a test event with a signature (when `WEBHOOK_SIGNING_SECRET` is set):

```bash
BODY='{"receivedAt":"2025-01-01T12:00:00Z","instanceId":"test-instance","eventType":"message","eventData":{"id":"msg123","chatId":"1234567890@s.whatsapp.net","sender":{"id":"1234567890@s.whatsapp.net"},"senderName":"Test User","time":"2025-01-01T11:59:00Z","isGroup":false,"isStatus":false,"type":"text","text":"Hello, World!","expiration":"off"}}'
SECRET="your-signing-secret"
SIGNATURE="sha256=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"

curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: $SIGNATURE" \
  -d "$BODY"
```

Check health:

```bash
curl http://localhost:3000/health
```

## Adding Custom Event Handlers

To add handlers for additional event types, modify the `eventHandlers` object in `server.ts`:

```typescript
import { EventTypes } from '@wsapichat/client';

const eventHandlers = {
  // ... existing handlers

  [EventTypes.MESSAGE_DELETE]: (event: MessageDeleteEvent) => {
    console.log('Message deleted:', event.messageId);
  },

  [EventTypes.CONTACT]: (event: ContactEvent) => {
    console.log('Contact updated:', event.name);
  },
};
```
