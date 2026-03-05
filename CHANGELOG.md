# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased] - v2

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
