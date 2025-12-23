import { School, User, Student, Attendance, Grade, Fee, Assignment, TimetableEntry, Notification, ApprovalRequest, Book, BookIssue, Resource, Employee, LeaveRequest, Payroll } from '../types';

export const mockSchool: School = {
  id: 'SCH001',
  name: 'Greenfield International School',
  logo: '🎓',
  primaryColor: '#0066CC',
  secondaryColor: '#004C99',
  accentColor: '#00A3E0',
};

export const mockUsers: User[] = [
  { id: 'U001', name: 'Dr. Sarah Johnson', email: 'principal@school.edu', role: 'principal', avatar: '👩‍💼', schoolId: 'SCH001' },
  { id: 'U002', name: 'Mr. James Wilson', email: 'james.wilson@school.edu', role: 'teacher', avatar: '👨‍🏫', schoolId: 'SCH001', assignedClasses: ['10A', '10B', '9A'] },
  { id: 'U003', name: 'Mrs. Emily Chen', email: 'emily.chen@school.edu', role: 'teacher', avatar: '👩‍🏫', schoolId: 'SCH001', assignedClasses: ['8A', '8B'] },
  { id: 'U004', name: 'Robert Martinez', email: 'robert.m@gmail.com', role: 'parent', avatar: '👨', schoolId: 'SCH001', childId: 'S001' },
  { id: 'U005', name: 'Lisa Thompson', email: 'lisa.t@gmail.com', role: 'parent', avatar: '👩', schoolId: 'SCH001', childId: 'S002' },
];

export const mockStudents: Student[] = [
  { id: 'S001', name: 'Alex Martinez', class: '10', section: 'A', rollNo: '101', parentId: 'U004', avatar: '👦', admissionDate: '2022-04-15', status: 'active' },
  { id: 'S002', name: 'Emma Thompson', class: '10', section: 'A', rollNo: '102', parentId: 'U005', avatar: '👧', admissionDate: '2022-04-15', status: 'active' },
  { id: 'S003', name: 'Liam Johnson', class: '10', section: 'A', rollNo: '103', parentId: 'U006', avatar: '👦', admissionDate: '2022-04-16', status: 'active' },
  { id: 'S004', name: 'Sophia Davis', class: '10', section: 'B', rollNo: '104', parentId: 'U007', avatar: '👧', admissionDate: '2022-04-16', status: 'active' },
  { id: 'S005', name: 'Noah Wilson', class: '9', section: 'A', rollNo: '91', parentId: 'U008', avatar: '👦', admissionDate: '2023-04-15', status: 'active' },
  { id: 'S006', name: 'Olivia Brown', class: '9', section: 'A', rollNo: '92', parentId: 'U009', avatar: '👧', admissionDate: '2023-04-15', status: 'active' },
  { id: 'S007', name: 'William Lee', class: '8', section: 'A', rollNo: '81', parentId: 'U010', avatar: '👦', admissionDate: '2023-04-16', status: 'active' },
  { id: 'S008', name: 'Ava Garcia', class: '8', section: 'B', rollNo: '82', parentId: 'U011', avatar: '👧', admissionDate: '2023-04-16', status: 'active' },
];

export const mockAttendance: Attendance[] = [
  { id: 'A001', studentId: 'S001', date: '2025-01-06', status: 'present', markedBy: 'U002' },
  { id: 'A002', studentId: 'S002', date: '2025-01-06', status: 'present', markedBy: 'U002' },
  { id: 'A003', studentId: 'S003', date: '2025-01-06', status: 'absent', markedBy: 'U002' },
  { id: 'A004', studentId: 'S004', date: '2025-01-06', status: 'late', markedBy: 'U002' },
  { id: 'A005', studentId: 'S001', date: '2025-01-07', status: 'present', markedBy: 'U002' },
  { id: 'A006', studentId: 'S002', date: '2025-01-07', status: 'excused', markedBy: 'U002' },
];

