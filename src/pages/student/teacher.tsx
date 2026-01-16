export default function TeachersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Ustozlar ro'yxati</h1>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
        <input
          placeholder="Ustozlarni izlash..."
          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 outline-none"
        />
        <div className="mt-3 flex items-center justify-between text-sm text-white/70">
          <span>Filterlar</span>
          <span className="text-white/50">⌄</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Otiladigan darslar</div>
        <div className="text-2xl font-semibold text-white">0</div>

        <button className="mt-3 w-full rounded-xl bg-emerald-400 text-neutral-950 font-semibold py-2">
          View & Book Lessons
        </button>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Otgan darslar</div>
        <div className="text-2xl font-semibold text-white">0</div>
      </div>
    </div>
  );
}
