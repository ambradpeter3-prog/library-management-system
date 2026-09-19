"use client";
import { useState } from "react";
import { members, borrowRecords, books } from "@/lib/data";

export default function MembersPage() {
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const getActiveLoans = (memberId: string) =>
    borrowRecords.filter((r) => r.memberId === memberId && !r.returnedAt);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Members</h2>
          <p className="text-slate-500 mt-1">{members.length} registered members</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Member
        </button>
      </div>

      <input
        type="text"
        placeholder="Search members…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white mb-6"
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Member</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Joined</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Active Loans</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-600">Total Borrowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((member) => {
              const active = getActiveLoans(member.id);
              return (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{member.email}</td>
                  <td className="px-6 py-4 text-slate-500">{member.joinedAt}</td>
                  <td className="px-6 py-4">
                    {active.length > 0 ? (
                      <div className="space-y-1">
                        {active.map((r) => {
                          const book = books.find((b) => b.id === r.bookId);
                          return (
                            <span key={r.id} className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                              {book?.cover} {book?.title}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-700">{member.borrowedCount}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">👤</p>
            <p className="font-medium">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
