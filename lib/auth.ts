export type User = {
  name: string;
  email: string;
  role: string;
};

const USERS_KEY = "lms_users";
const SESSION_KEY = "lms_session";

export function getRegisteredUsers(): (User & { password: string })[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function registerUser(user: User & { password: string }): boolean {
  const users = getRegisteredUsers();
  if (users.find((u) => u.email === user.email)) return false;
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function loginUser(email: string, password: string): User | null {
  const users = getRegisteredUsers();
  const match = users.find((u) => u.email === email && u.password === password);
  if (!match) return null;
  const session: User = { name: match.name, email: match.email, role: match.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
