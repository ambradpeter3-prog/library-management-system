export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Faded background photo */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/group-photo.jpg')" }}
      />
      {/* White wash overlay — controls how faded the photo is */}
      <div className="fixed inset-0 bg-slate-50/88 pointer-events-none" />
      {/* Page content sits above */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
