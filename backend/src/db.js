import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
fs.mkdirSync(dataDir, { recursive: true });
export const db = new Database(path.join(dataDir, 'placement.db'));
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
export function initDb(){
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('STUDENT','RECRUITER','ADMIN')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS student_profiles (user_id INTEGER PRIMARY KEY, branch TEXT NOT NULL, cgpa REAL NOT NULL, graduation_year INTEGER NOT NULL, resume_link TEXT DEFAULT '', phone TEXT DEFAULT '', FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS companies (id INTEGER PRIMARY KEY AUTOINCREMENT, recruiter_id INTEGER NOT NULL, name TEXT NOT NULL, industry TEXT NOT NULL, description TEXT DEFAULT '', website TEXT DEFAULT '', approval_status TEXT NOT NULL DEFAULT 'PENDING', reviewed_by INTEGER, reviewed_at TEXT, rejection_reason TEXT, FOREIGN KEY(recruiter_id) REFERENCES users(id), FOREIGN KEY(reviewed_by) REFERENCES users(id));
  CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, company_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, location TEXT NOT NULL, min_cgpa REAL NOT NULL, allowed_departments TEXT NOT NULL, graduation_year INTEGER NOT NULL, job_type TEXT NOT NULL DEFAULT 'Full-time', approval_status TEXT NOT NULL DEFAULT 'PENDING', reviewed_by INTEGER, reviewed_at TEXT, rejection_reason TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(company_id) REFERENCES companies(id), FOREIGN KEY(reviewed_by) REFERENCES users(id));
  CREATE TABLE IF NOT EXISTS applications (id INTEGER PRIMARY KEY AUTOINCREMENT, job_id INTEGER NOT NULL, student_id INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'APPLIED', applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE(job_id, student_id), FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE, FOREIGN KEY(student_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, reviewer_id INTEGER NOT NULL, action TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id INTEGER NOT NULL, details TEXT DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(reviewer_id) REFERENCES users(id));
  `);
}
