# Quiz Time - Kahoot-style Quiz Game

## Overview

Real-time multiplayer quiz game platform similar to Kahoot. Hosts create quizzes and start game sessions with a PIN code. Players join via PIN or QR code on their phones and answer questions in real-time.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **API framework**: Express 5
- **Real-time**: Socket.IO (server + client)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Architecture

### Frontend (`artifacts/quiz-app`)
- Landing page with Join/Host options
- Admin panel for quiz CRUD
- Host view with PIN display, QR code, player list, game control
- Player view with answer buttons, timer, score feedback
- Socket.IO client for real-time gameplay

### Backend (`artifacts/api-server`)
- REST API for quiz/question/game CRUD
- Socket.IO server for real-time game synchronization
- Game rooms managed in-memory with player scores, timers

### Database Schema
- `quizzes`: id, title, description, created_at
- `questions`: id, quiz_id, text, options (jsonb), correct_index, time_limit, order_index
- `game_sessions`: id, quiz_id, pin (unique), status, created_at

### Socket.IO Events
- Host creates room → players join → host starts → questions sync in real-time
- Scoring: 500 base + time bonus (up to 500)
- Socket path: `/api/socket.io`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
