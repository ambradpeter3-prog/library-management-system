"use client";
import { useState } from "react";
import { borrowRecords, books, members, BorrowRecord } from "@/lib/data";

type Filter = "all" | "active" | "overdue" | "returned";

const bookCovers: Record<string, string> = {
  b1: "bg-amber-600", b2: "bg-blue-700", b3: "bg-red-700", b4: "bg-orange-500",
  b5: "bg-green-700", b6: "bg-teal-600", b7: "bg-purple-600", b8: "bg-rose-700",
};

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export default function BorrowsPage() {
  const [records, setRecords] = useState<BorrowRecord[]>(borrowRecords);
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    bookId: books[0]?.id ?? "",
    memberId: members[0]?.id ?? "",
    borrowedAt: today(),
    durationDays: "14",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const enriched = records.map((r) => ({
    ...r,
    book:   books.find((b) => b.id === r.bookId)!,
    member: members.find((m) => m.id === r.memberId)!,
    isOverdue: !r.returnedAt && new Date(r.dueAt) < new Date(),
  }));

  const filtered = enriched.filter((r) => {
    if (filter === "active")   return !r.returnedAt && !r.isOverdue;
    if (filter === "overdue")  return r.isOverdue;
    if (filter === "returned") return !!r.returnedAt;
    return true;
  });

  const counts = {
    all:      enriched.length,
    active:   enriched.filter((r) => !r.returnedAt && !r.isOverdue).length,
    overdue:  enriched.filter((r) => r.isOverdue).length,
    returned: enriched.filter((r) => !!r.returnedAt).length,
  };

  const tabs: { key: Filter; label: string; dot: string }[] = [
    { key: "all",      label: "All",      dot: "bg-slate-500" },
    { key: "active",   label: "Active",   dot: "bg-amber-500" },
    { key: "overdue",  label: "Overdue",  dot: "bg-rose-500"  },
    { key: "returned", label: "Returned", dot: "bg-emerald-500" },
  ];

  const activeLoanBookIds = new Set(records.filter((r) => !r.returnedAt).map((r) => r.bookId));
  const availableBooks = books.filter((b) => !activeLoanBookIds.has(b.id));

  function validate() {
    const e: Record<string, string> = {};
    if (!form.bookId) e.bookId = "Please select a book.";
    if (!form.memberId) e.memberId = "Please select a member.";
    if (!form.borrowedAt) e.borrowedAt = "Borrow date is required.";
    const dur = Number(form.durationDays);
    if (!form.durationDays || isNaN(dur) || dur < 1 || dur > 365)
      e.durationDays = "Duration must be 1–365 days.";
    if (form.bookId && activeLoanBookIds.has(form.bookId))
      e.bookId = "This book is already on an active loan.";
    return e;
  }

  function handleAdd() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const dueAt = addDays(form.borrowedAt, Number(form.durationDays));
    const newRecord: BorrowRecord = {
      id: `r${Date.now()}`,
      bookId: form.bookId,
      memberId: form.memberId,
      borrowedAt: form.borrowedAt,
      dueAt,
      returnedAt: null,
    };
    setRecords((prev) => [newRecord, ...prev]);
    handleClose();
  }

  function handleClose() {
    setShowModal(false);
    setForm({
      bookId: availableBooks[0]?.id ?? books[0]?.id ?? "",
      memberId: members[0]?.id ?? "",
      borrowedAt: today(),
      durationDays: "14",
    });
    setErrors({});
  }

  function openModal() {
    setForm({
      bookId: availableBooks[0]?.id ?? books[0]?.id ?? "",
      memberId: members[0]?.id ?? "",
      borrowedAt: today(),
      durationDays: "14",
    });
    setShowModal(true);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Borrow Records</h2>
          <p className="text-slate-500 mt-0.5 text-sm">Track all book loans and returns</p>
        </div>
        <button
          onClick={openModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          + New Loan
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(({ key, label, dot }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === key ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full text-white ${dot}`}>{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Book</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Member</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Borrowed</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Due Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Returned</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-8 rounded-sm ${bookCovers[r.book.id] ?? "bg-slate-400"} shrink-0`} />
                    <div>
                      <p className="font-medium text-slate-800">{r.book.title}</p>
                      <p className="text-xs text-slate-400">{r.book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {r.member.name.charAt(0)}
                    </div>
                    <span className="text-slate-700">{r.member.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{r.borrowedAt}</td>
                <td className={`px-6 py-4 font-medium ${r.isOverdue ? "text-rose-600" : "text-slate-700"}`}>{r.dueAt}</td>
                <td className="px-6 py-4 text-slate-500">{r.returnedAt ?? "—"}</td>
                <td className="px-6 py-4">
                  {r.returnedAt ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Returned</span>
                  ) : r.isOverdue ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">Overdue</span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Active</span>
                  )}
                </td>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">New Loan</h3>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Book <span className="text-rose-500">*</span></label>
                {availableBooks.length === 0 ? (
                  <div className="w-full border border-amber-200 bg-amber-50 rounded-xl px-4 py-2.5 text-sm text-amber-700">
                    No books available — all copies are on loan.
                  </div>
                ) : (
                  <select value={form.bookId}
                    onChange={(e) => { setForm((f) => ({ ...f, bookId: e.target.value })); setErrors((er) => ({ ...er, bookId: "" })); }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${errors.bookId ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}>
                    {availableBooks.map((b) => <option key={b.id} value={b.id}>{b.title} — {b.author}</option>)}
                  </select>
                )}
                {errors.bookId && <p className="text-xs text-rose-500 mt-1">{errors.bookId}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Member <span className="text-rose-500">*</span></label>
                <select value={form.memberId}
                  onChange={(e) => { setForm((f) => ({ ...f, memberId: e.target.value })); setErrors((er) => ({ ...er, memberId: "" })); }}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${errors.memberId ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}>
                  {members.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.email}</option>)}
                </select>
                {errors.memberId && <p className="text-xs text-rose-500 mt-1">{errors.memberId}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Borrow Date <span className="text-rose-500">*</span></label>
                  <input type="date" value={form.borrowedAt} max={today()}
                    onChange={(e) => { setForm((f) => ({ ...f, borrowedAt: e.target.value })); setErrors((er) => ({ ...er, borrowedAt: "" })); }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${errors.borrowedAt ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
                  {errors.borrowedAt && <p className="text-xs text-rose-500 mt-1">{errors.borrowedAt}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Duration (days) <span className="text-rose-500">*</span></label>
                  <input type="number" value={form.durationDays} min={1} max={365}
                    onChange={(e) => { setForm((f) => ({ ...f, durationDays: e.target.value })); setErrors((er) => ({ ...er, durationDays: "" })); }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${errors.durationDays ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
                  {errors.durationDays && <p className="text-xs text-rose-500 mt-1">{errors.durationDays}</p>}
                </div>
              </div>
              {form.borrowedAt && Number(form.durationDays) > 0 && !isNaN(Number(form.durationDays)) && (
                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-indigo-700">Due on <span className="font-semibold">{addDays(form.borrowedAt, Number(form.durationDays))}</span></span>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleAdd} disabled={availableBooks.length === 0}
                className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors">
                Create Loan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
