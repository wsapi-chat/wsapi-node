# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- SSE: the stream now sends `X-API-Key` and `X-Instance-Id`. Previously `/events/stream` went out without credentials, so the connection was always rejected. Custom `sseConfig.headers` now extend the credentials instead of replacing them.
- `EventTypes.LOGGED_ERROR` is now `'login_error'`, the name the API sends. Handlers and event filters registered for it never matched before.

## [3.0.0]

Breaking changes: requires Node.js >=20; response types use the current REST field names, and join-by-invite returns void instead of an object. Update consumers of the previous response shapes before upgrading.

Corrected session, message, group, chat and call routes in both normal and Try methods. Legacy media/group request names are normalized to current REST fields; prefer `data`, `url`, `filename`, `vcard`, `enabled`, `onlyAdminAdd`, `expiration` and `timestamp`. Added reply sender/expiration and optional media fields. Response types now reflect actual wire fields: QR `code`, session `isConnected/isLoggedIn`, invitation `link`, join-link `id`, join requests `user`. Join-by-invite now returns void after HTTP 204 (update callers expecting an object). Added optional `adReferral`, media filename and reply text, including history events. Account instance creation accepts an optional name.

## [2.0.0]

### Added

- Communities API client (`CommunitiesClient`)
- Newsletters API client (`NewslettersClient`)
- Status API client (`StatusClient`)
- Calls API client (`CallsClient`)
- Newsletter events support
- Group events support
- Chat push name, status, and picture events
- ESLint and Prettier configuration
- CI/CD workflows (build, test, lint, release)
- GitHub issue and PR templates
- Contributing guide and changelog

### Changed

- Updated minimum Node.js version to 18
- Expanded event system with additional event types

## [1.0.10] - 2025-01-14

### Fixed

- Several fixes and updates across API clients

## [1.0.9] - 2025-01-07

### Fixed

- Bug fixes and stability improvements

## [1.0.8] - 2024-12-20

### Fixed

- Bug fixes and improvements

## [1.0.5] - 2024-12-10

### Added

- Constants and types for chat and message features
- Mute, pin, ephemeral settings support
- Media types support

## [1.0.4] - 2024-12-05

### Added

- README with project overview, features, installation, and usage

## [1.0.3] - 2024-12-01

### Changed

- Refactored media download methods to use media ID

## [1.0.0] - 2024-11-25

### Added

- Initial release
- WSApiClient with unified API access
- MessagesClient for sending text and media messages
- GroupsClient for group management
- ChatsClient for chat settings
- ContactsClient for contact information
- AccountClient for profile management
- SessionClient for QR/pair code login
- UsersClient for user info lookup
- MediaClient for media downloads
- SSE client for real-time events
- EventFactory for typed event parsing
- TypeScript declarations with CJS + ESM dual output
