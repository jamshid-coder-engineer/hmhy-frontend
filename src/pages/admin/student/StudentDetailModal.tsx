import { useStudentDetail } from '../../../hooks/useStudents';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { ScrollArea } from "../../../components/ui/scroll-area";

export function StudentDetailModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data } = useStudentDetail(studentId);
  const student = data?.data;

  const DetailRow = ({ label, value, full = false }: any) => (
    <div className={`p-3 bg-slate-50/50 rounded-lg border border-slate-100 ${full ? 'col-span-2' : ''}`}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800 break-all">{value || '—'}</p>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-none p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-slate-900 text-white">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-black">Student Profile</DialogTitle>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase">Database Record: {student?.id}</p>
            </div>
            <Badge className={`font-black ${student?.isBlocked ? 'bg-red-500' : 'bg-emerald-500'}`}>
              {student?.isBlocked ? 'BLOCKED' : 'ACTIVE'}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-6">
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="First Name" value={student?.firstName} />
            <DetailRow label="Last Name" value={student?.lastName} />
            <DetailRow label="Telegram Username" value={student?.tgUsername ? `@${student.tgUsername}` : null} />
            <DetailRow label="Telegram ID" value={student?.tgId} />
            <DetailRow label="Phone Number" value={student?.phoneNumber} />
            <DetailRow label="Email Address" value={student?.email} />
            <DetailRow label="Language" value={student?.languageCode?.toUpperCase()} />
            <DetailRow label="Timezone" value={student?.timezone} />
            <DetailRow label="Bio / Notes" value={student?.bio} full />
            <div className="col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <DetailRow label="Registered On" value={student?.createdAt && new Date(student.createdAt).toLocaleString()} />
              <DetailRow label="Last Updated" value={student?.updatedAt && new Date(student.updatedAt).toLocaleString()} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}