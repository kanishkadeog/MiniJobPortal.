// Simple localStorage-based persistence and auth simulation
const USERS_KEY = "mjb_users_v1";
const JOBS_KEY = "mjb_jobs_v1";
const AUTH_KEY = "mjb_auth_v1";

// Helper
function nowISO() {
  return new Date().toISOString();
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed initial data if empty
function ensureSeed() {
  if (!load(USERS_KEY)) {
    const users = [
      { id: "u1", name: "Employer One", email: "employer@ex.com", password: "pass123", role: "employer" },
      { id: "u2", name: "Applicant One", email: "applicant@ex.com", password: "pass123", role: "applicant" },
    ];
    save(USERS_KEY, users);
  }
  if (!load(JOBS_KEY)) {
    const jobs = [
      {
        id: "j1",
        title: "Frontend Intern",
        company: "Acme Inc",
        location: "Bangalore",
        role: "Frontend",
        description: "Work on React features.",
        createdAt: nowISO(),
        employerId: "u1",
        applicants: [],
      },
    ];
    save(JOBS_KEY, jobs);
  }
}
ensureSeed();

export function register({ name, email, password, role }) {
  const users = load(USERS_KEY) || [];
  if (users.find((u) => u.email === email)) return null;
  const id = "u" + Date.now();
  const user = { id, name, email, password, role };
  users.push(user);
  save(USERS_KEY, users);
  // auto-login
  save(AUTH_KEY, { id: user.id, email: user.email });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export function login(email, password) {
  const users = load(USERS_KEY) || [];
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  save(AUTH_KEY, { id: user.id, email: user.email });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser() {
  const auth = load(AUTH_KEY);
  if (!auth) return null;
  const users = load(USERS_KEY) || [];
  const user = users.find((u) => u.id === auth.id);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// Jobs
export function getJobs({ filterRole, filterLocation, search } = {}) {
  let jobs = load(JOBS_KEY) || [];
  // sort by createdAt desc
  jobs = jobs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (filterRole) jobs = jobs.filter((j) => j.role.toLowerCase().includes(filterRole.toLowerCase()));
  if (filterLocation) jobs = jobs.filter((j) => j.location.toLowerCase().includes(filterLocation.toLowerCase()));
  if (search) {
    const q = search.toLowerCase();
    jobs = jobs.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
  }
  return jobs;
}

export function getJobById(id) {
  const jobs = load(JOBS_KEY) || [];
  return jobs.find((j) => j.id === id) || null;
}

export function postJob({ title, company, location, role, description, employerId }) {
  const jobs = load(JOBS_KEY) || [];
  const id = "j" + Date.now();
  const job = { id, title, company, location, role, description, createdAt: nowISO(), employerId, applicants: [] };
  jobs.push(job);
  save(JOBS_KEY, jobs);
  return job;
}

export function applyToJob({ jobId, applicant }) {
  const jobs = load(JOBS_KEY) || [];
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return null;
  // avoid duplicate apply by same email
  if (job.applicants.find((a) => a.email === applicant.email)) return null;
  job.applicants.push({ ...applicant, appliedAt: nowISO() });
  save(JOBS_KEY, jobs);
  return job;
}

export function getJobsByEmployer(employerId) {
  const jobs = load(JOBS_KEY) || [];
  return jobs.filter((j) => j.employerId === employerId).sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
}
