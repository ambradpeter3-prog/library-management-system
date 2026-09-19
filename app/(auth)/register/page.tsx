"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

type Form = { name: string; email: string; role: string; password: string; confirm: string };
type Errors = Partial<Record<keyof Form, string>>;

function validate(form: Form): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.email.includes("@")) errors.email = "Enter a valid email.";
  if (!form.role) errors.role = "Please select a role.";
  if (form.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (form.password !== form.confirm) errors.confirm = "Passwords do not match.";
  return errors;
}

const strength = (pw: string) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "bg-rose-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({ name: "", email: "", role: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dupError, setDupError] = useState("");

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
    setDupError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const ok = registerUser({ name: form.name, email: form.email, role: form.role, password: form.password });
    setLoading(false);
    if (!ok) { setDupError("An account with this email already exists."); return; }
    router.push("/login?registered=1");
  };

  const pw = strength(form.password);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-8 text-white">
          <div className="text-3xl mb-2">📖</div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-indigo-200 text-sm mt-1">Join LibraryMS today</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {dupError && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
              <span>⚠️</span> {dupError}
            </div>
          )}

          <Field label="Full name" error={errors.name}>
            <input type="text" placeholder="Jane Doe" value={form.name} onChange={set("name")} className={inputCls(!!errors.name)} />
          </Field>

          <Field label="Email address" error={errors.email}>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} className={inputCls(!!errors.email)} />
          </Field>

          <Field label="Role" error={errors.role}>
            <select value={form.role} onChange={set("role")} className={inputCls(!!errors.role)}>
              <option value="">Select a role…</option>
              <option value="member">Member</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </Field>

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                className={`${inputCls(!!errors.password)} pr-10`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {form.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pw ? strengthColor[pw] : "bg-slate-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-slate-500">{strengthLabel[pw]}</p>
              </div>
            )}
          </Field>

          <Field label="Confirm password" error={errors.confirm}>
            <input type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} className={inputCls(!!errors.confirm)} />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
    hasError ? "border-rose-300 focus:ring-rose-300" : "border-slate-200 focus:ring-indigo-400 focus:border-transparent"
  }`;
}
