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

```json
Request: { "email": "user@example.com", "password": "password123" }
Response: { "success": true, "message": "Registration successful" }
```

### POST `/api/auth/login`

```json
Request: { "email": "user@example.com", "password": "password123" }
Response: { "success": true, "message": "Login successful" }
```

### POST `/api/auth/logout`

```json
Response: { "success": true, "message": "Logout successful" }
```

### GET `/api/auth/me`

```json
Response: { "success": true, "message": "Success get user data" }
```

---

## Public Routes

### GET `/api/public/job-list?search=...&sort=asc|desc`

```json
Response: { "success": true, "message": "Success get public job list" }
```

---

## Admin Routes

### POST `/api/admin/create-job`

```json
Request: {
  "title": "Senior Developer",
  "jobType": "Full-time",
  "description": "Job description",
  "numberOfCandidates": "5",
  "salaryMin": "10000000",
  "salaryMax": "15000000",
  "profileFields": [
    {
      "key": "fullName",
      "label": "Full name",
      "fieldType": "text",
      "placeholder": "John Doe",
      "helpText": "Enter your full name",
      "requirement": "MANDATORY",
      "order": 0
    }
  ]
}
Response: { "success": true, "message": "Job vacancy successfully created" }
```

### PUT `/api/admin/update-job/[id]`

```json
Request: Same as create-job
Response: { "success": true, "message": "Job updated successfully" }
```

### GET `/api/admin/get-list-job?search=...&sort=asc|desc`

```json
Response: { "success": true, "message": "Success get job list" }
```

### GET `/api/admin/get-list-applications?jobId=...&page=1&limit=10&search=...&status=...`

```json
Response: { "success": true, "message": "Success get candidate applications" }
```

---

## Applicant Routes

### GET `/api/applicant/get-list-form-field/[id]`

```json
Response: { "success": true, "message": "Success get form fields" }
```

### POST `/api/applicant/apply-job`

```json
Request: {
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
Response: { "success": true, "message": "Application submitted successfully" }
```

---

## Error Responses

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

All errors return: `{ "success": false, "message": "Error message" }`
