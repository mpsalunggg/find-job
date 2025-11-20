# Case Study Report - Hiring Management Web App

## Candidate Information

**Full Name:** [Your Full Name]

**Email Address:** [Your Email Address]

---

## 1. Deployed URL

**Production URL:** https://yourproject.vercel.app

_(Please update with your actual Vercel deployment URL)_

---

## 2. Credentials

### Admin (Recruiter) Account

**Email:** admin@example.com  
**Password:** admin123

_(Note: These are default credentials from database seed. Please update if you've changed them.)_

### Applicant (Job Seeker) Account

**Email:** applicant@example.com  
**Password:** applicant123

_(Note: These are default credentials from database seed. Please update if you've changed them.)_

---

## 3. GitHub Repository

**Repository URL:** https://github.com/yourusername/find-job

_(Please update with your actual GitHub repository URL)_

**README.md Structure:**

The repository includes a comprehensive README.md with the following sections:

- **i. Project Overview** - Brief description of the hiring management platform
- **ii. Tech Stack Used** - Complete list of technologies and libraries
- **iii. How to Run Locally** - Step-by-step setup instructions including:
  - Prerequisites
  - Database setup with Docker
  - Environment configuration
  - Migration and seeding
  - Development server startup
- **Database Management** - Commands for database operations
- **Documentation** - Links to API documentation

---

## 4. Key Features Implemented

### Admin (Recruiter) Features

#### ✅ Job List Page

- **Display all job vacancies** with comprehensive information:
  - Job title, department, status badge (Active/Inactive/Draft)
  - Salary range display
  - "Manage Candidate" CTA button
- **Search functionality** - Real-time search by keyword with debouncing
- **Sorting** - Sort jobs by title (ascending/descending)
- **Status filtering** - Filter jobs by status (Active, Inactive, Draft)
- **Empty state** - User-friendly empty state with "Create Job" CTA
- **Loading states** - Skeleton loaders for better UX

#### ✅ Create/Edit Job Modal

- **Job metadata input:**
  - Title, description, job type
  - Salary range (min/max)
  - Number of candidates
  - Start date
- **Dynamic form field configuration:**
  - Each profile field (Full Name, Email, Phone, LinkedIn, Domicile, Date of Birth, Gender, Photo) can be set to:
    - **Mandatory** - Required field with validation
    - **Optional** - Can be skipped
    - **Off** - Hidden from applicant form
- **Field customization:**
  - Custom labels and placeholders
  - Help text for guidance
  - Field ordering via drag-and-drop
  - Field type selection (text, email, phone, date, select, radio, file)
- **Form validation** - Complete validation before submission
- **Auto-status determination** - Automatically sets job status based on start date

#### ✅ Candidate Management Page

- **Advanced table view** with all applicants per job:
  - Columns: Full Name, Email, Phone, Date of Birth, Domicile, Gender, Status
  - **Column resizing** - Drag column borders to adjust width (like spreadsheet)
  - **Column reordering** - Drag and drop headers to reorder columns
  - **Fixed columns** - Checkbox and Full Name columns stay fixed on scroll
- **Sorting** - Click column headers to sort (ascending/descending)
- **Search** - Search by name, email, or phone number
- **Status filtering** - Filter candidates by application status
- **Pagination** - Server-side pagination with customizable items per page
- **Bulk actions:**
  - Select multiple candidates with checkboxes
  - Bulk status update via popover
  - Update status for selected candidates in one action
- **Responsive design** - Mobile-friendly table with responsive pagination
- **Empty state** - Informative empty state when no candidates found

### Applicant (Job Seeker) Features

#### ✅ Job List Page

- **Display active job postings** with:
  - Job title, salary range, company information
  - Application state indicator (eligible to apply / already applied)
- **Click to view details** - Navigate to job detail/apply page
- **Visual feedback** - Clear indication of application status

#### ✅ Apply Job Page

- **Dynamic form rendering** based on job configuration:
  - Fields rendered dynamically from backend configuration
  - Only shows fields configured as Mandatory or Optional
  - Hidden fields are completely removed from form
- **Field types supported:**
  - Text input
  - Email input with validation
  - Phone number with international format
  - Date picker (Date of Birth)
  - Select dropdown (Gender, Domicile)
  - Radio buttons
  - File upload (Photo)
- **Dynamic validation:**
  - Required fields validated based on `requirement: MANDATORY`
  - Optional fields can be skipped
  - Real-time validation feedback
- **One-time application** - Prevents duplicate applications to same job
- **Form state management** - Proper error handling and success states

#### ✅ Profile Picture via Hand Gesture Detection

- **Webcam integration** - Access user's camera with permission
- **Hand pose detection** using TensorFlow.js:
  - Detects hand landmarks in real-time
  - Tracks finger count progression (3 → 2 → 1 fingers)
  - Visual feedback with step indicators
- **Automatic photo capture:**
  - After detecting 3-finger pose → progresses to 2-finger pose
  - After detecting 2-finger pose → progresses to 1-finger pose
  - After detecting 1-finger pose → starts 3-second countdown
  - Photo automatically captured after countdown
- **Preview and save** - User can preview captured photo before saving
- **Reset functionality** - Option to retake photo if not satisfied
- **Error handling** - Graceful handling of camera permission denial

#### ✅ Feedback States

- **Success state:**
  - Success message: "Your application has been submitted successfully"
  - Redirect to success page
  - Clear visual feedback
- **Error handling:**
  - Missing required fields highlighted
  - Field-level error messages
  - Form submission error handling
  - Duplicate application prevention

### Technical Features

#### ✅ Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin/Applicant)
- Protected routes middleware
- Secure password hashing with bcryptjs

#### ✅ Backend Integration

- Full-stack Next.js application with API routes
- PostgreSQL database with Prisma ORM
- RESTful API design
- Error handling and validation

#### ✅ UI/UX Enhancements

- Responsive design (mobile, tablet, desktop)
- Loading states and skeletons
- Empty states with helpful CTAs
- Toast notifications for user feedback
- Accessible components (Radix UI)
- Modern, clean design with Tailwind CSS

---

## 5. Optional Enhancements Added

### 🚀 Advanced Table Features

- **Column resizing** - Users can resize columns by dragging borders (spreadsheet-like experience)
- **Column reordering** - Drag and drop column headers to customize table layout
- **Fixed/sticky columns** - Checkbox and Full Name columns remain visible during horizontal scroll
- **Bulk selection** - Select multiple rows with checkboxes
- **Bulk status update** - Update status for multiple candidates simultaneously
- **Responsive pagination** - Mobile-optimized pagination (shows max 2 pages on mobile)

### 🚀 Enhanced Form Features

- **Dynamic Zod schema generation** - Schema generated at runtime based on form configuration
- **Phone number formatting** - International phone number input with country code selection
- **Date picker** - User-friendly calendar component for date selection
- **Field ordering** - Drag and drop to reorder form fields in job configuration

### 🚀 Developer Experience

- **TypeScript** - Full type safety throughout the application
- **Code organization** - Modular architecture with feature-based folder structure
- **Custom hooks** - Reusable hooks for common operations (pagination, debounce, query params)
- **Error boundaries** - Proper error handling and user feedback
- **Code quality** - ESLint, Prettier, Husky for code quality enforcement

### 🚀 Performance Optimizations

- **Debounced search** - Reduces API calls with 500ms debounce
- **Server-side pagination** - Efficient data loading
- **React Query** - Intelligent caching and data synchronization
- **Code splitting** - Next.js automatic code splitting
- **Optimized images** - Next.js Image component for optimized loading

### 🚀 User Experience

- **Breadcrumb navigation** - Clear navigation path in candidate management
- **Status badges** - Color-coded status indicators
- **Empty states** - Helpful empty states with actionable CTAs
- **Loading skeletons** - Better perceived performance
- **Toast notifications** - Non-intrusive success/error messages

---

## 6. Design or Logic Assumptions

### Design Assumptions

1. **Status Badge Colors:**
   - Active jobs: Green badge
   - Inactive jobs: Gray badge
   - Draft jobs: Yellow/Orange badge
   - Application statuses: Color-coded based on workflow stage

2. **Table Design:**
   - Fixed left columns (checkbox, name) for better UX during horizontal scroll
   - Resizable columns with minimum width constraints
   - Column reordering limited to non-fixed columns only

3. **Form Field Ordering:**
   - Fields displayed in the order specified by `order` field
   - Drag-and-drop reordering updates the order value

4. **Hand Gesture Detection:**
   - Requires stable hand pose detection (multiple consecutive frames)
   - Progression must be sequential (3 → 2 → 1 fingers)
   - 3-second countdown after final pose detection for user preparation

### Logic Assumptions

1. **Job Status Determination:**
   - If `startedOn` date is in the future → Status = "DRAFT"
   - If `startedOn` date is today or past → Status = "ACTIVE"
   - Status can be manually changed by admin

2. **Application Validation:**
   - One candidate can only apply once per job
   - Only ACTIVE jobs accept applications
   - Mandatory fields must be filled before submission

3. **Dynamic Form Validation:**
   - Fields with `requirement: MANDATORY` are required
   - Fields with `requirement: OPTIONAL` can be empty
   - Fields with `requirement: OFF` are not rendered

4. **Table Pagination:**
   - Server-side pagination for better performance
   - Default 10 items per page
   - Pagination state managed via URL query parameters

5. **Search Functionality:**
   - Search is debounced (500ms) to reduce API calls
   - Search resets pagination to page 1
   - Search works across multiple fields (name, email, phone)

---

## 7. Known Limitations

### Technical Limitations

1. **Hand Pose Detection:**
   - Requires modern browser with WebGL support
   - Requires camera permission from user
   - May not work well in low-light conditions
   - Performance depends on device capabilities (better on desktop than mobile)
   - Model loading time on first use (~2-3 seconds)

2. **Table Performance:**
   - Large datasets (>1000 rows) may experience slower rendering
   - Column resizing/reordering state is not persisted (resets on page refresh)
   - Fixed columns implementation uses custom logic (not TanStack Table's built-in pinning)

3. **Form Field Configuration:**
   - Field validation rules are basic (no custom regex patterns)
   - File upload limited to images (photo field)
   - No support for multi-file uploads

4. **Browser Compatibility:**
   - Hand pose detection requires browsers with WebGL support
   - Some features may not work in older browsers
   - Camera access requires HTTPS in production

### Feature Limitations

1. **Job Management:**
   - No bulk job operations (delete, duplicate, etc.)
   - No job templates for quick creation
   - No job expiration/auto-close functionality

2. **Candidate Management:**
   - No export functionality (CSV/Excel)
   - No advanced filtering (date range, multiple statuses)
   - No candidate notes or tags
   - No email notifications

3. **Application Process:**
   - No file attachments (resume, portfolio, etc.)
   - No multi-step application form
   - No application editing after submission

4. **User Management:**
   - No user profile management
   - No password reset functionality
   - No email verification

### Scalability Considerations

1. **Database:**
   - No database connection pooling configuration visible
   - May need optimization for high-traffic scenarios

2. **File Storage:**
   - Profile photos stored as base64 strings (not ideal for production)
   - No CDN integration for image delivery
   - No image optimization/compression

3. **API:**
   - No rate limiting implemented
   - No request caching strategy beyond React Query
   - No API versioning

---

## Additional Notes

### Project Structure

The project follows a feature-based architecture:

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # Shared UI components
├── features/         # Feature modules (admin, applicant, auth)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
└── types/            # TypeScript type definitions
```

### Database Schema

- Uses Prisma ORM with PostgreSQL
- Migrations tracked in `prisma/migrations/`
- Seed data available for development

### Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

---

**End of Case Study Report**
