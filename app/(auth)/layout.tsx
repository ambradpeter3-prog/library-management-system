export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1029]">
      {/* Subtle radial glow behind the card — matches the reference screenshot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Top mini-nav so users can go back to the landing page */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            LM
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
            Library Portal
          </span>
        </a>
      </header>

      {/* Centered card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </div>
    </div>
  );
}
