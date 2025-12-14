# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run build        # Build with tsup (outputs CJS + ESM to dist/)
npm run dev          # Watch mode for development
npm run type-check   # TypeScript type checking without emitting
```

## Test Commands

```bash
npm run test              # Run all tests once
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npx vitest tests/api/MessagesClient.test.ts  # Run a single test file
```

## Architecture

This is a TypeScript SDK for the WSApi WhatsApp Business API. The package is published as `@wsapichat/client`.

### Core Components

**WSApiClient** (`src/ApiClient/WSApiClient.ts`) - Main entry point that unifies:
- Domain-specific API clients (messages, groups, chats, contacts, etc.)
- SSE client for real-time events
- Event handler registration system

**HttpClient** (`src/ApiClient/HttpClient.ts`) - HTTP infrastructure with dual error handling:
- Throwing methods: `get()`, `post()`, `put()`, `delete()` - throw `ApiException` on failure
- Non-throwing methods: `tryGet()`, `tryPost()`, etc. - return `ApiResponse<T>` with success/error info

### Domain API Clients

Each domain has an interface (`I*Client.ts`) and implementation (`*Client.ts`):
- `MessagesClient` - Send text, media, contacts, locations
- `GroupsClient` - Create/manage groups, participants
- `ChatsClient` - Archive, mute, pin, ephemeral settings
- `ContactsClient` - Contact info, business profiles, pictures
- `AccountClient` - Profile name, status, picture, presence
- `SessionClient` - QR/pair code login, logout
- `InstanceClient` - Instance settings
- `UsersClient` - User info lookup
- `MediaClient` - Media download
- `CallsClient` - Reject incoming calls

### Event System

**SSE Client** (`src/SSE/SSEClient.ts`) - Persistent connection for real-time events
**EventFactory** (`src/Events/EventFactory.ts`) - Parses raw JSON into typed event objects
**Event Types** (`src/Events/*/`) - Strongly-typed events organized by domain:
- Session: `logged-in`, `logged-out`, `logged-error`
- Messages: `message`, `message_delete`, `message_history_sync`, `message_read`, `message_star`
- Chats: `chat_presence`, `chat_setting`
- Users: `user_push_name`, `user_picture`, `user_presence`, `user_status`
- Calls: `call_offer`, `call_accept`, `call_terminate`
- Contacts: `contact`

### Models

- `src/Models/Constants/` - Enums and constants (EventTypes, MediaTypes, etc.)
- `src/Models/Entities/` - Data structures returned from API
- `src/Models/Requests/` - Request payloads for API calls

## Code Patterns

- All API client methods follow the dual pattern: throwing (`sendTextAsync()`) and non-throwing (`trySendTextAsync()`)
- WhatsApp IDs use format: `{phone}@s.whatsapp.net` for users, `{id}@g.us` for groups
- Build uses tsup with CJS + ESM dual output and TypeScript declarations
- Tests use vitest with MockHttpClient (`tests/mocks/MockHttpClient.ts`) for mocking HTTP calls
