import { useState } from "react";
import { 
  Search, 
  Eye, 
  Edit, 
  // Ban, 
  Trash2, 
  UserCheck, 
  Users, 
  UserMinus,
  MessageSquare
} from "lucide-react";
import { useStudentList, useStudentStats, type Student } from "../../../hooks/useStudents";
import { StudentDetailModal } from "./StudentDetailModal";
import { StudentEditModal } from "./StudentEditModal";
import { StudentBlockModal } from "./StudentBlockModal";
import { StudentDeleteModal } from "./StudentDeleteModal";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function StudentPage() {
  const { data: studentsData, isLoading } = useStudentList();
  const { data: statsData } = useStudentStats();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"detail" | "edit" | "block" | "delete" | null>(null);

  const students: Student[] = Array.isArray(studentsData?.data) ? studentsData.data : [];
const stats = statsData ?? {
  totalStudents: 0,
  activeStudents: 0,
  blockedStudents: 0,
};

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.phoneNumber || "").includes(searchQuery) ||
      (student.tgUsername?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const openModal = (type: typeof modalType, studentId: string) => {
    setSelectedStudent(studentId);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalType(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-[#f8faff] min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Students</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage student accounts and permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon={<Users className="w-5 h-5 text-blue-600" />} 
          description="All registered students"
          color="blue"
        />
        <StatsCard 
          title="Active Students" 
          value={stats.activeStudents} 
          icon={<UserCheck className="w-5 h-5 text-emerald-600" />} 
          description="Access permitted"
          color="emerald"
        />
        <StatsCard 
          title="Blocked Students" 
          value={stats.blockedStudents} 
          icon={<UserMinus className="w-5 h-5 text-red-600" />} 
          description="Access restricted"
          color="red"
        />
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, phone, telegram ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white border-gray-200 text-black focus-visible:ring-blue-500"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px] h-11">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="blocked">Blocked Only</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-11 px-6 font-semibold" onClick={() => setSearchQuery("")}>
            Reset
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="flex gap-20">
            <span>Student Info</span>
            <span className="ml-24">Telegram / Contact</span>
          </div>
          <div className="flex gap-12 mr-10">
            <span>Joined Date</span>
            <span>Actions</span>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2">
            <div className="flex flex-col items-center gap-3">
              <Users className="w-12 h-12 text-gray-200" />
              <p className="text-gray-500 font-medium">No students found matching your search</p>
            </div>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="border-none shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-4 flex items-center justify-between">
                
                <div className="flex items-center gap-4 w-[30%]">
                  <div className="h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 uppercase">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 leading-none">
                        {student.firstName} {student.lastName}
                      </h3>
                      <Badge variant={student.isBlocked ? "destructive" : "secondary"} className={`text-[10px] h-5 font-bold uppercase ${!student.isBlocked && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}`}>
                        {student.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 font-medium">ID: {student.id.slice(0, 8)}...</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-[30%]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    {student.tgUsername ? `@${student.tgUsername}` : <span className="text-gray-300 font-normal italic">no username</span>}
                  </div>
                  <div className="text-xs text-gray-500 font-medium ml-5">
                    {student.phoneNumber || "No phone"}
                  </div>
                </div>

                <div className="text-sm font-bold text-gray-500 w-[15%]">
                  {new Date(student.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>

                <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <ActionButton icon={<Eye className="w-4 h-4" />} label="View" color="blue" onClick={() => openModal("detail", student.id)} />
                  <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" color="gray" onClick={() => openModal("edit", student.id)} />
                  {/* <ActionButton icon={<Ban className="w-4 h-4" />} label={student.isBlocked ? "Unblock" : "Block"} color="orange" onClick={() => openModal("block", student.id)} /> */}
                  <ActionButton icon={<Trash2 className="w-4 h-4" />} label="Delete" color="red" onClick={() => openModal("delete", student.id)} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {modalType === "detail" && selectedStudent && <StudentDetailModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "edit" && selectedStudent && <StudentEditModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "block" && selectedStudent && <StudentBlockModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "delete" && selectedStudent && <StudentDeleteModal studentId={selectedStudent} onClose={closeModal} />}
    </div>
  );
}

function StatsCard({ title, value, icon, description, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 border-blue-100",
    emerald: "bg-emerald-50 border-emerald-100",
    red: "bg-red-50 border-red-100"
  };
  return (
    <Card className={`border-none shadow-sm ${colors[color]}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-black text-slate-800 tracking-tight">{value}</div>
          <p className="text-sm font-bold text-slate-500 mt-1">{title}</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({ icon, label, color, onClick }: any) {
  const colors: any = {
    blue: "hover:bg-blue-50 text-blue-600 border-blue-100",
    gray: "hover:bg-slate-50 text-slate-600 border-slate-100",
    orange: "hover:bg-orange-50 text-orange-600 border-orange-100",
    red: "hover:bg-red-50 text-red-600 border-red-100"
  };
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`h-9 gap-2 font-bold text-xs border transition-all ${colors[color]}`}
      onClick={onClick}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </Button>
  );
}