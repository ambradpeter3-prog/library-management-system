type Props = { available: boolean };

export default function Badge({ available }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        available
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-rose-500"}`} />
      {available ? "Available" : "Borrowed"}
    </span>
  );
}
