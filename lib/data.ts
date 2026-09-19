export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  available: boolean;
  cover: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  borrowedCount: number;
};

export type BorrowRecord = {
  id: string;
  bookId: string;
  memberId: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
};

export const books: Book[] = [
  { id: "b1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", year: 1925, available: true, cover: "📗" },
  { id: "b2", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", year: 1960, available: false, cover: "📘" },
  { id: "b3", title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949, available: true, cover: "📕" },
  { id: "b4", title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", year: 1813, available: true, cover: "📙" },
  { id: "b5", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1937, available: false, cover: "📗" },
  { id: "b6", title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", year: 1932, available: true, cover: "📘" },
  { id: "b7", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", year: 1951, available: true, cover: "📕" },
  { id: "b8", title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Dystopian", year: 1953, available: false, cover: "📙" },
];

export const members: Member[] = [
  { id: "m1", name: "Alice Johnson", email: "alice@example.com", joinedAt: "2024-01-15", borrowedCount: 3 },
  { id: "m2", name: "Bob Smith", email: "bob@example.com", joinedAt: "2024-02-20", borrowedCount: 1 },
  { id: "m3", name: "Carol White", email: "carol@example.com", joinedAt: "2024-03-10", borrowedCount: 5 },
  { id: "m4", name: "David Brown", email: "david@example.com", joinedAt: "2024-04-05", borrowedCount: 2 },
  { id: "m5", name: "Eva Martinez", email: "eva@example.com", joinedAt: "2024-05-18", borrowedCount: 0 },
];

export const borrowRecords: BorrowRecord[] = [
  { id: "r1", bookId: "b2", memberId: "m1", borrowedAt: "2025-06-01", dueAt: "2025-06-15", returnedAt: null },
  { id: "r2", bookId: "b5", memberId: "m3", borrowedAt: "2025-06-05", dueAt: "2025-06-19", returnedAt: null },
  { id: "r3", bookId: "b8", memberId: "m2", borrowedAt: "2025-05-20", dueAt: "2025-06-03", returnedAt: null },
  { id: "r4", bookId: "b1", memberId: "m4", borrowedAt: "2025-05-10", dueAt: "2025-05-24", returnedAt: "2025-05-23" },
  { id: "r5", bookId: "b3", memberId: "m3", borrowedAt: "2025-04-15", dueAt: "2025-04-29", returnedAt: "2025-04-28" },
];
