# API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

All API endpoints (except public routes) require authentication via JWT token stored in cookie `auth-token`.

---

## Public Routes

### 1. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "roles": ["Admin"]
    }
  }
}
```

**CURL:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

### 2. Register

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "newuser@example.com",
      "roles": ["Applicant"]
    }
  }
}
```

**CURL:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123"
  }'
```

---

### 3. Logout

**Endpoint:** `POST /api/auth/logout`

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

**CURL:**

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

---

## Protected Routes

### 4. Get Current User

**Endpoint:** `GET /api/auth/me`

**Headers:**

- `Cookie: auth-token=YOUR_TOKEN`

**Response:**

```json
{
  "success": true,
  "message": "Success get user data",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "roles": ["Admin"],
    "candidate": null,
    "createdAt": "2025-01-16T10:00:00.000Z"
  }
}
```

**CURL:**

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

---

## Admin Routes

### 5. Create Job

**Endpoint:** `POST /api/admin/create-job`

**Required Role:** `Admin`

**Headers:**

- `Cookie: auth-token=YOUR_TOKEN`
- `Content-Type: application/json`

**Request Body:**

```json
{
  "title": "Senior Developer",
  "jobType": "Full-time",
  "description": "We are looking for a senior developer...",
  "numberOfCandidates": "5",
  "salaryMin": "10000000",
  "salaryMax": "15000000",
  "profileFields": [
    {
      "key": "fullName",
      "label": "Full name",
      "fieldType": "text",
      "placeholder": "e.g., John Doe",
      "helpText": "Enter your full legal name",
      "requirement": "MANDATORY",
      "order": 0
    },
    {
      "key": "email",
      "label": "Email",
      "fieldType": "email",
      "placeholder": "e.g., john.doe@example.com",
      "helpText": "We'll use this for communication",
      "requirement": "MANDATORY",
      "order": 1
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Job vacancy successfully created",
  "data": {
    "job": {
      "id": "uuid",
      "slug": "senior-developer",
      "title": "Senior Developer",
      "jobType": "Full-time",
      "description": "We are looking for a senior developer...",
      "numberOfCandidates": 5,
      "status": "ACTIVE",
      "salaryMin": 10000000,
      "salaryMax": 15000000,
      "salaryCurrency": "IDR",
      "startedOn": "2025-01-16T10:00:00.000Z",
      "createdAt": "2025-01-16T10:00:00.000Z",
      "updatedAt": "2025-01-16T10:00:00.000Z",
      "createdById": "uuid"
    }
  }
}
```

**CURL:**

```bash
curl -X POST http://localhost:3000/api/admin/create-job \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer",
    "jobType": "Full-time",
    "description": "We are looking for a senior developer...",
    "numberOfCandidates": "5",
    "salaryMin": "10000000",
    "salaryMax": "15000000",
    "profileFields": [
      {
        "key": "fullName",
        "label": "Full name",
        "fieldType": "text",
        "placeholder": "e.g., John Doe",
        "helpText": "Enter your full legal name",
        "requirement": "MANDATORY",
        "order": 0
      }
    ]
  }'
```

**Notes:**

- Job status is automatically determined:
  - `ACTIVE`: All required fields (title, jobType, description, numberOfCandidates) are filled
  - `DRAFT`: Form is incomplete
- Slug is automatically generated from title
- `profileFields` requirement options: `MANDATORY`, `OPTIONAL`, `OFF`

---

### 6. Get Job List

**Endpoint:** `GET /api/admin/get-list-job`

**Required Role:** `Admin`

**Headers:**

- `Cookie: auth-token=YOUR_TOKEN`

**Query Parameters:**

- `search` (optional): Search term to filter jobs by title or jobType
- `sort` (optional): Sort order - `asc` (oldest first) or `desc` (newest first, default)

**Response:**

```json
{
  "success": true,
  "message": "Success get job list",
  "data": {
    "jobs": [
      {
        "id": "uuid",
        "slug": "senior-developer",
        "title": "Senior Developer",
        "jobType": "Full-time",
        "description": "We are looking for a senior developer...",
        "numberOfCandidates": 5,
        "status": "ACTIVE",
        "salaryMin": 10000000,
        "salaryMax": 15000000,
        "salaryCurrency": "IDR",
        "startedOn": "2025-01-16T10:00:00.000Z",
        "createdAt": "2025-01-16T10:00:00.000Z",
        "updatedAt": "2025-01-16T10:00:00.000Z",
        "formFields": [
          {
            "id": "uuid",
            "key": "fullName",
            "label": "Full name",
            "fieldType": "text",
            "placeholder": "e.g., John Doe",
            "helpText": "Enter your full legal name",
            "order": 0,
            "requirement": "MANDATORY",
            "validationRules": null
          }
        ],
        "applicationsCount": 0
      }
    ]
  }
}
```

**CURL:**

```bash
# Get all jobs (default: sort desc)
curl -X GET "http://localhost:3000/api/admin/get-list-job" \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Search jobs containing "developer"
curl -X GET "http://localhost:3000/api/admin/get-list-job?search=developer" \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Sort ascending (oldest first)
curl -X GET "http://localhost:3000/api/admin/get-list-job?sort=asc" \
  -H "Cookie: auth-token=YOUR_TOKEN"

# Combine search and sort
curl -X GET "http://localhost:3000/api/admin/get-list-job?search=developer&sort=asc" \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "message": unauthorized
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": forbidden
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": notfound data
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": server error
}
```

---

## Data Types

### ProfileField

```typescript
{
  key: string; // Unique identifier (e.g., "fullName", "email")
  label: string; // Display label (e.g., "Full name")
  fieldType: string; // Input type (e.g., "text", "email", "tel", "date", "url", "file")
  placeholder: string; // Placeholder text
  helpText: string | null; // Help text
  requirement: "MANDATORY" | "OPTIONAL" | "OFF"; // Field requirement
  order: number; // Display order (0-indexed)
}
```

### JobStatus

- `ACTIVE`: Job is live and accepting applications
- `DRAFT`: Job is saved but not yet published
- `INACTIVE`: Job is closed (not currently used in auto-determination)

### Job Types

- `Full-time`
- `Contract`
- `Part-time`
- `Internship`
- `Freelance`

---

## Middleware & Authorization

All API routes are protected by middleware that:

1. Checks for valid JWT token in `auth-token` cookie
2. Verifies user exists in database
3. Validates user role for protected routes:
   - `/api/admin/*` requires `Admin` role
   - `/api/applicant/*` requires `Applicant` role
4. Passes `x-user-id` header to route handlers

Public routes bypass authentication:

- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/logout`
