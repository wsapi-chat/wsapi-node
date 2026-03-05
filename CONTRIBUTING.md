# Contributing to WSApi Node.js SDK

Thank you for your interest in contributing! This guide will help you get started.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/wsapi-node.git
   cd wsapi-node
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Commands

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run build`         | Build with tsup (CJS + ESM output) |
| `npm run dev`           | Watch mode for development         |
| `npm run test`          | Run all tests                      |
| `npm run test:watch`    | Run tests in watch mode            |
| `npm run test:coverage` | Run tests with coverage            |
| `npm run lint`          | Run ESLint                         |
| `npm run lint:fix`      | Run ESLint with auto-fix           |
| `npm run format`        | Format code with Prettier          |
| `npm run format:check`  | Check formatting                   |
| `npm run type-check`    | TypeScript type checking           |

## Project Structure

| Directory        | Description                                   |
| ---------------- | --------------------------------------------- |
| `src/ApiClient/` | HTTP client and domain-specific API clients   |
| `src/Events/`    | Typed event definitions and EventFactory      |
| `src/Models/`    | Constants, request payloads, and entity types |
| `src/SSE/`       | Server-Sent Events client                     |
| `tests/api/`     | API client unit tests                         |
| `tests/events/`  | Event parsing tests                           |
| `tests/mocks/`   | Mock HTTP client for testing                  |

## Key Patterns

### Dual Error Handling

All API client methods follow a dual pattern:

- **Throwing methods** (`sendTextAsync()`) — throw `ApiException` on failure
- **Non-throwing methods** (`trySendTextAsync()`) — return `ApiResponse<T>` with success/error info

### Client Composition

Each domain has an interface (`I*Client.ts`) and implementation (`*Client.ts`). The main `WSApiClient` composes all domain clients together.

### WhatsApp IDs

- Users: `{phone}@s.whatsapp.net`
- Groups: `{id}@g.us`

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `test:` — adding or updating tests
- `refactor:` — code refactoring
- `chore:` — maintenance tasks

## Submitting a Pull Request

1. Ensure your code builds: `npm run build`
2. Ensure all tests pass: `npm run test`
3. Ensure linting passes: `npm run lint`
4. Ensure formatting is correct: `npm run format:check`
5. Push your branch and open a pull request against `main`

## Reporting Issues

Use the [GitHub issue templates](https://github.com/wsapi-chat/wsapi-node/issues/new/choose) to report bugs or request features.
