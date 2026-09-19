type Props = {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  sub?: string;
};

export default function StatsCard({ label, value, icon, color, sub }: Props) {
  return (
    <div className={`rounded-xl p-5 ${color} flex items-start gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-3xl font-bold mt-0.5">{value}</p>
        {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
