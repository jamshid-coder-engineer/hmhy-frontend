import { AlertTriangle } from 'lucide-react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useBlockStudent } from '../../../hooks/useStudentMutations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export function StudentBlockModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data, isLoading } = useStudentDetail(studentId);
  const blockStudent = useBlockStudent();
  const student = data?.data;

  const handleBlock = () => {
    blockStudent.mutate(studentId, { onSuccess: onClose });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-none">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full ${student?.isBlocked ? 'bg-emerald-100' : 'bg-orange-100'}`}>
              <AlertTriangle className={`w-5 h-5 ${student?.isBlocked ? 'text-emerald-600' : 'text-orange-600'}`} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {student?.isBlocked ? 'Unblock Student' : 'Block Student'}
              </DialogTitle>
              <DialogDescription>
                {student?.isBlocked ? 'Restore platform access' : 'Restrict platform access'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3 p-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900">{student?.firstName} {student?.lastName}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">@{student?.tgUsername || 'no-username'}</p>
            </div>

            <div className={`p-4 rounded-xl border ${student?.isBlocked ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-orange-50 border-orange-100 text-orange-800'}`}>
              <p className="text-sm font-medium leading-relaxed">
                {student?.isBlocked 
                  ? "Are you sure? This will restore the student's ability to login and use all features."
                  : "Warning: Blocking will immediately prevent the student from accessing their dashboard."}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} className="font-bold">Cancel</Button>
          <Button 
            onClick={handleBlock} 
            disabled={blockStudent.isPending}
            className={`font-bold shadow-none ${student?.isBlocked ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            {blockStudent.isPending ? 'Processing...' : student?.isBlocked ? 'Confirm Unblock' : 'Confirm Block'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}