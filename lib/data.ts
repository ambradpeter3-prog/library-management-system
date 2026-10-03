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
  // Classic (5)
  { id: "b1",  title: "The Great Gatsby",           author: "F. Scott Fitzgerald", genre: "Classic",  year: 1925, available: true,  cover: "📗" },
  { id: "b9",  title: "To Kill a Mockingbird",      author: "Harper Lee",           genre: "Classic",  year: 1960, available: true,  cover: "📗" },
  { id: "b10", title: "Of Mice and Men",             author: "John Steinbeck",       genre: "Classic",  year: 1937, available: true,  cover: "📗" },
  { id: "b11", title: "The Old Man and the Sea",     author: "Ernest Hemingway",     genre: "Classic",  year: 1952, available: true,  cover: "📗" },
  { id: "b12", title: "Jane Eyre",                   author: "Charlotte Brontë",     genre: "Classic",  year: 1847, available: true,  cover: "📗" },
  // Fiction (5)
  { id: "b2",  title: "To Kill a Mockingbird",      author: "Harper Lee",           genre: "Fiction",  year: 1960, available: false, cover: "📘" },
  { id: "b13", title: "The Catcher in the Rye",     author: "J.D. Salinger",        genre: "Fiction",  year: 1951, available: true,  cover: "📘" },
  { id: "b14", title: "Lord of the Flies",           author: "William Golding",      genre: "Fiction",  year: 1954, available: true,  cover: "📘" },
  { id: "b15", title: "The Grapes of Wrath",         author: "John Steinbeck",       genre: "Fiction",  year: 1939, available: true,  cover: "📘" },
  { id: "b16", title: "A Tale of Two Cities",        author: "Charles Dickens",      genre: "Fiction",  year: 1859, available: true,  cover: "📘" },
  // Dystopian (5)
  { id: "b3",  title: "1984",                        author: "George Orwell",        genre: "Dystopian",year: 1949, available: true,  cover: "📕" },
  { id: "b8",  title: "Fahrenheit 451",              author: "Ray Bradbury",         genre: "Dystopian",year: 1953, available: false, cover: "📙" },
  { id: "b6",  title: "Brave New World",             author: "Aldous Huxley",        genre: "Dystopian",year: 1932, available: true,  cover: "📘" },
  { id: "b17", title: "The Handmaid's Tale",         author: "Margaret Atwood",      genre: "Dystopian",year: 1985, available: true,  cover: "📕" },
  { id: "b18", title: "We",                          author: "Yevgeny Zamyatin",     genre: "Dystopian",year: 1924, available: true,  cover: "📕" },
  // Romance (5)
  { id: "b4",  title: "Pride and Prejudice",         author: "Jane Austen",          genre: "Romance",  year: 1813, available: true,  cover: "📙" },
  { id: "b19", title: "Sense and Sensibility",       author: "Jane Austen",          genre: "Romance",  year: 1811, available: true,  cover: "📙" },
  { id: "b20", title: "Wuthering Heights",           author: "Emily Brontë",         genre: "Romance",  year: 1847, available: true,  cover: "📙" },
  { id: "b21", title: "Rebecca",                     author: "Daphne du Maurier",    genre: "Romance",  year: 1938, available: true,  cover: "📙" },
  { id: "b22", title: "Gone with the Wind",          author: "Margaret Mitchell",    genre: "Romance",  year: 1936, available: true,  cover: "📙" },
  // Fantasy (5)
  { id: "b5",  title: "The Hobbit",                  author: "J.R.R. Tolkien",       genre: "Fantasy",  year: 1937, available: false, cover: "📗" },
  { id: "b7",  title: "The Catcher in the Rye",     author: "J.D. Salinger",        genre: "Fantasy",  year: 1951, available: true,  cover: "📕" },
  { id: "b23", title: "The Name of the Wind",        author: "Patrick Rothfuss",     genre: "Fantasy",  year: 2007, available: true,  cover: "📗" },
  { id: "b24", title: "A Wizard of Earthsea",        author: "Ursula K. Le Guin",   genre: "Fantasy",  year: 1968, available: true,  cover: "📗" },
  { id: "b25", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", genre: "Fantasy",  year: 1950, available: true,  cover: "📗" },
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
