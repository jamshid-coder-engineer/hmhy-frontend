import { Trash2, AlertTriangle } from 'lucide-react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useDeleteStudent } from '../../../hooks/useStudentMutations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

export function StudentDeleteModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data } = useStudentDetail(studentId);
  const deleteStudent = useDeleteStudent();
  const student = data?.data;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25 border-none">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-black text-red-600">Permanent Delete</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Student to be removed</p>
            <p className="text-sm font-bold text-red-900">{student?.firstName} {student?.lastName}</p>
          </div>

          <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <AlertTriangle className="w-5 h-5 text-slate-400 shrink-0" />
            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              This action <b>cannot be undone</b>. All learning history, payments, and profile data will be purged.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={onClose} className="font-bold border-slate-200">Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={() => deleteStudent.mutate(studentId, { onSuccess: onClose })}
            className="font-bold bg-red-600 shadow-none"
            disabled={deleteStudent.isPending}
          >
            {deleteStudent.isPending ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}