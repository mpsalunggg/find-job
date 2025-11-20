# API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

JWT token stored in cookie `auth-token`. Protected routes require `x-user-id` header.

---

## Auth Routes

### POST `/api/auth/register`

**Request:**

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
  "message": "Registration successful",
  "data": {
    "id": "f0060466-a467-4617-abc3-d0c4a93a2d3d",
    "email": "test1@gmail.com",
    "roles": ["Applicant"]
  }
}
```

### POST `/api/auth/login`

**Request:**

```json
{
  "email": "admin@findJob.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "7ac9ae52-662c-4dff-9eda-9272b8a24ef9",
    "email": "admin@findJob.com",
    "roles": ["Admin"]
  }
}
```

### POST `/api/auth/logout`

**Response:**

```json
{ "success": true, "message": "Logout Success", "data": null }
```

### GET `/api/auth/me`

**Response:**

```json
{
  "success": true,
  "message": "Success get user data",
  "data": {
    "id": "7ac9ae52-662c-4dff-9eda-9272b8a24ef9",
    "email": "admin@findJob.com",
    "roles": ["Admin"],
    "candidate": null,
    "createdAt": "2025-11-20T19:15:01.436Z"
  }
}
```

---

## Public Routes

### GET `/api/public/job-list?search=...&sort=asc|desc`

**Response:**

```json
{
  "success": true,
  "message": "Success get public job list",
  "data": [
    {
      "id": "fdfd059d-5574-428c-b8e0-7bf7c2708f84",
      "title": "Frontend Engineer",
      "jobType": "full-time",
      "description": "test",
      "salaryMin": 7000000,
      "salaryMax": 8000000
    }
    {...}
  ]
}
```

---

## Admin Routes

### POST `/api/admin/create-job`

**Request:**

```json
{
  "title": "backend engineer",
  "jobType": "full-time",
  "description": "test",
  "numberOfCandidates": "2",
  "salaryMin": "7000000",
  "salaryMax": "8000000",
  "profileFields": [
    {
      "key": "photoUrl",
      "label": "Photo Profile",
      "fieldType": "file",
      "placeholder": null,
      "helpText": "Recommended: 500x500px, max 2MB",
      "requirement": "MANDATORY",
      "order": 0
    }
  ]
}
```

**Response:**

```json
{ "success": true, "message": "Job vacancy successfully created", "data": 201 }
```

### PUT `/api/admin/update-job/[id]`

**Request:**

```json
Same as create-job
```

**Response:**

```json
{
  "success": true,
  "message": "Job vacancy successfully updated",
  "data": {...}
}
```

### GET `/api/admin/get-list-job?search=...&sort=asc|desc`

**Response:**

```json
{
  "success": true,
  "message": "Success get job list",
  "data": {...}
}
```

### GET `/api/admin/get-list-applications?jobId=...&page=1&limit=10&search=...&status=...`

**Response:**

```json
{
  "success": true,
  "message": "Success get candidate applications",
  "data": {
    "items": [...],
    "meta": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 0
    },
    "additional": {
      "jobTitle": "Frontend Engineerr"
    }
  }
}
```

---

## Applicant Routes

### GET `/api/applicant/get-list-form-field/[id]`

**Response:**

```json
{
  "success": true,
  "message": "Success get job form fields",
  "data": {
    "job": {
      "title": "Frontend Engineerr"
    },
    "formFields": [
      {
        "id": "6d990051-0eb7-4ed3-abe3-b85a4bdd4476",
        "key": "photoUrl",
        "label": "Photo Profile",
        "fieldType": "file",
        "placeholder": null,
        "helpText": "Recommended: 500x500px, max 2MB",
        "order": 0,
        "requirement": "MANDATORY"
      }
    ]
  }
}
```

### POST `/api/applicant/apply-job`

**Request:**

```json
{
  "jobId": "uuid",
  "email": "applicant@example.com",
  "phoneNumber": "08123456789",
  "fullName": "John Doe",
  "photoUrl": "https://...",
  "gender": "Male",
  "domicile": "Jakarta",
  "linkedinUrl": "https://linkedin.com/in/...",
  "dateOfBirth": "1990-01-01"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": 201
}
```
