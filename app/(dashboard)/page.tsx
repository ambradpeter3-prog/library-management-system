import StatsCard from "@/components/StatsCard";
import Badge from "@/components/Badge";
import { books, members, borrowRecords } from "@/lib/data";

export default function Dashboard() {
  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.available).length;
  const activeLoans = borrowRecords.filter((r) => !r.returnedAt).length;
  const overdueLoans = borrowRecords.filter(
    (r) => !r.returnedAt && new Date(r.dueAt) < new Date()
  ).length;

  const recentBorrows = borrowRecords
    .filter((r) => !r.returnedAt)
    .map((r) => ({
      ...r,
      book: books.find((b) => b.id === r.bookId)!,
      member: members.find((m) => m.id === r.memberId)!,
    }));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-1">Welcome back — here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Total Books" value={totalBooks} icon="📚" color="bg-indigo-50 text-indigo-900" />
        <StatsCard label="Available" value={availableBooks} icon="✅" color="bg-emerald-50 text-emerald-900" sub={`${totalBooks - availableBooks} borrowed`} />
        <StatsCard label="Active Loans" value={activeLoans} icon="🔄" color="bg-amber-50 text-amber-900" />
        <StatsCard label="Overdue" value={overdueLoans} icon="⚠️" color="bg-rose-50 text-rose-900" sub="needs attention" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Loans */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Active Loans</h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{activeLoans} active</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentBorrows.map((r) => (
              <li key={r.id} className="px-6 py-4 flex items-center gap-4">
                <span className="text-2xl">{r.book.cover}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{r.book.title}</p>
                  <p className="text-sm text-slate-500">{r.member.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Due</p>
                  <p className={`text-sm font-medium ${new Date(r.dueAt) < new Date() ? "text-rose-600" : "text-slate-700"}`}>
                    {r.dueAt}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Books */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Book Catalog Snapshot</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {books.slice(0, 5).map((book) => (
              <li key={book.id} className="px-6 py-4 flex items-center gap-4">
                <span className="text-2xl">{book.cover}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{book.title}</p>
                  <p className="text-sm text-slate-500">{book.author}</p>
                </div>
                <Badge available={book.available} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
