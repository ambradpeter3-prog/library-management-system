"use client";
import { useState } from "react";
import { borrowRecords, books, members } from "@/lib/data";

type Filter = "all" | "active" | "overdue" | "returned";

export default function BorrowsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const enriched = borrowRecords.map((r) => ({
    ...r,
    book: books.find((b) => b.id === r.bookId)!,
    member: members.find((m) => m.id === r.memberId)!,
    isOverdue: !r.returnedAt && new Date(r.dueAt) < new Date(),
  }));

  const filtered = enriched.filter((r) => {
    if (filter === "active") return !r.returnedAt && !r.isOverdue;
    if (filter === "overdue") return r.isOverdue;
    if (filter === "returned") return !!r.returnedAt;
    return true;
  });

  const counts = {
    all: enriched.length,
    active: enriched.filter((r) => !r.returnedAt && !r.isOverdue).length,
    overdue: enriched.filter((r) => r.isOverdue).length,
    returned: enriched.filter((r) => !!r.returnedAt).length,
  };

  const tabs: { key: Filter; label: string; color: string }[] = [
    { key: "all", label: "All", color: "bg-slate-600" },
    { key: "active", label: "Active", color: "bg-amber-500" },
    { key: "overdue", label: "Overdue", color: "bg-rose-500" },
    { key: "returned", label: "Returned", color: "bg-emerald-500" },
  ];

  const statusBadge = (r: (typeof enriched)[0]) => {
    if (r.returnedAt)
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Returned</span>;
    if (r.isOverdue)
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">Overdue</span>;
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Active</span>;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Borrow Records</h2>
          <p className="text-slate-500 mt-1">Track all book loans and returns</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + New Loan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === key
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full text-white ${color}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Book</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Member</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Borrowed</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Due Date</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Returned</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{r.book.cover}</span>
                    <div>
                      <p className="font-medium text-slate-800">{r.book.title}</p>
                      <p className="text-xs text-slate-400">{r.book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                      {r.member.name.charAt(0)}
                    </div>
                    <span className="text-slate-700">{r.member.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{r.borrowedAt}</td>
                <td className={`px-6 py-4 font-medium ${r.isOverdue ? "text-rose-600" : "text-slate-700"}`}>
                  {r.dueAt}
                </td>
                <td className="px-6 py-4 text-slate-500">{r.returnedAt ?? "—"}</td>
                <td className="px-6 py-4">{statusBadge(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-medium">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
