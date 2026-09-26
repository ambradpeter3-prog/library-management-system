"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";
import Badge from "@/components/Badge";
import { books, members, borrowRecords } from "@/lib/data";
import { getSession } from "@/lib/auth";

const popularBooks = [...books]
  .map((b) => ({
    ...b,
    borrows: borrowRecords.filter((r) => r.bookId === b.id).length,
  }))
  .sort((a, b) => b.borrows - a.borrows)
  .slice(0, 5);

const bookCovers: Record<string, string> = {
  b1: "bg-amber-600",
  b2: "bg-blue-700",
  b3: "bg-red-700",
  b4: "bg-orange-500",
  b5: "bg-green-700",
  b6: "bg-teal-600",
  b7: "bg-purple-600",
  b8: "bg-rose-700",
};

export default function Dashboard() {
  const [userName, setUserName] = useState("there");
  const [userInitial, setUserInitial] = useState("P");
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUserName(session.name.split(" ")[0]);
      setUserInitial(session.name.charAt(0).toUpperCase());
    }
  }, []);

  const totalBooks    = books.length;
  const availableBooks = books.filter((b) => b.available).length;
  const activeLoans   = borrowRecords.filter((r) => !r.returnedAt).length;
  const overdueLoans  = borrowRecords.filter((r) => !r.returnedAt && new Date(r.dueAt) < new Date()).length;

  const recentBorrows = borrowRecords.map((r) => ({
    ...r,
    book:   books.find((b) => b.id === r.bookId)!,
    member: members.find((m) => m.id === r.memberId)!,
    isOverdue: !r.returnedAt && new Date(r.dueAt) < new Date(),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-end gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            {userInitial}
          </div>
          <span className="text-sm font-medium text-slate-700">{userName}</span>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">

        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden w-full" style={{ minHeight: "22rem" }}>
          {/* Photo — scaled down so the full group fits with no black bars */}
          <img
            src="/ter.jpg"
            alt="Team"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: "center 40%",
              transform: "scale(0.82)",
              transformOrigin: "center center",
              filter: "brightness(1.25) contrast(1.05)",
            }}
          />
          {/* Left-side overlay for text legibility */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-900/80 to-transparent" />
          <div className="relative z-10 flex flex-col justify-center h-full px-10">
            <p className="text-white/75 text-base">Welcome back,</p>
            <h1 className="text-5xl font-extrabold text-white mt-1 leading-tight">{userName}!</h1>
            <p className="text-white/65 text-sm mt-2">Here's what's happening in the library today.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Books" value={totalBooks}
            iconBg="bg-indigo-100"
            iconEl={<svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
          />
          <StatsCard
            label="Available" value={availableBooks}
            iconBg="bg-emerald-100"
            iconEl={<svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
            sub={`${totalBooks - availableBooks} borrowed`}
          />
          <StatsCard
            label="Active Loans" value={activeLoans}
            iconBg="bg-amber-100"
            iconEl={<svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>}
          />
          <StatsCard
            label="Overdue" value={overdueLoans}
            iconBg="bg-rose-100"
            iconEl={<svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
            sub="needs attention"
          />
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Recent Borrowings — 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800">Recent Borrowings</h3>
              </div>
              <button onClick={() => router.push("/borrows")} className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
                View All <span>→</span>
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Member</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Book Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Borrowed On</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Due Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBorrows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {r.member.name.charAt(0)}
                        </div>
                        <span className="text-slate-700 text-xs">{r.member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-8 rounded-sm ${bookCovers[r.book.id] ?? "bg-slate-400"} shrink-0`} />
                        <span className="text-slate-700 text-xs font-medium truncate max-w-[120px]">{r.book.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{r.borrowedAt}</td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{r.dueAt}</td>
                    <td className="px-6 py-3">
                      {r.returnedAt ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Returned</span>
                      ) : r.isOverdue ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-600">Overdue</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">On Time</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popular Books — 2/5 width */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800">Popular Books</h3>
              </div>
              <button onClick={() => router.push("/books")} className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
                View All <span>→</span>
              </button>
            </div>
            <ul className="divide-y divide-slate-50">
              {popularBooks.map((book) => (
                <li key={book.id} className="px-6 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-12 rounded-md ${bookCovers[book.id] ?? "bg-slate-400"} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm truncate">{book.title}</p>
                    <p className="text-xs text-slate-400">{book.author}</p>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full shrink-0">
                    {book.borrows} borrow{book.borrows !== 1 ? "s" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
