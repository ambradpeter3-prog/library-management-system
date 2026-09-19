"use client";
import { useState } from "react";
import { books } from "@/lib/data";
import Badge from "@/components/Badge";

const genres = ["All", ...Array.from(new Set(books.map((b) => b.genre)))];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "All" || b.genre === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Books</h2>
          <p className="text-slate-500 mt-1">{books.length} books in catalog</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
        <div className="flex gap-2 flex-wrap">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                genre === g
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
          >
            <div className="text-4xl mb-3">{book.cover}</div>
            <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{book.author}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{book.genre}</span>
              <Badge available={book.available} />
            </div>
            <p className="text-xs text-slate-400 mt-2">{book.year}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No books found</p>
          </div>
        )}
      </div>
    </div>
  );
}
