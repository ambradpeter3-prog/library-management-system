import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
              LM
            </div>
            <span className="font-semibold text-slate-800 text-sm">Library Portal</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#roles"    className="hover:text-indigo-600 transition-colors">Roles</a>
            <a href="#about"    className="hover:text-indigo-600 transition-colors">About</a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors">
              Sign in
            </Link>
            <Link href="/register"
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-slate-50">
        <span className="inline-block text-xs font-semibold tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-6">
          Library Application &amp; Management Portal
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight max-w-2xl">
          From borrowing to returns —{" "}
          <span className="text-indigo-600">all in one place</span>
        </h1>
        <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">
          A unified portal for members, librarians, and admins to manage books,
          track loans, and keep the library running smoothly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-colors text-sm">
            Join the library
          </Link>
          <Link href="/login"
            className="border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Staff portal
          </Link>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Everything you need, in one portal
          </h2>
          <p className="text-center text-slate-400 text-sm mb-12">
            Built for efficiency — from browsing to borrowing to returning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "📚",
                title: "Book Catalog",
                desc: "Browse and search the full collection by title, author, or genre in seconds.",
              },
              {
                icon: "🔍",
                title: "Availability Check",
                desc: "See real-time availability so members always know what's ready to borrow.",
              },
              {
                icon: "✅",
                title: "Easy Borrowing",
                desc: "Librarians issue loans in one click with automatic due-date tracking.",
              },
              {
                icon: "🗂️",
                title: "Member Records",
                desc: "Maintain complete member profiles with full borrowing history.",
              },
            ].map((f) => (
              <div key={f.title} className="border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ──────────────────────────────────────────────────────────── */}
      <section id="roles" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Three roles, one system
          </h2>
          <p className="text-center text-slate-400 text-sm mb-12">
            Each role has a dedicated dashboard tailored to their responsibilities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: "Member",
                color: "bg-indigo-50 border-indigo-100",
                badge: "bg-indigo-100 text-indigo-700",
                icon: "👤",
                points: ["Browse the book catalog", "View borrowing history", "Check due dates"],
              },
              {
                label: "Librarian",
                color: "bg-emerald-50 border-emerald-100",
                badge: "bg-emerald-100 text-emerald-700",
                icon: "📖",
                points: ["Issue and manage loans", "Add & update books", "Track overdue records"],
              },
              {
                label: "Admin",
                color: "bg-amber-50 border-amber-100",
                badge: "bg-amber-100 text-amber-700",
                icon: "🛡️",
                points: ["Full system access", "Manage members & staff", "View system analytics"],
              },
            ].map((r) => (
              <div key={r.label} className={`border rounded-2xl p-6 ${r.color}`}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.badge}`}>{r.label}</span>
                <ul className="mt-4 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-indigo-400 mt-0.5">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / CTA ────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 px-6 bg-indigo-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-indigo-200 text-sm mb-8">
            Create your free account and start managing your library today.
          </p>
          <Link href="/register"
            className="inline-block bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-8 py-3 rounded-xl transition-colors shadow-lg">
            Create an account
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-500 text-xs text-center py-6 px-4">
        © {new Date().getFullYear()} LibraryMS · Built with Next.js
      </footer>
    </div>
  );
}
