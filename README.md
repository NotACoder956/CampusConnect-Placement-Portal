# Campus Placement & Internship Portal

A role-based three-tier campus recruitment platform for **Students, Company Recruiters, and Placement Cell Administrators**.

## What this project demonstrates

- Role-based authentication and permission boundaries
- Student profiles and approved job browsing
- Recruiter company registration and job management
- Placement Cell approval/rejection workflow
- Server-side eligibility gating (CGPA, department, graduation year)
- Application pipeline: Applied → Under Review → Shortlisted → Interview → Selected / Rejected
- Recruiter single and batch status updates
- Admin audit logs with reviewer IDs and timestamps
- Seeded demo database
- Responsive dashboard UI

## Tech stack

- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express
- **Database:** SQLite via better-sqlite3
- **Authentication:** JWT
- **Styling:** Custom CSS

## Requirements

- Node.js 20+ recommended
- npm 10+

## Local setup

```bash
npm install
npm run install:all
npm run seed
npm run dev
```

On Mac, you can also double-click `START_MAC.command`. On Windows, run `START_WINDOWS.bat`.

Then open:

- Frontend: http://localhost:5173
- Backend health: http://localhost:4000/api/health

The database is created at `backend/data/placement.db`.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Student | student@campus.com | student123 |
| Recruiter | recruiter@technova.com | recruiter123 |
| Admin | admin@campus.com | admin123 |

## Recommended reviewer demo

1. Login as **Admin** and approve the pending TechNova job.
2. Login as **Student** and open Jobs. The newly approved job is now visible.
3. Open the job and apply. The server checks CGPA, department and graduation year before creating the application.
4. Login as **Recruiter** and open Applicants.
5. Select candidates and use the batch status control to move them to Shortlisted.
6. Login as **Student** again and open My Applications to see the updated pipeline.
7. Login as **Admin** and open Audit Logs to see the approval action with reviewer ID and timestamp.

To demonstrate the full company-registration workflow, login as Recruiter → New company → submit it → Admin → Review Queue → Approve company. The recruiter can then create a job for that approved company.

## Sample database population

```bash
npm run seed
```

The seed script clears and recreates demo data, including users, companies, jobs, students, applications and an admin audit record.

## API overview

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`

### Jobs / companies
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/recruiter/jobs`
- `GET /api/recruiter/jobs`
- `GET /api/recruiter/applicants`
- `PATCH /api/recruiter/applications/:id/status`
- `PATCH /api/recruiter/applications/batch-status`

### Student
- `GET /api/student/profile`
- `PUT /api/student/profile`
- `GET /api/student/applications`
- `POST /api/student/jobs/:id/apply`

### Admin
- `GET /api/admin/pending`
- `PATCH /api/admin/companies/:id/review`
- `PATCH /api/admin/jobs/:id/review`
- `GET /api/admin/audit-logs`

## Project structure

```text
campus-placement-portal/
├── backend/
│   ├── src/
│   │   ├── auth.js
│   │   ├── db.js
│   │   ├── seed.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── styles/
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```
