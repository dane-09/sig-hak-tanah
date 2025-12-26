export default function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-xl shadow-lg p-6 text-white ${color}`}>
      <h3 className="text-sm font-medium opacity-90">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}
