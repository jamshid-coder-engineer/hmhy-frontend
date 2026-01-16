export default function ProfilePage() {
  const name = localStorage.getItem("studentName") || "Student";
  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      <h1 className="text-xl font-semibold">Profil</h1>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Ism</div>
        <div className="text-lg font-semibold">{name}</div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <div className="text-white/70 text-sm">Darslar statistikasi</div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-white/60 text-xs">Kelayotgan</div>
            <div className="text-xl font-semibold">0</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-white/60 text-xs">Otgan</div>
            <div className="text-xl font-semibold">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
