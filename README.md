# Find Job

## i. Project Overview

A simple job board platform for posting jobs and managing applications.

**Key Features:**

- Job posting management (CRUD)
- Dynamic application forms with drag & drop
- Authentication & Authorization
- Table with sorting, filtering, and pagination
- Hand pose detection for photo verification

## ii. Tech Stack Used

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **UI Components:** Radix UI + Tailwind CSS
- **State Management:** TanStack Query
- **Form Handling:** React Hook Form + Zod
- **Authentication:** JWT + bcryptjs
- **Table:** TanStack Table + DnD Kit
- **AI/ML:** TensorFlow.js (Hand Pose Detection)
- **Development:** Docker, Husky, ESLint, Prettier

## iii. How to Run Locally

### Prerequisites

- Node.js 18+
- pnpm
- Docker

### Setup Steps

**1. Install Dependencies**

```bash
pnpm install
```

**2. Setup Database**

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Verify database is running
docker-compose ps
```

**3. Configure Environment**

```bash
# Copy environment file
cp .env.example .env
```

Default configuration:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/find_job_db?schema=public"
JWT_SECRET="your-secret-key-change-this"
NODE_ENV="development"
```

**4. Run Migrations**

```bash
# Generate Prisma Client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed database (optional)
pnpm prisma:seed
```

**5. Start Development Server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Management

```bash
# Stop database
docker-compose down

# Reset database
pnpm prisma:reset

# Access PostgreSQL CLI
docker exec -it find-job-db psql -U postgres -d find_job_db
```

## Documentation

- [API Documentation](src/docs/API.md)
