export default function TeachersPage() {
  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      <h1 className="text-xl font-semibold">Ustozlar ro'yxati</h1>

      <input
        placeholder="Ustozlarni izlash..."
        className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none"
      />

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Otiladigan darslar</div>
        <div className="text-2xl font-semibold">0</div>
        <button className="mt-3 w-full rounded-xl bg-emerald-500 text-black font-semibold py-2">
          View & Book Lessons
        </button>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Otgan darslar</div>
        <div className="text-2xl font-semibold">0</div>
      </div>
    </div>
  );
}
