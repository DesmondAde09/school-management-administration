import React, { createContext, useContext, useState, ReactNode } from 'react';
import { School, User, Student, Attendance, Grade, Fee, Assignment, TimetableEntry, Notification, ApprovalRequest } from '../types';
import { mockSchool, mockStudents, mockAttendance, mockGrades, mockFees, mockAssignments, mockTimetable, mockNotifications, mockApprovals } from '../data/mockData';

interface AppContextType {
  school: School;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  students: Student[];
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
  grades: Grade[];
  fees: Fee[];
  setFees: React.Dispatch<React.SetStateAction<Fee[]>>;
  assignments: Assignment[];
  timetable: TimetableEntry[];
  notifications: Notification[];
  approvals: ApprovalRequest[];
  setApprovals: React.Dispatch<React.SetStateAction<ApprovalRequest[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [fees, setFees] = useState<Fee[]>(mockFees);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(mockApprovals);

  const value: AppContextType = {
    school: mockSchool,
    currentUser,
    setCurrentUser,
    students: mockStudents,
    attendance,
    setAttendance,
    grades: mockGrades,
    fees,
    setFees,
    assignments: mockAssignments,
    timetable: mockTimetable,
    notifications: mockNotifications,
    approvals,
    setApprovals,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
