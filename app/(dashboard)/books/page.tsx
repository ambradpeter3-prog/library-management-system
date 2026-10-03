"use client";
import { useState } from "react";
import { books as initialBooks, Book } from "@/lib/data";
import Badge from "@/components/Badge";

const genres = ["Classic", "Fiction", "Dystopian", "Romance", "Fantasy", "Mystery", "Sci-Fi", "Biography", "History", "Other"];

const coverColors = [
  "bg-amber-600", "bg-blue-700", "bg-red-700", "bg-orange-500",
  "bg-green-700", "bg-teal-600", "bg-purple-600", "bg-rose-700",
  "bg-cyan-600", "bg-indigo-600",
];

const defaultCovers: Record<string, string> = {
  b1:  "bg-amber-600",  b2:  "bg-blue-700",   b3:  "bg-red-700",
  b4:  "bg-orange-500", b5:  "bg-green-700",   b6:  "bg-teal-600",
  b7:  "bg-purple-600", b8:  "bg-rose-700",    b9:  "bg-amber-500",
  b10: "bg-yellow-700", b11: "bg-lime-700",    b12: "bg-emerald-700",
  b13: "bg-purple-700", b14: "bg-violet-600",  b15: "bg-fuchsia-700",
  b16: "bg-pink-700",   b17: "bg-rose-600",    b18: "bg-red-800",
  b19: "bg-orange-600", b20: "bg-amber-700",   b21: "bg-yellow-600",
  b22: "bg-lime-600",   b23: "bg-emerald-600", b24: "bg-teal-700",
  b25: "bg-cyan-700",
};

const genreDescriptions: Record<string, string> = {
  Classic:   "Timeless works of literature that have stood the test of time.",
  Fiction:   "Imaginative narratives exploring the human experience.",
  Dystopian: "Stories set in oppressive, dark futures or societies.",
  Romance:   "Tales of love, passion, and human connection.",
  Fantasy:   "Magical worlds filled with adventure and wonder.",
  Mystery:   "Puzzles, crimes, and thrilling investigations.",
  "Sci-Fi":  "Science and technology shaping future worlds.",
  Biography: "Real lives told through compelling narratives.",
  History:   "Events and figures that shaped the world.",
  Other:     "A diverse range of genres and styles.",
};

type BookWithColor = Book & { colorClass: string };

export default function BooksPage() {
  const [bookList, setBookList] = useState<BookWithColor[]>(
    initialBooks.map((b) => ({ ...b, colorClass: defaultCovers[b.id] ?? "bg-slate-400" }))
  );
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookWithColor | null>(null);

  const [form, setForm] = useState({
    title: "", author: "", genre: genres[0], year: new Date().getFullYear().toString(),
    available: true, colorClass: coverColors[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleGenres = ["All", ...Array.from(new Set(bookList.map((b) => b.genre)))];

  const filtered = bookList.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (genre === "All" || b.genre === genre);
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.author.trim()) e.author = "Author is required.";
    const yr = Number(form.year);
    if (!form.year || isNaN(yr) || yr < 1000 || yr > new Date().getFullYear())
      e.year = "Enter a valid year.";
    return e;
  }

  function handleAdd() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newBook: BookWithColor = {
      id: `b${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre,
      year: Number(form.year),
      available: form.available,
      cover: "📗",
      colorClass: form.colorClass,
    };
    setBookList((prev) => [newBook, ...prev]);
    handleClose();
  }

  function handleClose() {
    setShowModal(false);
    setForm({ title: "", author: "", genre: genres[0], year: new Date().getFullYear().toString(), available: true, colorClass: coverColors[0] });
    setErrors({});
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Books</h2>
          <p className="text-slate-500 mt-0.5 text-sm">{bookList.length} books in catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          + Add Book
        </button>
      </div>

      {/* Search & genre filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
        <div className="flex gap-2 flex-wrap">
          {visibleGenres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                genre === g ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Genre header when filtered */}
      {genre !== "All" && (
        <div className="mb-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-lg">📚</div>
          <div>
            <p className="font-semibold text-indigo-900">{genre}</p>
            <p className="text-xs text-indigo-500">{genreDescriptions[genre] ?? ""} — {filtered.length} book{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      )}

      {/* Book grid — clickable cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <button
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all cursor-pointer group text-left"
          >
            <div className={`w-12 h-16 rounded-lg ${book.colorClass} mb-4`} />
            <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">{book.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{book.author}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{book.genre}</span>
              <Badge available={book.available} />
            </div>
            <p className="text-xs text-slate-400 mt-2">{book.year}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No books found</p>
          </div>
        )}
      </div>

      {/* ── Book Detail Modal ── */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedBook(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Cover + title */}
            <div className="flex gap-4 items-start mb-5">
              <div className={`w-16 h-22 rounded-xl ${selectedBook.colorClass} shrink-0 flex items-center justify-center text-3xl shadow-md`} style={{ height: "5.5rem" }}>
                {selectedBook.cover}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-slate-900 leading-snug">{selectedBook.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{selectedBook.author}</p>
                <div className="mt-2">
                  <Badge available={selectedBook.available} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Genre</span>
                <span className="text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">{selectedBook.genre}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Year Published</span>
                <span className="text-slate-700 font-semibold">{selectedBook.year}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Status</span>
                <span className={`font-semibold text-xs px-2.5 py-0.5 rounded-full ${selectedBook.available ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                  {selectedBook.available ? "Available" : "Borrowed"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Add Book Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">Add New Book</h3>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title <span className="text-rose-500">*</span></label>
                <input type="text" value={form.title}
                  onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setErrors((er) => ({ ...er, title: "" })); }}
                  placeholder="e.g. The Great Gatsby"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.title ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"}`} />
                {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Author <span className="text-rose-500">*</span></label>
                <input type="text" value={form.author}
                  onChange={(e) => { setForm((f) => ({ ...f, author: e.target.value })); setErrors((er) => ({ ...er, author: "" })); }}
                  placeholder="e.g. F. Scott Fitzgerald"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.author ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"}`} />
                {errors.author && <p className="text-xs text-rose-500 mt-1">{errors.author}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Genre</label>
                  <select value={form.genre} onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
                    {genres.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Year <span className="text-rose-500">*</span></label>
                  <input type="number" value={form.year} min={1000} max={new Date().getFullYear()}
                    onChange={(e) => { setForm((f) => ({ ...f, year: e.target.value })); setErrors((er) => ({ ...er, year: "" })); }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.year ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"}`} />
                  {errors.year && <p className="text-xs text-rose-500 mt-1">{errors.year}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Cover Color</label>
                <div className="flex gap-2 flex-wrap">
                  {coverColors.map((c) => (
                    <button key={c} type="button" onClick={() => setForm((f) => ({ ...f, colorClass: c }))}
                      className={`w-7 h-9 rounded-md ${c} transition-transform hover:scale-110 ${form.colorClass === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : ""}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm((f) => ({ ...f, available: !f.available }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.available ? "bg-indigo-600" : "bg-slate-300"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.available ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm text-slate-600">{form.available ? "Available" : "Unavailable"}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">Add Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
