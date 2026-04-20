# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Acquisitions is a Node.js/Express-based API for user authentication and management. It uses Drizzle ORM with PostgreSQL for data persistence and implements JWT-based authentication with role-based access control.

## Architecture

### Layered Structure

The codebase follows a clean MVC-inspired layered architecture with clear separation of concerns:

- **Controllers** (`src/controllers/`) - Handle HTTP request/response logic and validation orchestration
- **Services** (`src/services/`) - Contain business logic and database operations  
- **Models** (`src/models/`) - Define database schemas using Drizzle ORM
- **Routes** (`src/routes/`) - Define API endpoints and route handlers
- **Utilities** (`src/utils/`) - Reusable helper functions (JWT tokens, cookies, formatting)
- **Validations** (`src/validations/`) - Zod schemas for request validation
- **Config** (`src/config/`) - Configuration for database and logging

### Data Flow

Requests flow through: Routes → Controllers → Services → Models/Database. Controllers handle validation (using Zod schemas), call services for business logic, and services interact with the database via Drizzle ORM.

### Key Technologies

- **Express** - HTTP server framework
- **Drizzle ORM** - Type-safe PostgreSQL ORM
- **Zod** - Schema validation
- **Winston** - Structured logging
- **JWT & bcrypt** - Authentication and password hashing
- **Helmet, CORS** - Security middleware

## Common Commands

### Development
- `npm run dev` - Start dev server with auto-reload
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Fix ESLint violations automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Database
- `npm run db:generate` - Generate Drizzle migrations from models
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio for database management (GUI)

## Database & Environment

Database connection is configured via `DATABASE_URL` environment variable (PostgreSQL). The project uses `.env` file for local development. Drizzle migrations are stored in the `drizzle/` directory.

## Code Style

- 2-space indentation
- Single quotes for strings
- Semicolons required
- ES2022+ module syntax (`import`/`export`)
- ESLint enforces: `no-var`, `prefer-const`, `object-shorthand`, `prefer-arrow-callback`
- Unused function parameters should be prefixed with `_` to suppress warnings

## Logging

Winston logger is configured in `src/config/logger.js`. In development, logs output to console and files (`logs/error.log`, `logs/combined.log`). The logger is integrated with Morgan for HTTP request logging.
