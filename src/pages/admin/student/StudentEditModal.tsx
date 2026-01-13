import React, { useState, useEffect } from 'react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useUpdateStudent } from '../../../hooks/useStudentMutations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

export function StudentEditModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data } = useStudentDetail(studentId);
  const updateStudent = useUpdateStudent();
  const student = data?.data;

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phoneNumber: '', email: '', bio: '', languageCode: 'uz', timezone: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        phoneNumber: student.phoneNumber || '',
        email: student.email || '',
        bio: student.bio || '',
        languageCode: student.languageCode || 'uz',
        timezone: student.timezone || ''
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent.mutate({ id: studentId, ...formData }, { onSuccess: onClose });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">Update Student Info</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">First Name</Label>
              <Input className="font-medium" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Last Name</Label>
              <Input className="font-medium" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Phone</Label>
              <Input className="font-medium" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Email</Label>
              <Input className="font-medium" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Language</Label>
              <Select value={formData.languageCode} onValueChange={(val) => setFormData({...formData, languageCode: val})}>
                <SelectTrigger className="font-medium"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz">Uzbek</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Timezone</Label>
              <Input placeholder="UTC+5" className="font-medium" value={formData.timezone} onChange={(e) => setFormData({...formData, timezone: e.target.value})} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Bio</Label>
            <Textarea rows={3} className="font-medium resize-none" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="font-bold">Cancel</Button>
            <Button type="submit" disabled={updateStudent.isPending} className="bg-slate-900 font-bold px-8 shadow-none">
              {updateStudent.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}