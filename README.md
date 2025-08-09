# WSApi.Client (TypeScript SDK)

A TypeScript/JavaScript SDK for integrating with the WSApi API, enabling developers to send WhatsApp messages, manage groups and chats, and receive real-time events via Webhooks or Server-Sent Events (SSE).

## Features

- **HTTP Client**: Simple, strongly-typed client for all API commands (messages, groups, chats, contacts, etc).
- **Events**: Receive real-time events from the API via:
  - **Webhooks**: Configure your endpoint to receive HTTP POST events.
  - **SSE**: Use the built-in SSE client to receive events over a persistent connection.
- **TypeScript Support**: Full type safety with comprehensive TypeScript definitions.
- **Dual Error Handling**: Both throwing and non-throwing method variants for flexible error handling.
- **Cross-Platform**: Works in Node.js, browsers, and other JavaScript environments.

---

## Getting Started

### Prerequisites
- Node.js 16.0 or later (for Node.js environments)
- Modern browser with fetch API support (for browser environments)
- Access to the WSApi API (Valid instance with ID and API key)

### Installation

#### From NPM

```bash
npm install @wsapichat/client
```

Or using Yarn:
```bash
yarn add @wsapichat/client
```

---

## Usage

### 1. Basic Setup

```typescript
import { HttpClient, WSApiClientFactory } from '@wsapichat/client';

const client = WSApiClientFactory.create({
  apiKey: 'your-api-key',
  instanceId: 'your-instance-id'
});

// Send a text message
const result = await client.messages.sendText({
  to: '1234567890@s.whatsapp.net', // Phone number in WhatsApp format
  text: 'Hello from TypeScript SDK!'
});

console.log('Message sent with ID:', result.messageId);
```

### 2. Error Handling

The SDK provides two methods for each API call to handle different error scenarios:

#### Exception-based (throws on error)
```typescript
try {
  const result = await client.messages.sendText(request);
  console.log('Message sent with ID:', result.messageId);
} catch (error) {
  if (error instanceof ApiException) {
    console.log('Failed to send message:', error.problem.detail);
  }
}
```

#### ApiResponse-based (no exceptions)
```typescript
const response = await client.messages.trySendText(request);
if (response.isSuccess) {
  console.log('Message sent with ID:', response.result?.messageId);
} else {
  console.log('Failed to send message:', response.error?.detail);
}
```

### 3. Receiving Events via SSE

```typescript
import { WSApiClientFactory, EventFactory } from '@wsapi/client';

const sseClient = WSApiClientFactory.createSSEClient({
  apiKey: 'your-api-key',
  instanceId: 'your-instance-id'
});

sseClient.on('rawEventReceived', (args) => {
  try {
    const event = EventFactory.parseEvent(args.rawJson);
    
    switch (event.eventType) {
      case 'message':
        const messageEvent = event as MessageEvent;
        console.log('Message received:', messageEvent.text);
        break;
      
      case 'logged-in':
        console.log('Session logged in');
        break;
      
      // Handle other event types as needed
    }
  } catch (error) {
    console.error('Error parsing event:', error);
  }
});

sseClient.on('connectionStateChanged', (args) => {
  console.log('Connection state changed to:', args.state);
  if (args.error) {
    console.error('Connection error:', args.error);
  }
});

// Start the SSE client
await sseClient.start();
```


## License

MIT

## Repository

https://github.com/wsapi-chat/wsapi-node
