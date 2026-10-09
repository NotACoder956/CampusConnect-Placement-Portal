# Project / Viva Guide

## One-line explanation
CampusConnect is a three-role campus recruitment portal where recruiters publish opportunities, the Placement Cell approves them, and students apply only when the server confirms their eligibility.

## Architecture

Browser (React/Vite) → REST API (Express) → SQLite database

## Role boundaries

- STUDENT: approved jobs, profile, applications
- RECRUITER: own companies, own jobs, own applicants
- ADMIN: approval queue and audit logs

Role middleware is applied to protected API routes; UI navigation is not the security boundary.

## Eligibility logic

The backend reads the student profile and job criteria. An application is rejected if:
- CGPA is below the job minimum
- department is not in the allowed department list
- graduation year does not match

The API returns a 422 response with human-readable reasons.

## Approval logic

Students can only query jobs where both the job and its company have `APPROVED` status. New companies/jobs begin as `PENDING`.

## Audit logic

Admin approval/rejection creates an `audit_logs` row containing reviewer ID, action, entity type, entity ID, details, and timestamp.

## Suggested 3-minute demo

1. Admin: approve a pending company/job.
2. Student: browse the approved opening and apply.
3. Recruiter: review applicant and move status to Shortlisted.
4. Student: show the updated application pipeline.
5. Admin: show the audit record.

## Good viva answers

**Why React?** Component-based UI makes three role-specific dashboards reusable and maintainable.

**Why Express?** It provides a simple REST API layer for authentication, authorization, eligibility checks and CRUD operations.

**Why SQLite?** The assignment is a local academic project; SQLite is zero-configuration, transactional and easy to seed for evaluation.

**Why server-side eligibility?** Client-side checks can be bypassed. The backend must be the final authority before an application is inserted into the database.

**How is role-based access enforced?** JWT identifies the logged-in user, and Express middleware checks the user's role before protected endpoints execute.

**How is batch update implemented?** The recruiter submits application IDs plus a target status; the backend updates only applications belonging to that recruiter.
