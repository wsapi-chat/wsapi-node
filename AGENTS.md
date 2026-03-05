# AGENTS.md

Guidance for AI agents working with this codebase.

## Build & Test

```bash
npm run build          # Build with tsup (CJS + ESM to dist/)
npm run test           # Run all tests
npm run lint           # ESLint
npm run format:check   # Prettier check
npm run type-check     # TypeScript type checking
```

## Project Structure

- `src/ApiClient/` — HTTP client (`HttpClient.ts`) and domain API clients (Messages, Groups, Chats, Contacts, Account, Session, Users, Media, Calls, Communities, Newsletters, Status)
- `src/Events/` — `EventFactory.ts` parses raw JSON into typed events. Event types organized by domain under subdirectories.
- `src/Models/` — `Constants/` (enums), `Entities/` (response types), `Requests/` (request payloads)
- `src/SSE/` — `SSEClient.ts` for persistent real-time event connections
- `tests/api/` — Unit tests for each API client using `MockHttpClient`
- `tests/events/` — EventFactory tests
- `tests/mocks/` — `MockHttpClient.ts` for mocking HTTP calls

## Key Patterns

### Dual Error Handling

Every API method has two variants:

- Throwing: `sendTextAsync()` — throws `ApiException` on failure
- Non-throwing: `trySendTextAsync()` — returns `ApiResponse<T>`

### Adding a New API Client

1. Create `I{Domain}Client.ts` (interface) and `{Domain}Client.ts` (implementation) in `src/ApiClient/`
2. Both throwing and non-throwing methods must be implemented
3. Add exports to `src/index.ts`
4. Compose into `WSApiClient`
5. Add tests in `tests/api/` using `MockHttpClient`

### Adding a New Event Type

1. Define the event interface in `src/Events/{Domain}/`
2. Add the event type constant in `src/Models/Constants/EventTypes.ts`
3. Register the parser in `EventFactory.eventTypeMap`
4. Export from `src/index.ts`
5. Add tests in `tests/events/EventFactory.test.ts`

### WhatsApp IDs

- Users: `{phone}@s.whatsapp.net`
- Groups: `{id}@g.us`
