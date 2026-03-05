/**
 * Example Webhook Server for WSApi Events
 *
 * This example demonstrates how to:
 * 1. Set up an HTTP server to receive webhook events
 * 2. Parse incoming events using the EventFactory
 * 3. Handle different event types with type-safe handlers
 *
 * Usage:
 * 1. Install dependencies: npm install
 * 2. Start the server: npm start
 * 3. Configure your WSApi instance webhook URL to point to this server
 *
 * The server listens on port 3000 by default (configurable via PORT env var)
 */

import * as http from 'node:http';
import {
  EventFactory,
  EventTypes,
  type WSApiEvent,
  type MessageEvent,
  type ChatPresenceEvent,
  type CallOfferEvent,
  type CallTerminateEvent,
  type SessionLoggedInEvent,
  type SessionLoggedOutEvent,
  type SessionLoggedErrorEvent,
  type UserPresenceEvent,
} from '@wsapichat/client';

const PORT = process.env.PORT || 3000;

/**
 * Event handler registry for type-safe event handling
 */
type EventHandler<T extends WSApiEvent> = (event: T) => void | Promise<void>;

const eventHandlers: Partial<Record<string, EventHandler<any>>> = {
  /**
   * Handle new message events
   */
  [EventTypes.MESSAGE]: (event: MessageEvent) => {
    console.log('\n📨 New Message Received:');
    console.log(`   From: ${event.senderName} (${event.sender?.id})`);
    console.log(`   Chat: ${event.chatId}`);
    console.log(`   Type: ${event.type}`);
    if (event.text) {
      console.log(`   Text: ${event.text}`);
    }
    if (event.media) {
      console.log(`   Media: ${event.media.mimeType} (${event.media.fileSize} bytes)`);
    }
    console.log(`   Time: ${event.time}`);
    console.log(`   Group: ${event.isGroup}`);
  },

  /**
   * Handle chat presence changes (typing, online, etc.)
   */
  [EventTypes.CHAT_PRESENCE]: (event: ChatPresenceEvent) => {
    console.log('\n👀 Presence Update:');
    console.log(`   User: ${event.userId}`);
    console.log(`   Chat: ${event.chatId}`);
    console.log(`   Status: ${event.status}`);
    console.log(`   Updated: ${event.lastUpdated}`);
  },

  /**
   * Handle user presence changes
   */
  [EventTypes.USER_PRESENCE]: (event: UserPresenceEvent) => {
    console.log('\n🟢 User Presence:');
    console.log(`   User: ${event.id}`);
    console.log(`   Status: ${event.status}`);
    console.log(`   Last Seen: ${event.lastSeen}`);
  },

  /**
   * Handle incoming call offers
   */
  [EventTypes.CALL_OFFER]: (event: CallOfferEvent) => {
    console.log('\n📞 Incoming Call:');
    console.log(`   Call ID: ${event.id}`);
    console.log(`   From: ${event.caller}`);
    console.log(`   Video: ${event.isVideo}`);
    console.log(`   Group: ${event.isGroup}`);
    console.log(`   Time: ${event.time}`);
  },

  /**
   * Handle call termination
   */
  [EventTypes.CALL_TERMINATE]: (event: CallTerminateEvent) => {
    console.log('\n📴 Call Ended:');
    console.log(`   Call ID: ${event.id}`);
    console.log(`   Reason: ${event.reason}`);
    console.log(`   Duration: ${event.duration ? `${event.duration}s` : 'N/A'}`);
    console.log(`   Ended: ${event.terminatedAt}`);
  },

  /**
   * Handle session login
   */
  [EventTypes.LOGGED_IN]: (event: SessionLoggedInEvent) => {
    console.log('\n✅ Session Logged In:');
    console.log(`   Device: ${event.deviceId}`);
    console.log(`   Instance: ${event.instanceId}`);
  },

  /**
   * Handle session logout
   */
  [EventTypes.LOGGED_OUT]: (event: SessionLoggedOutEvent) => {
    console.log('\n❌ Session Logged Out:');
    console.log(`   Instance: ${event.instanceId}`);
  },

  /**
   * Handle session errors
   */
  [EventTypes.LOGGED_ERROR]: (event: SessionLoggedErrorEvent) => {
    console.log('\n⚠️ Session Error:');
    console.log(`   Error: ${event.error}`);
    console.log(`   Code: ${event.errorCode || 'N/A'}`);
  },
};

/**
 * Process a parsed event and dispatch to appropriate handler
 */
function handleEvent(event: WSApiEvent): void {
  const handler = eventHandlers[event.eventType];
  if (handler) {
    handler(event);
  } else {
    console.log(`\n📋 Unhandled Event Type: ${event.eventType}`);
    console.log(`   Instance: ${event.instanceId}`);
    console.log(`   Received: ${event.receivedAt}`);
  }
}

/**
 * Read request body as string
 */
function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

/**
 * Create and start the HTTP server
 */
const server = http.createServer(async (req, res) => {
  // Health check endpoint
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // Webhook endpoint
  if (req.method === 'POST' && (req.url === '/webhook' || req.url === '/')) {
    try {
      const body = await readBody(req);

      if (!body) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Empty request body' }));
        return;
      }

      // Parse the event using EventFactory
      const event = EventFactory.parseEvent(body);

      // Handle the event
      handleEvent(event);

      // Respond with success
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true, eventType: event.eventType }));
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 'Failed to process event',
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      );
    }
    return;
  }

  // 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Start the server
server.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 WSApi Webhook Server Started');
  console.log('='.repeat(60));
  console.log(`\n📡 Listening on port ${PORT}`);
  console.log(`\n📌 Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/webhook - Receive events`);
  console.log(`   GET  http://localhost:${PORT}/health  - Health check`);
  console.log(`\n💡 Configure your WSApi instance to send webhooks to:`);
  console.log(`   http://your-server:${PORT}/webhook`);
  console.log(`\n📋 Supported Events:`);
  EventFactory.getSupportedEventTypes().forEach((type) => {
    const hasHandler = eventHandlers[type] ? '✓' : ' ';
    console.log(`   [${hasHandler}] ${type}`);
  });
  console.log('\n' + '='.repeat(60));
  console.log('Waiting for events...\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});
