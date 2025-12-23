import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons } from './Icons';
import { mockUsers, mockBooks, mockBookIssues, mockResources, mockEmployees, mockLeaveRequests, mockPayroll } from '../data/mockData';
import { Fee } from '../types';

// User Management Module
export const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('teachers');
  const [showModal, setShowModal] = useState(false);

  const teachers = mockUsers.filter(u => u.role === 'teacher');
  const parents = mockUsers.filter(u => u.role === 'parent');

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">Manage teachers, staff, and parent accounts</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
            Teachers
          </button>
          <button className={`tab-btn ${activeTab === 'parents' ? 'active' : ''}`} onClick={() => setActiveTab('parents')}>
            Parents
          </button>
          <button className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>
            Staff
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icons.UserPlus />
          Add New User
        </button>
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Assigned Classes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'teachers' ? teachers : parents).map(user => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          {user.avatar}
                        </div>
                        <span style={{ fontWeight: '600' }}>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td><span className="badge info">{user.role}</span></td>
                    <td>{user.assignedClasses?.join(', ') || '—'}</td>
                    <td><span className="badge success">Active</span></td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>Edit</button>
                      <button className="btn btn-danger btn-sm">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New User</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="Enter email address" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-input form-select">
                  <option>Teacher</option>
                  <option>Parent</option>
                  <option>Admin Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Assign Classes</label>
                <select className="form-input form-select">
                  <option>Class 10A</option>
                  <option>Class 10B</option>
                  <option>Class 9A</option>
                  <option>Class 8A</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Timetable Management
export const TimetableManagement: React.FC = () => {
  const { timetable } = useApp();
  const [selectedClass, setSelectedClass] = useState('10A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00'];

  const getEntry = (day: string, time: string) => {
    return timetable.find(t => t.day === day && t.time === time && t.class === selectedClass);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Timetable Management</h1>
        <p className="page-subtitle">Create and manage class schedules</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <select
          className="form-input form-select"
          style={{ width: 'auto' }}
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10A">Class 10A</option>
          <option value="10B">Class 10B</option>
          <option value="9A">Class 9A</option>
          <option value="8A">Class 8A</option>
        </select>
        <button className="btn btn-primary">
          <Icons.Calendar />
          Add Time Slot
        </button>
      </div>

      <div className="card">
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <div className="timetable-grid" style={{ gridTemplateColumns: '80px repeat(5, 1fr)', minWidth: '600px' }}>
            <div></div>
            {days.map(day => (
              <div className="timetable-header" key={day}>{day}</div>
            ))}

            {times.map(time => (
              <React.Fragment key={time}>
                <div className="timetable-time">{time}</div>
                {days.map(day => {
                  const entry = getEntry(day, time);
                  return (
                    <div
                      key={`${day}-${time}`}
                      className="timetable-cell"
                      style={{
                        background: entry ? 'var(--primary-light)' : 'var(--gray-50)',
                        cursor: 'pointer',
                      }}
                    >
                      {entry ? (
                        <>
                          <div className="timetable-subject">{entry.subject}</div>
                          <div className="timetable-room">{entry.room}</div>
                        </>
                      ) : (
                        <div style={{ color: 'var(--gray-400)', fontSize: '11px' }}>+ Add</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Attendance Management
export const AttendanceManagement: React.FC = () => {
  const { students, attendance, setAttendance, currentUser } = useApp();
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedDate, setSelectedDate] = useState('2025-01-06');

  const filteredStudents = students.filter(s => s.class === selectedClass);

  const getAttendanceStatus = (studentId: string) => {
    const record = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return record?.status || null;
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    const existingIndex = attendance.findIndex(a => a.studentId === studentId && a.date === selectedDate);
    if (existingIndex >= 0) {
      setAttendance(prev => prev.map((a, i) => i === existingIndex ? { ...a, status } : a));
    } else {
      setAttendance(prev => [...prev, {
        id: `A${Date.now()}`,
        studentId,
        date: selectedDate,
        status,
        markedBy: currentUser?.id || 'U001',
      }]);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance Management</h1>
        <p className="page-subtitle">Record and track student attendance</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select
          className="form-input form-select"
          style={{ width: 'auto' }}
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10">Class 10</option>
          <option value="9">Class 9</option>
          <option value="8">Class 8</option>
        </select>
        <input
          type="date"
          className="form-input"
          style={{ width: 'auto' }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Mark Attendance - {selectedDate}</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%' }}></span>
              Present
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--danger)', borderRadius: '50%' }}></span>
              Absent
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--warning)', borderRadius: '50%' }}></span>
              Late
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%' }}></span>
              Excused
            </span>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student</th>
                  <th>Section</th>
                  <th>Status</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '24px' }}>{student.avatar}</span>
                          <span style={{ fontWeight: '600' }}>{student.name}</span>
                        </div>
                      </td>
                      <td>{student.section}</td>
                      <td>
                        {status ? (
                          <span className={`badge ${status === 'present' ? 'success' : status === 'absent' ? 'danger' : status === 'late' ? 'warning' : 'info'}`}>
                            {status}
                          </span>
                        ) : (
                          <span className="badge neutral">Not Marked</span>
                        )}
                      </td>
                      <td>
                        <div className="attendance-btns">
                          <button
                            className={`attendance-btn ${status === 'present' ? 'present' : 'inactive'}`}
                            onClick={() => markAttendance(student.id, 'present')}
                            title="Present"
                          >
                            P
                          </button>
                          <button
                            className={`attendance-btn ${status === 'absent' ? 'absent' : 'inactive'}`}
                            onClick={() => markAttendance(student.id, 'absent')}
                            title="Absent"
                          >
                            A
                          </button>
                          <button
                            className={`attendance-btn ${status === 'late' ? 'late' : 'inactive'}`}
                            onClick={() => markAttendance(student.id, 'late')}
                            title="Late"
                          >
                            L
                          </button>
                          <button
                            className={`attendance-btn ${status === 'excused' ? 'excused' : 'inactive'}`}
                            onClick={() => markAttendance(student.id, 'excused')}
                            title="Excused"
                          >
                            E
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Academic Records Module
export const AcademicRecords: React.FC = () => {
  const { students, grades, currentUser } = useApp();
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id);
  const [activeTab, setActiveTab] = useState('grades');

  const studentGrades = grades.filter(g => g.studentId === selectedStudent);
  const selectedStudentData = students.find(s => s.id === selectedStudent);

  const calculateGPA = () => {
    if (studentGrades.length === 0) return 0;
    const total = studentGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 4, 0);
    return (total / studentGrades.length).toFixed(2);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Academic Records</h1>
        <p className="page-subtitle">View and manage student grades and academic performance</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => setActiveTab('grades')}>
            Grade Entry
          </button>
          <button className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            Report Cards
          </button>
          <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
            Performance Analysis
          </button>
        </div>

        {currentUser?.role !== 'parent' && (
          <select
            className="form-input form-select"
            style={{ width: 'auto' }}
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name} - Class {s.class}{s.section}</option>
            ))}
          </select>
        )}
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Grade Overview - {selectedStudentData?.name}</h3>
              <span className="badge success">GPA: {calculateGPA()}</span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Exam Type</th>
                      <th>Score</th>
                      <th>Max Score</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentGrades.map(grade => {
                      const percentage = (grade.score / grade.maxScore) * 100;
                      const letterGrade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'D';
                      return (
                        <tr key={grade.id}>
                          <td style={{ fontWeight: '600' }}>{grade.subject}</td>
                          <td><span className="badge info">{grade.examType}</span></td>
                          <td>{grade.score}</td>
                          <td>{grade.maxScore}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div className="progress-bar" style={{ width: '100px' }}>
                                <div
                                  className={`progress-bar-fill ${percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'danger'}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span style={{ fontSize: '13px' }}>{percentage.toFixed(0)}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'danger'}`}>
                              {letterGrade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Performance Summary</h3>
            </div>
            <div className="card-body">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--primary)' }}>{calculateGPA()}</div>
                <div style={{ color: 'var(--gray-500)' }}>Cumulative GPA</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>
                    {studentGrades.filter(g => (g.score / g.maxScore) >= 0.8).length}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>A Grades</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>{studentGrades.length}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Total Exams</div>
                </div>
              </div>
            </div>
          </div>

          {currentUser?.role !== 'parent' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Quick Actions</h3>
              </div>
              <div className="card-body">
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
                  <Icons.FileText />
                  Enter New Grades
                </button>
                <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '12px' }}>
                  <Icons.Download />
                  Generate Report Card
                </button>
                <button className="btn btn-outline" style={{ width: '100%' }}>
                  <Icons.Upload />
                  Bulk Upload Grades
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fee Management Module
export const FeeManagement: React.FC = () => {
  const { students, fees, setFees, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);

  const pendingFees = fees.filter(f => f.status === 'pending');
  const overdueFees = fees.filter(f => f.status === 'overdue');
  const totalCollected = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status !== 'paid').reduce((sum, f) => sum + f.amount, 0);

  const handlePayment = (fee: Fee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    if (selectedFee) {
      setFees(prev => prev.map(f =>
        f.id === selectedFee.id ? { ...f, status: 'paid', paidDate: new Date().toISOString().split('T')[0] } : f
      ));
      setShowPaymentModal(false);
      setSelectedFee(null);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Fee Management</h1>
        <p className="page-subtitle">Manage fee structures, payments, and generate receipts</p>
      </div>

      {currentUser?.role === 'principal' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon success"><Icons.DollarSign /></div>
              <div className="stat-content">
                <div className="stat-label">Total Collected</div>
                <div className="stat-value">${totalCollected.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon warning"><Icons.DollarSign /></div>
              <div className="stat-content">
                <div className="stat-label">Pending Amount</div>
                <div className="stat-value">${totalPending.toLocaleString()}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon danger"><Icons.DollarSign /></div>
              <div className="stat-content">
                <div className="stat-label">Overdue Payments</div>
                <div className="stat-value">{overdueFees.length}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon primary"><Icons.Users /></div>
              <div className="stat-content">
                <div className="stat-label">Pending Approvals</div>
                <div className="stat-value">{pendingFees.length}</div>
              </div>
            </div>
          </div>

          <div className="tab-nav" style={{ marginBottom: '24px' }}>
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`tab-btn ${activeTab === 'structure' ? 'active' : ''}`} onClick={() => setActiveTab('structure')}>
              Fee Structure
            </button>
            <button className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
              Payment History
            </button>
          </div>
        </>
      )}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Fee Records</h3>
          {currentUser?.role === 'principal' && (
            <button className="btn btn-primary btn-sm">
              <Icons.DollarSign />
              Add Fee Structure
            </button>
          )}
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Fee Type</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map(fee => {
                  const student = students.find(s => s.id === fee.studentId);
                  return (
                    <tr key={fee.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '24px' }}>{student?.avatar}</span>
                          <div>
                            <div style={{ fontWeight: '600' }}>{student?.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>Class {student?.class}{student?.section}</div>
                          </div>
                        </div>
                      </td>
                      <td>{fee.type}</td>
                      <td style={{ fontWeight: '600' }}>${fee.amount}</td>
                      <td>{fee.dueDate}</td>
                      <td>
                        <span className={`badge ${fee.status === 'paid' ? 'success' : fee.status === 'overdue' ? 'danger' : 'warning'}`}>
                          {fee.status}
                        </span>
                      </td>
                      <td>
                        {fee.status !== 'paid' ? (
                          <button className="btn btn-success btn-sm" onClick={() => handlePayment(fee)}>
                            Pay Now
                          </button>
                        ) : (
                          <button className="btn btn-secondary btn-sm">
                            <Icons.Download />
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPaymentModal && selectedFee && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Process Payment</h3>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--primary)' }}>${selectedFee.amount}</div>
                <div style={{ color: 'var(--gray-500)' }}>{selectedFee.type}</div>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select className="form-input form-select">
                  <option>Credit/Debit Card</option>
                  <option>Bank Transfer</option>
                  <option>E-Wallet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-input" placeholder="**** **** **** ****" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input type="text" className="form-input" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input type="text" className="form-input" placeholder="***" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={processPayment}>Pay ${selectedFee.amount}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Assignments Module
export const AssignmentManagement: React.FC = () => {
  const { assignments, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Assignment Management</h1>
        <p className="page-subtitle">Create, publish, and track student assignments</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        {currentUser?.role !== 'parent' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Icons.FileText />
            Create Assignment
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {assignments.map(assignment => (
          <div className="card" key={assignment.id}>
            <div className="card-header">
              <div>
                <h3 className="card-title">{assignment.title}</h3>
                <span className="badge info" style={{ marginTop: '4px' }}>{assignment.subject}</span>
              </div>
              <span className="badge warning">{assignment.class}</span>
            </div>
            <div className="card-body">
              <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '16px' }}>
                {assignment.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: 'var(--gray-500)' }}>
                <span>Due: {assignment.dueDate}</span>
                <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill primary"
                  style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>View Details</button>
                {currentUser?.role !== 'parent' && (
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Review Submissions</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Assignment</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="Assignment title" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-input form-select">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <select className="form-input form-select">
                    <option>10A</option>
                    <option>10B</option>
                    <option>9A</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={4} placeholder="Assignment details and instructions..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Attachments</label>
                <div style={{ border: '2px dashed var(--gray-200)', borderRadius: 'var(--radius)', padding: '24px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  <Icons.Upload />
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>Drag & drop files or click to browse</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Create Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Admissions Module
export const AdmissionsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications');

  const applications = [
    { id: 1, name: 'John Smith', class: '10', status: 'pending' as const, date: '2025-01-08', documents: 3 },
    { id: 2, name: 'Sarah Johnson', class: '9', status: 'approved' as const, date: '2025-01-07', documents: 5 },
    { id: 3, name: 'Michael Brown', class: '8', status: 'under_review' as const, date: '2025-01-06', documents: 4 },
    { id: 4, name: 'Emily Davis', class: '10', status: 'rejected' as const, date: '2025-01-05', documents: 2 },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Admissions Management</h1>
        <p className="page-subtitle">Process student applications and manage enrollments</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"><Icons.UserPlus /></div>
          <div className="stat-content">
            <div className="stat-label">Total Applications</div>
            <div className="stat-value">48</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning"><Icons.Clipboard /></div>
          <div className="stat-content">
            <div className="stat-label">Pending Review</div>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success"><Icons.Check /></div>
          <div className="stat-content">
            <div className="stat-label">Approved</div>
            <div className="stat-value">28</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon danger"><Icons.X /></div>
          <div className="stat-content">
            <div className="stat-label">Rejected</div>
            <div className="stat-value">8</div>
          </div>
        </div>
      </div>

      <div className="tab-nav" style={{ marginBottom: '24px' }}>
        <button className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}>
          Applications
        </button>
        <button className={`tab-btn ${activeTab === 'enrolled' ? 'active' : ''}`} onClick={() => setActiveTab('enrolled')}>
          Enrolled Students
        </button>
        <button className={`tab-btn ${activeTab === 'waitlist' ? 'active' : ''}`} onClick={() => setActiveTab('waitlist')}>
          Waitlist
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Applications</h3>
          <button className="btn btn-primary btn-sm">
            <Icons.UserPlus />
            New Application
          </button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Applying For</th>
                  <th>Application Date</th>
                  <th>Documents</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: '600' }}>{app.name}</td>
                    <td>Class {app.class}</td>
                    <td>{app.date}</td>
                    <td>{app.documents}/5 uploaded</td>
                    <td>
                      <span className={`badge ${
                        app.status === 'approved' ? 'success' :
                        app.status === 'rejected' ? 'danger' :
                        app.status === 'pending' ? 'warning' : 'info'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>View</button>
                      {app.status === 'pending' && (
                        <>
                          <button className="btn btn-success btn-sm" style={{ marginRight: '8px' }}>Approve</button>
                          <button className="btn btn-danger btn-sm">Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exam Management Module
export const ExamManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  const exams = [
    { id: 1, name: 'Mid-Term Examination', startDate: '2025-02-15', endDate: '2025-02-25', classes: ['10', '9', '8'], status: 'upcoming' as const },
    { id: 2, name: 'Unit Test 2', startDate: '2025-01-20', endDate: '2025-01-22', classes: ['10', '9'], status: 'ongoing' as const },
    { id: 3, name: 'Unit Test 1', startDate: '2024-12-10', endDate: '2024-12-12', classes: ['10', '9', '8'], status: 'completed' as const },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Exam Management</h1>
        <p className="page-subtitle">Schedule exams, assign invigilators, and manage results</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon warning"><Icons.Calendar /></div>
          <div className="stat-content">
            <div className="stat-label">Upcoming Exams</div>
            <div className="stat-value">3</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success"><Icons.Check /></div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary"><Icons.FileText /></div>
          <div className="stat-content">
            <div className="stat-label">Results Pending</div>
            <div className="stat-value">2</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary"><Icons.Award /></div>
          <div className="stat-content">
            <div className="stat-label">Hall Tickets Generated</div>
            <div className="stat-value">450</div>
          </div>
        </div>
      </div>

      <div className="tab-nav" style={{ marginBottom: '24px' }}>
        <button className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
          Schedule
        </button>
        <button className={`tab-btn ${activeTab === 'hall_tickets' ? 'active' : ''}`} onClick={() => setActiveTab('hall_tickets')}>
          Hall Tickets
        </button>
        <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
          Results
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Exam Schedule</h3>
          <button className="btn btn-primary btn-sm">
            <Icons.Calendar />
            Create Exam
          </button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Classes</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(exam => (
                  <tr key={exam.id}>
                    <td style={{ fontWeight: '600' }}>{exam.name}</td>
                    <td>{exam.startDate}</td>
                    <td>{exam.endDate}</td>
                    <td>{exam.classes.join(', ')}</td>
                    <td>
                      <span className={`badge ${
                        exam.status === 'completed' ? 'success' :
                        exam.status === 'ongoing' ? 'warning' : 'info'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>View</button>
                      <button className="btn btn-primary btn-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Module
export const NotificationsModule: React.FC = () => {
  const { notifications } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Notifications & Messages</h1>
        <p className="page-subtitle">Send announcements and manage communications</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icons.Bell />
          Send Notification
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Notifications</h3>
        </div>
        <div className="card-body">
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                background: notification.read ? 'white' : 'var(--primary-light)',
                borderRadius: 'var(--radius)',
                marginBottom: '12px',
                border: '1px solid var(--gray-100)',
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: notification.type === 'urgent' ? '#FEE2E2' :
                           notification.type === 'warning' ? '#FEF3C7' :
                           notification.type === 'success' ? '#D1FAE5' : 'var(--primary-light)',
                color: notification.type === 'urgent' ? 'var(--danger)' :
                       notification.type === 'warning' ? 'var(--warning)' :
                       notification.type === 'success' ? 'var(--success)' : 'var(--primary)',
              }}>
                <Icons.Bell />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--gray-800)', marginBottom: '4px' }}>
                  {notification.title}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                  {notification.message}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>
                  {notification.date}
                </div>
              </div>
              <span className={`badge ${
                notification.type === 'urgent' ? 'danger' :
                notification.type === 'warning' ? 'warning' :
                notification.type === 'success' ? 'success' : 'info'
              }`}>
                {notification.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Send Notification</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" placeholder="Notification title" />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-input form-select">
                  <option>Info</option>
                  <option>Warning</option>
                  <option>Urgent</option>
                  <option>Success</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Recipients</label>
                <select className="form-input form-select">
                  <option>All Users</option>
                  <option>All Parents</option>
                  <option>All Teachers</option>
                  <option>Specific Class</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={4} placeholder="Enter your message..."></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Send Notification</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tier 2: Library Management Module
export const LibraryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'addBook' | 'issueBook' | 'returnBook'>('addBook');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const overdueBooks = mockBookIssues.filter(issue => issue.status === 'overdue');
  const issuedBooks = mockBookIssues.filter(issue => issue.status === 'issued');
  const totalBooks = mockBooks.reduce((sum, book) => sum + book.copies, 0);
  const availableBooks = mockBooks.reduce((sum, book) => sum + book.available, 0);

  const openModal = (type: 'addBook' | 'issueBook' | 'returnBook') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Library Management</h1>
        <p className="page-subtitle">Manage books, resources, and circulation</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            📚
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalBooks}</div>
            <div className="stat-label">Total Books</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#D1FAE5', color: 'var(--success)' }}>
            ✓
          </div>
          <div className="stat-content">
            <div className="stat-value">{availableBooks}</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: 'var(--warning)' }}>
            📖
          </div>
          <div className="stat-content">
            <div className="stat-value">{issuedBooks.length}</div>
            <div className="stat-label">Issued</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEE2E2', color: 'var(--danger)' }}>
            ⚠️
          </div>
          <div className="stat-content">
            <div className="stat-value">{overdueBooks.length}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>
            📚 Catalog
          </button>
          <button className={`tab-btn ${activeTab === 'circulation' ? 'active' : ''}`} onClick={() => setActiveTab('circulation')}>
            🔄 Circulation
          </button>
          <button className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>
            🔧 Resources
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => openModal('issueBook')}>
            <Icons.Book />
            Issue Book
          </button>
          <button className="btn btn-primary" onClick={() => openModal('addBook')}>
            <Icons.Plus />
            Add Book
          </button>
        </div>
      </div>

      {/* Catalog Tab */}
      {activeTab === 'catalog' && (
        <div>
          {/* Search and Filter */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-body" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="form-input form-select"
                style={{ width: 'auto', minWidth: '150px' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="textbook">Textbooks</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="reference">Reference</option>
                <option value="magazine">Magazines</option>
              </select>
            </div>
          </div>

          {/* Books Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredBooks.map(book => (
              <div key={book.id} className="card" style={{ overflow: 'hidden' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{
                      width: '80px',
                      height: '120px',
                      background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      flexShrink: 0
                    }}>
                      📖
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: 'var(--gray-800)' }}>
                        {book.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
                        by {book.author}
                      </p>
                      <span className={`badge ${book.category === 'textbook' ? 'info' : book.category === 'fiction' ? 'success' : 'warning'}`}>
                        {book.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-100)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--gray-500)' }}>ISBN:</span>
                      <span style={{ color: 'var(--gray-700)' }}>{book.isbn}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--gray-500)' }}>Location:</span>
                      <span style={{ color: 'var(--gray-700)' }}>{book.location}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Availability:</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: book.available > 0 ? 'var(--success)' : 'var(--danger)'
                      }}>
                        {book.available} / {book.copies}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Circulation Tab */}
      {activeTab === 'circulation' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Book Circulation</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Borrower</th>
                    <th>Type</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookIssues.map(issue => (
                    <tr key={issue.id}>
                      <td>
                        <div style={{ fontWeight: '500' }}>{issue.bookTitle}</div>
                      </td>
                      <td>{issue.borrowerName}</td>
                      <td>
                        <span className={`badge ${issue.borrowerType === 'teacher' ? 'info' : 'secondary'}`}>
                          {issue.borrowerType}
                        </span>
                      </td>
                      <td>{issue.issueDate}</td>
                      <td>{issue.dueDate}</td>
                      <td>
                        <span className={`badge ${
                          issue.status === 'returned' ? 'success' :
                          issue.status === 'overdue' ? 'danger' :
                          issue.status === 'issued' ? 'warning' : 'info'
                        }`}>
                          {issue.status}
                        </span>
                      </td>
                      <td>
                        {issue.status === 'issued' || issue.status === 'overdue' ? (
                          <button className="btn btn-primary btn-sm" onClick={() => openModal('returnBook')}>
                            Return
                          </button>
                        ) : (
                          <span style={{ color: 'var(--gray-400)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title">School Resources</h3>
            <button className="btn btn-primary btn-sm">
              <Icons.Plus />
              Add Resource
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Availability</th>
                    <th>Condition</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResources.map(resource => (
                    <tr key={resource.id}>
                      <td>
                        <div style={{ fontWeight: '500' }}>{resource.name}</div>
                      </td>
                      <td>
                        <span className="badge info">
                          {resource.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td>{resource.location}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, maxWidth: '100px' }}>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ 
                                  width: `${(resource.available / resource.quantity) * 100}%`,
                                  background: resource.available > 0 ? 'var(--success)' : 'var(--danger)'
                                }}
                              />
                            </div>
                          </div>
                          <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                            {resource.available}/{resource.quantity}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          resource.condition === 'excellent' ? 'success' :
                          resource.condition === 'good' ? 'info' :
                          resource.condition === 'fair' ? 'warning' : 'danger'
                        }`}>
                          {resource.condition}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>Edit</button>
                        <button className="btn btn-outline btn-sm">Reserve</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'addBook' ? 'Add New Book' : 
                 modalType === 'issueBook' ? 'Issue Book' : 'Return Book'}
              </h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'addBook' && (
                <>
                  <div className="form-group">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-input" placeholder="978-0-00-000000-0" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-input" placeholder="Book title" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-input" placeholder="Author name" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input form-select">
                        <option>Textbook</option>
                        <option>Fiction</option>
                        <option>Non-Fiction</option>
                        <option>Reference</option>
                        <option>Magazine</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Copies</label>
                      <input type="number" className="form-input" placeholder="1" min="1" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-input" placeholder="Section A, Shelf 1" />
                  </div>
                </>
              )}
              {modalType === 'issueBook' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Search Book</label>
                    <input type="text" className="form-input" placeholder="Search by title or ISBN..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Borrower Type</label>
                    <select className="form-input form-select">
                      <option>Student</option>
                      <option>Teacher</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Borrower</label>
                    <select className="form-input form-select">
                      <option>Select borrower...</option>
                      <option>Alex Martinez - Class 10A</option>
                      <option>Emma Thompson - Class 10A</option>
                      <option>Mr. James Wilson - Teacher</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </>
              )}
              {modalType === 'returnBook' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Book Condition</label>
                    <select className="form-input form-select">
                      <option>Good</option>
                      <option>Damaged</option>
                      <option>Lost</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fine (if any)</label>
                    <input type="number" className="form-input" placeholder="0.00" min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea className="form-input" rows={3} placeholder="Any additional notes..."></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                {modalType === 'addBook' ? 'Add Book' : 
                 modalType === 'issueBook' ? 'Issue Book' : 'Confirm Return'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tier 2: HR & Payroll Management Module
export const HRPayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'addEmployee' | 'processPayroll' | 'viewPayslip'>('addEmployee');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredEmployees = mockEmployees.filter(emp => 
    selectedDepartment === 'all' || emp.department === selectedDepartment
  );

  const departments = [...new Set(mockEmployees.map(emp => emp.department))];
  const pendingLeaves = mockLeaveRequests.filter(lr => lr.status === 'pending');
  const totalSalary = mockPayroll.filter(p => p.month === 'January' && p.year === 2025)
    .reduce((sum, p) => sum + p.netSalary, 0);
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;

  const openModal = (type: 'addEmployee' | 'processPayroll' | 'viewPayslip') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">HR & Payroll</h1>
        <p className="page-subtitle">Manage employees, leaves, and payroll processing</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            👥
          </div>
          <div className="stat-content">
            <div className="stat-value">{mockEmployees.length}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#D1FAE5', color: 'var(--success)' }}>
            ✓
          </div>
          <div className="stat-content">
            <div className="stat-value">{activeEmployees}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF3C7', color: 'var(--warning)' }}>
            📋
          </div>
          <div className="stat-content">
            <div className="stat-value">{pendingLeaves.length}</div>
            <div className="stat-label">Pending Leaves</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            💰
          </div>
          <div className="stat-content">
            <div className="stat-value">${(totalSalary / 1000).toFixed(0)}K</div>
            <div className="stat-label">Monthly Payroll</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="tab-nav">
          <button className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>
            👥 Employees
          </button>
          <button className={`tab-btn ${activeTab === 'leaves' ? 'active' : ''}`} onClick={() => setActiveTab('leaves')}>
            📅 Leave Requests
          </button>
          <button className={`tab-btn ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>
            💰 Payroll
          </button>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {activeTab === 'payroll' && (
            <button className="btn btn-secondary" onClick={() => openModal('processPayroll')}>
              <Icons.DollarSign />
              Process Payroll
            </button>
          )}
          <button className="btn btn-primary" onClick={() => openModal('addEmployee')}>
            <Icons.UserPlus />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-body">
              <select
                className="form-input form-select"
                style={{ width: 'auto', minWidth: '200px' }}
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Joining Date</th>
                      <th>Salary</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ 
                              width: '40px', 
                              height: '40px', 
                              background: 'var(--primary-light)', 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              fontSize: '20px'
                            }}>
                              {employee.avatar}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600' }}>{employee.name}</div>
                              <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{employee.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge info">
                            {employee.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td>{employee.department}</td>
                        <td>{employee.joiningDate}</td>
                        <td style={{ fontWeight: '600' }}>${employee.salary.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${
                            employee.status === 'active' ? 'success' :
                            employee.status === 'on_leave' ? 'warning' : 'danger'
                          }`}>
                            {employee.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-secondary btn-sm" style={{ marginRight: '8px' }}>Edit</button>
                          <button className="btn btn-outline btn-sm">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Requests Tab */}
      {activeTab === 'leaves' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Leave Requests</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Duration</th>
                    <th>Reason</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaveRequests.map(request => (
                    <tr key={request.id}>
                      <td>
                        <div style={{ fontWeight: '500' }}>{request.employeeName}</div>
                      </td>
                      <td>
                        <span className={`badge ${
                          request.leaveType === 'sick' ? 'danger' :
                          request.leaveType === 'casual' ? 'info' :
                          request.leaveType === 'earned' ? 'success' :
                          request.leaveType === 'maternity' || request.leaveType === 'paternity' ? 'warning' : 'secondary'
                        }`}>
                          {request.leaveType}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '13px' }}>
                          {request.startDate} - {request.endDate}
                        </div>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{request.reason}</div>
                      </td>
                      <td>{request.appliedDate}</td>
                      <td>
                        <span className={`badge ${
                          request.status === 'approved' ? 'success' :
                          request.status === 'rejected' ? 'danger' : 'warning'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td>
                        {request.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-success btn-sm">Approve</button>
                            <button className="btn btn-danger btn-sm">Reject</button>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--gray-400)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">January 2025 Payroll</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Basic Salary</th>
                      <th>Allowances</th>
                      <th>Deductions</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayroll.filter(p => p.month === 'January' && p.year === 2025).map(payroll => (
                      <tr key={payroll.id}>
                        <td>
                          <div style={{ fontWeight: '500' }}>{payroll.employeeName}</div>
                        </td>
                        <td>${payroll.basicSalary.toLocaleString()}</td>
                        <td style={{ color: 'var(--success)' }}>+${payroll.allowances.toLocaleString()}</td>
                        <td style={{ color: 'var(--danger)' }}>-${payroll.deductions.toLocaleString()}</td>
                        <td style={{ fontWeight: '600' }}>${payroll.netSalary.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${
                            payroll.status === 'paid' ? 'success' :
                            payroll.status === 'processed' ? 'info' : 'warning'
                          }`}>
                            {payroll.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-outline btn-sm" onClick={() => openModal('viewPayslip')}>
                            View Payslip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payroll Summary */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Payroll Summary</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: 'var(--gray-50)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--gray-800)' }}>
                    ${mockPayroll.filter(p => p.month === 'January' && p.year === 2025)
                      .reduce((sum, p) => sum + p.basicSalary, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>Total Basic Salary</div>
                </div>
                <div style={{ padding: '20px', background: '#D1FAE5', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>
                    ${mockPayroll.filter(p => p.month === 'January' && p.year === 2025)
                      .reduce((sum, p) => sum + p.allowances, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>Total Allowances</div>
                </div>
                <div style={{ padding: '20px', background: '#FEE2E2', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--danger)' }}>
                    ${mockPayroll.filter(p => p.month === 'January' && p.year === 2025)
                      .reduce((sum, p) => sum + p.deductions, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>Total Deductions</div>
                </div>
                <div style={{ padding: '20px', background: 'var(--primary-light)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                    ${mockPayroll.filter(p => p.month === 'January' && p.year === 2025)
                      .reduce((sum, p) => sum + p.netSalary, 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '4px' }}>Total Net Payroll</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: modalType === 'addEmployee' ? '600px' : '500px' }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'addEmployee' ? 'Add New Employee' : 
                 modalType === 'processPayroll' ? 'Process Payroll' : 'Payslip'}
              </h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <Icons.X />
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'addEmployee' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" placeholder="Enter full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-input" placeholder="email@school.edu" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-input" placeholder="+1 555-0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <select className="form-input form-select">
                        <option>Teacher</option>
                        <option>Admin</option>
                        <option>Support Staff</option>
                        <option>Driver</option>
                        <option>Security</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input type="text" className="form-input" placeholder="e.g., Mathematics" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Joining Date</label>
                      <input type="date" className="form-input" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Base Salary</label>
                      <input type="number" className="form-input" placeholder="50000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Qualifications</label>
                      <input type="text" className="form-input" placeholder="e.g., M.Sc., B.Ed." />
                    </div>
                  </div>
                </>
              )}
              {modalType === 'processPayroll' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Month</label>
                    <select className="form-input form-select">
                      <option>January 2025</option>
                      <option>February 2025</option>
                      <option>March 2025</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Employees</label>
                    <select className="form-input form-select">
                      <option>All Employees</option>
                      <option>Teachers Only</option>
                      <option>Support Staff Only</option>
                    </select>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)', marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Total Employees:</span>
                      <span style={{ fontWeight: '600' }}>6</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Total Payroll:</span>
                      <span style={{ fontWeight: '600' }}>$367,800</span>
                    </div>
                  </div>
                </>
              )}
              {modalType === 'viewPayslip' && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                  <p style={{ color: 'var(--gray-600)' }}>
                    Payslip preview would be displayed here with detailed breakdown of salary components.
                  </p>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }}>
                    <Icons.Download />
                    Download PDF
                  </button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              {modalType !== 'viewPayslip' && (
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  {modalType === 'addEmployee' ? 'Add Employee' : 'Process Payroll'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
