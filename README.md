## SkillCircle Workspace

The repo is now split into separate folders so the app is easier to scale:

- `frontend/`: Next.js 16 app and UI
- `backend/`: API service
- `db/`: shared Prisma/Postgres layer

## First setup

Install workspace dependencies from the repo root:

```bash
npm install
```

Copy env files:

```bash
cp backend/.env.example backend/.env
cp db/.env.example db/.env
```

## Common commands

From the repo root:

```bash
npm run dev:frontend
npm run dev:backend
npm run db:generate
npm run db:migrate
```

## Database

The initial database layer uses Prisma with PostgreSQL.

- `db/prisma/schema.prisma` holds the schema
- `db/src/client.ts` exports the shared Prisma client
- `backend/src/routes/db.ts` exposes a simple ping endpoint for connection testing

If you want a local Postgres instance, start one from the `db/` folder with Docker Compose after creating your `.env` file.