export const mockGrades: Grade[] = [
  { id: 'G001', studentId: 'S001', subject: 'Mathematics', examType: 'Mid-Term', score: 85, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G002', studentId: 'S001', subject: 'Science', examType: 'Mid-Term', score: 92, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G003', studentId: 'S001', subject: 'English', examType: 'Mid-Term', score: 78, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G004', studentId: 'S001', subject: 'History', examType: 'Mid-Term', score: 88, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G005', studentId: 'S001', subject: 'Geography', examType: 'Mid-Term', score: 91, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G006', studentId: 'S001', subject: 'Art', examType: 'Mid-Term', score: 95, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G007', studentId: 'S002', subject: 'Mathematics', examType: 'Mid-Term', score: 92, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
  { id: 'G008', studentId: 'S002', subject: 'Science', examType: 'Mid-Term', score: 88, maxScore: 100, term: 'Term 1', date: '2025-01-15' },
];

export const mockFees: Fee[] = [
  { id: 'F001', studentId: 'S001', type: 'Tuition Fee', amount: 2500, dueDate: '2025-01-31', status: 'pending' },
  { id: 'F002', studentId: 'S001', type: 'Library Fee', amount: 150, dueDate: '2025-01-31', status: 'paid', paidDate: '2025-01-10' },
  { id: 'F003', studentId: 'S001', type: 'Lab Fee', amount: 300, dueDate: '2025-01-31', status: 'paid', paidDate: '2025-01-10' },
  { id: 'F004', studentId: 'S002', type: 'Tuition Fee', amount: 2500, dueDate: '2025-01-31', status: 'paid', paidDate: '2025-01-05' },
  { id: 'F005', studentId: 'S003', type: 'Tuition Fee', amount: 2500, dueDate: '2025-01-31', status: 'overdue' },
];

export const mockAssignments: Assignment[] = [
  { id: 'AS001', title: 'Algebra Problem Set', subject: 'Mathematics', class: '10A', dueDate: '2025-01-20', description: 'Complete exercises 1-20 from Chapter 5', teacherId: 'U002', submissions: 18, totalStudents: 25 },
  { id: 'AS002', title: 'Lab Report: Photosynthesis', subject: 'Science', class: '10A', dueDate: '2025-01-22', description: 'Write a detailed lab report', teacherId: 'U002', submissions: 12, totalStudents: 25 },
  { id: 'AS003', title: 'Essay: Climate Change', subject: 'English', class: '10A', dueDate: '2025-01-25', description: '1000 words essay on climate change effects', teacherId: 'U003', submissions: 5, totalStudents: 25 },
];

export const mockTimetable: TimetableEntry[] = [
  { id: 'T001', day: 'Monday', time: '08:00', subject: 'Mathematics', teacher: 'Mr. Wilson', room: 'Room 101', class: '10A' },
  { id: 'T002', day: 'Monday', time: '09:00', subject: 'Science', teacher: 'Mrs. Chen', room: 'Lab 1', class: '10A' },
  { id: 'T003', day: 'Monday', time: '10:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 102', class: '10A' },
  { id: 'T004', day: 'Monday', time: '11:00', subject: 'History', teacher: 'Mr. Brown', room: 'Room 103', class: '10A' },
  { id: 'T005', day: 'Tuesday', time: '08:00', subject: 'Science', teacher: 'Mrs. Chen', room: 'Lab 1', class: '10A' },
  { id: 'T006', day: 'Tuesday', time: '09:00', subject: 'Mathematics', teacher: 'Mr. Wilson', room: 'Room 101', class: '10A' },
  { id: 'T007', day: 'Tuesday', time: '10:00', subject: 'Art', teacher: 'Ms. Garcia', room: 'Art Room', class: '10A' },
  { id: 'T008', day: 'Tuesday', time: '11:00', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym', class: '10A' },
  { id: 'T009', day: 'Wednesday', time: '08:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 102', class: '10A' },
  { id: 'T010', day: 'Wednesday', time: '09:00', subject: 'Geography', teacher: 'Mr. Lee', room: 'Room 104', class: '10A' },
  { id: 'T011', day: 'Thursday', time: '08:00', subject: 'Mathematics', teacher: 'Mr. Wilson', room: 'Room 101', class: '10A' },
  { id: 'T012', day: 'Thursday', time: '09:00', subject: 'History', teacher: 'Mr. Brown', room: 'Room 103', class: '10A' },
  { id: 'T013', day: 'Friday', time: '08:00', subject: 'Science', teacher: 'Mrs. Chen', room: 'Lab 1', class: '10A' },
  { id: 'T014', day: 'Friday', time: '09:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 102', class: '10A' },
];

export const mockNotifications: Notification[] = [
  { id: 'N001', title: 'Fee Payment Reminder', message: 'Tuition fee for January is due on 31st', type: 'warning', date: '2025-01-10', read: false },
  { id: 'N002', title: 'Parent-Teacher Meeting', message: 'PTM scheduled for January 25th at 10 AM', type: 'info', date: '2025-01-08', read: false },
  { id: 'N003', title: 'School Closure', message: 'School will remain closed on January 26th', type: 'urgent', date: '2025-01-07', read: true },
  { id: 'N004', title: 'Result Published', message: 'Mid-term results are now available', type: 'success', date: '2025-01-06', read: true },
];

export const mockApprovals: ApprovalRequest[] = [
  { id: 'AP001', type: 'leave', requestedBy: 'Mr. James Wilson', avatar: '👨‍🏫', details: 'Sick Leave Request', status: 'pending', date: '2025-01-10' },
  { id: 'AP002', type: 'fee_structure', requestedBy: 'Admin Office', avatar: '🏢', details: 'New Fee Structure Approval', amount: 15000, status: 'pending', date: '2025-01-09' },
  { id: 'AP003', type: 'result', requestedBy: 'Mrs. Emily Chen', avatar: '👩‍🏫', details: 'Class 8A Mid-Term Results', status: 'pending', date: '2025-01-08' },
  { id: 'AP004', type: 'admission', requestedBy: 'Admissions Dept', avatar: '📝', details: 'New Admission: John Smith', amount: 45000, status: 'pending', date: '2025-01-07' },
];

// Tier 2: Library & Resource Management Mock Data
export const mockBooks: Book[] = [
  { id: 'B001', isbn: '978-0-13-468599-1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'textbook', publisher: 'MIT Press', year: 2022, copies: 10, available: 7, location: 'Section A, Shelf 3' },
  { id: 'B002', isbn: '978-0-06-112008-4', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'fiction', publisher: 'Harper Perennial', year: 2006, copies: 15, available: 12, location: 'Section B, Shelf 1' },
  { id: 'B003', isbn: '978-0-452-28423-4', title: '1984', author: 'George Orwell', category: 'fiction', publisher: 'Signet Classic', year: 1961, copies: 12, available: 9, location: 'Section B, Shelf 1' },
  { id: 'B004', isbn: '978-0-07-352957-8', title: 'Physics: Principles with Applications', author: 'Douglas C. Giancoli', category: 'textbook', publisher: 'Pearson', year: 2021, copies: 20, available: 15, location: 'Section A, Shelf 5' },
  { id: 'B005', isbn: '978-0-13-409341-3', title: 'Chemistry: The Central Science', author: 'Theodore Brown', category: 'textbook', publisher: 'Pearson', year: 2020, copies: 18, available: 14, location: 'Section A, Shelf 5' },
  { id: 'B006', isbn: '978-0-19-861171-5', title: 'Oxford English Dictionary', author: 'Oxford University Press', category: 'reference', publisher: 'Oxford', year: 2023, copies: 5, available: 5, location: 'Reference Section' },
  { id: 'B007', isbn: '978-0-316-76948-0', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'fiction', publisher: 'Little, Brown', year: 1991, copies: 8, available: 6, location: 'Section B, Shelf 2' },
  { id: 'B008', isbn: '978-0-14-028329-7', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'fiction', publisher: 'Penguin', year: 2004, copies: 10, available: 8, location: 'Section B, Shelf 2' },
  { id: 'B009', isbn: '978-0-07-340106-5', title: 'Biology', author: 'Peter Raven', category: 'textbook', publisher: 'McGraw-Hill', year: 2022, copies: 15, available: 11, location: 'Section A, Shelf 6' },
  { id: 'B010', isbn: '978-1-936-21379-9', title: 'National Geographic Magazine', author: 'Various', category: 'magazine', publisher: 'National Geographic', year: 2025, copies: 25, available: 22, location: 'Magazine Rack' },
];

export const mockBookIssues: BookIssue[] = [
  { id: 'BI001', bookId: 'B001', bookTitle: 'Introduction to Algorithms', borrowerId: 'S001', borrowerName: 'Alex Martinez', borrowerType: 'student', issueDate: '2025-01-05', dueDate: '2025-01-19', status: 'issued' },
  { id: 'BI002', bookId: 'B002', bookTitle: 'To Kill a Mockingbird', borrowerId: 'S002', borrowerName: 'Emma Thompson', borrowerType: 'student', issueDate: '2025-01-03', dueDate: '2025-01-17', status: 'issued' },
  { id: 'BI003', bookId: 'B004', bookTitle: 'Physics: Principles with Applications', borrowerId: 'U002', borrowerName: 'Mr. James Wilson', borrowerType: 'teacher', issueDate: '2025-01-02', dueDate: '2025-02-02', status: 'issued' },
  { id: 'BI004', bookId: 'B003', bookTitle: '1984', borrowerId: 'S003', borrowerName: 'Liam Johnson', borrowerType: 'student', issueDate: '2024-12-20', dueDate: '2025-01-03', status: 'overdue' },
  { id: 'BI005', bookId: 'B007', bookTitle: 'The Catcher in the Rye', borrowerId: 'S004', borrowerName: 'Sophia Davis', borrowerType: 'student', issueDate: '2024-12-28', dueDate: '2025-01-11', returnDate: '2025-01-10', status: 'returned' },
  { id: 'BI006', bookId: 'B008', bookTitle: 'The Great Gatsby', borrowerId: 'S005', borrowerName: 'Noah Wilson', borrowerType: 'student', issueDate: '2025-01-08', dueDate: '2025-01-22', status: 'issued' },
];

export const mockResources: Resource[] = [
  { id: 'R001', name: 'Projector - Epson EB-X51', type: 'projector', quantity: 8, available: 6, location: 'AV Room', condition: 'excellent' },
  { id: 'R002', name: 'Dell Laptop - Latitude 5520', type: 'laptop', quantity: 25, available: 20, location: 'Computer Lab', condition: 'good' },
  { id: 'R003', name: 'Microscope - AmScope B120C', type: 'lab_equipment', quantity: 30, available: 28, location: 'Biology Lab', condition: 'excellent' },
  { id: 'R004', name: 'Basketball', type: 'sports_equipment', quantity: 15, available: 12, location: 'Sports Room', condition: 'good' },
  { id: 'R005', name: 'Football', type: 'sports_equipment', quantity: 12, available: 10, location: 'Sports Room', condition: 'good' },
  { id: 'R006', name: 'Bunsen Burner', type: 'lab_equipment', quantity: 20, available: 18, location: 'Chemistry Lab', condition: 'fair' },
  { id: 'R007', name: 'Smart Board - Samsung Flip', type: 'audio_visual', quantity: 5, available: 4, location: 'AV Room', condition: 'excellent' },
  { id: 'R008', name: 'Telescope - Celestron PowerSeeker', type: 'lab_equipment', quantity: 3, available: 3, location: 'Physics Lab', condition: 'excellent' },
];

// Tier 2: HR & Payroll Mock Data
export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Dr. Sarah Johnson', email: 'principal@school.edu', phone: '+1 555-0101', role: 'admin', department: 'Administration', joiningDate: '2018-04-01', salary: 95000, status: 'active', avatar: '👩‍💼', qualifications: ['Ph.D. Education', 'M.Ed.'] },
  { id: 'E002', name: 'Mr. James Wilson', email: 'james.wilson@school.edu', phone: '+1 555-0102', role: 'teacher', department: 'Mathematics', joiningDate: '2019-08-15', salary: 62000, status: 'active', avatar: '👨‍🏫', qualifications: ['M.Sc. Mathematics', 'B.Ed.'] },
  { id: 'E003', name: 'Mrs. Emily Chen', email: 'emily.chen@school.edu', phone: '+1 555-0103', role: 'teacher', department: 'Science', joiningDate: '2020-01-10', salary: 58000, status: 'active', avatar: '👩‍🏫', qualifications: ['M.Sc. Physics', 'B.Ed.'] },
  { id: 'E004', name: 'Ms. Rachel Davis', email: 'rachel.davis@school.edu', phone: '+1 555-0104', role: 'teacher', department: 'English', joiningDate: '2019-07-20', salary: 56000, status: 'on_leave', avatar: '👩‍🏫', qualifications: ['M.A. English Literature', 'B.Ed.'] },
  { id: 'E005', name: 'Mr. Michael Brown', email: 'michael.brown@school.edu', phone: '+1 555-0105', role: 'teacher', department: 'History', joiningDate: '2021-03-01', salary: 54000, status: 'active', avatar: '👨‍🏫', qualifications: ['M.A. History', 'B.Ed.'] },
  { id: 'E006', name: 'Mrs. Linda Garcia', email: 'linda.garcia@school.edu', phone: '+1 555-0106', role: 'support_staff', department: 'Administration', joiningDate: '2017-06-15', salary: 38000, status: 'active', avatar: '👩‍💻', qualifications: ['B.Com', 'Diploma in Office Management'] },
  { id: 'E007', name: 'Mr. Robert Taylor', email: 'robert.taylor@school.edu', phone: '+1 555-0107', role: 'teacher', department: 'Physical Education', joiningDate: '2020-08-01', salary: 48000, status: 'active', avatar: '🏃', qualifications: ['B.P.Ed.', 'Sports Management Certificate'] },
  { id: 'E008', name: 'Mr. David Lee', email: 'david.lee@school.edu', phone: '+1 555-0108', role: 'driver', department: 'Transport', joiningDate: '2019-05-10', salary: 32000, status: 'active', avatar: '🚌', qualifications: ['Commercial Driving License'] },
  { id: 'E009', name: 'Mr. John Martinez', email: 'john.martinez@school.edu', phone: '+1 555-0109', role: 'security', department: 'Security', joiningDate: '2018-09-01', salary: 28000, status: 'active', avatar: '👮', qualifications: ['Security Training Certificate'] },
  { id: 'E010', name: 'Ms. Anna White', email: 'anna.white@school.edu', phone: '+1 555-0110', role: 'support_staff', department: 'Library', joiningDate: '2021-01-15', salary: 35000, status: 'active', avatar: '📚', qualifications: ['B.Lib.Sc.', 'M.Lib.Sc.'] },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: 'LR001', employeeId: 'E002', employeeName: 'Mr. James Wilson', leaveType: 'sick', startDate: '2025-01-15', endDate: '2025-01-16', reason: 'Medical appointment and recovery', status: 'pending', appliedDate: '2025-01-10' },
  { id: 'LR002', employeeId: 'E004', employeeName: 'Ms. Rachel Davis', leaveType: 'maternity', startDate: '2025-01-01', endDate: '2025-04-01', reason: 'Maternity leave', status: 'approved', appliedDate: '2024-12-01' },
  { id: 'LR003', employeeId: 'E003', employeeName: 'Mrs. Emily Chen', leaveType: 'casual', startDate: '2025-01-20', endDate: '2025-01-21', reason: 'Family function', status: 'pending', appliedDate: '2025-01-08' },
  { id: 'LR004', employeeId: 'E007', employeeName: 'Mr. Robert Taylor', leaveType: 'earned', startDate: '2025-02-01', endDate: '2025-02-05', reason: 'Annual vacation', status: 'approved', appliedDate: '2025-01-05' },
  { id: 'LR005', employeeId: 'E005', employeeName: 'Mr. Michael Brown', leaveType: 'sick', startDate: '2025-01-12', endDate: '2025-01-12', reason: 'Fever', status: 'rejected', appliedDate: '2025-01-11' },
];

export const mockPayroll: Payroll[] = [
  { id: 'P001', employeeId: 'E001', employeeName: 'Dr. Sarah Johnson', month: 'January', year: 2025, basicSalary: 95000, allowances: 15000, deductions: 12000, netSalary: 98000, status: 'pending' },
  { id: 'P002', employeeId: 'E002', employeeName: 'Mr. James Wilson', month: 'January', year: 2025, basicSalary: 62000, allowances: 8000, deductions: 7500, netSalary: 62500, status: 'pending' },
  { id: 'P003', employeeId: 'E003', employeeName: 'Mrs. Emily Chen', month: 'January', year: 2025, basicSalary: 58000, allowances: 7500, deductions: 7000, netSalary: 58500, status: 'pending' },
  { id: 'P004', employeeId: 'E004', employeeName: 'Ms. Rachel Davis', month: 'January', year: 2025, basicSalary: 56000, allowances: 7000, deductions: 6500, netSalary: 56500, status: 'pending' },
  { id: 'P005', employeeId: 'E005', employeeName: 'Mr. Michael Brown', month: 'January', year: 2025, basicSalary: 54000, allowances: 6500, deductions: 6000, netSalary: 54500, status: 'pending' },
  { id: 'P006', employeeId: 'E006', employeeName: 'Mrs. Linda Garcia', month: 'January', year: 2025, basicSalary: 38000, allowances: 4000, deductions: 4200, netSalary: 37800, status: 'pending' },
  { id: 'P007', employeeId: 'E001', employeeName: 'Dr. Sarah Johnson', month: 'December', year: 2024, basicSalary: 95000, allowances: 15000, deductions: 12000, netSalary: 98000, status: 'paid', paidDate: '2024-12-28' },
  { id: 'P008', employeeId: 'E002', employeeName: 'Mr. James Wilson', month: 'December', year: 2024, basicSalary: 62000, allowances: 8000, deductions: 7500, netSalary: 62500, status: 'paid', paidDate: '2024-12-28' },
];
