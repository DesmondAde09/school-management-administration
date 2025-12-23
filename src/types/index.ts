export interface School {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'principal' | 'teacher' | 'parent' | 'admin';
  avatar: string;
  schoolId: string;
  assignedClasses?: string[];
  childId?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  parentId: string;
  avatar: string;
  admissionDate: string;
  status: 'active' | 'inactive';
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  examType: string;
  score: number;
  maxScore: number;
  term: string;
  date: string;
}

export interface Fee {
  id: string;
  studentId: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  description: string;
  teacherId: string;
  submissions: number;
  totalStudents: number;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  date: string;
  read: boolean;
}

export interface ApprovalRequest {
  id: string;
  type: 'leave' | 'fee_structure' | 'result' | 'admission';
  requestedBy: string;
  avatar: string;
  details: string;
  amount?: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface Exam {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  classes: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Application {
  id: number;
  name: string;
  class: string;
  status: 'pending' | 'approved' | 'under_review' | 'rejected';
  date: string;
  documents: number;
}

// Tier 2: Library & Resource Management
export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: 'textbook' | 'fiction' | 'non-fiction' | 'reference' | 'magazine';
  publisher: string;
  year: number;
  copies: number;
  available: number;
  location: string;
  coverUrl?: string;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: 'student' | 'teacher';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue' | 'lost';
  fine?: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'projector' | 'laptop' | 'sports_equipment' | 'lab_equipment' | 'audio_visual';
  quantity: number;
  available: number;
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
}

// Tier 2: HR & Payroll
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'teacher' | 'admin' | 'support_staff' | 'driver' | 'security';
  department: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'on_leave' | 'terminated';
  avatar: string;
  qualifications: string[];
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    ifsc: string;
  };
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  paidDate?: string;
}

export interface EmployeeAttendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'half_day' | 'on_leave';
  hoursWorked: number;
}
