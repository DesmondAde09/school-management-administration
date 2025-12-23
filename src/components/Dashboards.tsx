import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons } from './Icons';
import { mockUsers } from '../data/mockData';

// Principal Dashboard
export const PrincipalDashboard: React.FC = () => {
  const { students, attendance, fees, approvals, setApprovals } = useApp();

  const totalStudents = students.length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
  const todayAttendance = attendance.filter(a => a.date === '2025-01-06');
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = todayAttendance.length > 0 ? ((presentToday / todayAttendance.length) * 100).toFixed(1) : 0;
  const pendingFees = fees.filter(f => f.status === 'pending' || f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  const handleApproval = (id: string, action: 'approved' | 'rejected') => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: action } : a));
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Principal Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's your school overview for today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"><Icons.Users /></div>
          <div className="stat-content">
            <div className="stat-label">Total Students</div>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-change positive">↑ 12% from last year</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success"><Icons.Check /></div>
          <div className="stat-content">
            <div className="stat-label">Today's Attendance</div>
            <div className="stat-value">{attendanceRate}%</div>
            <div className="stat-change positive">↑ 2% from yesterday</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning"><Icons.DollarSign /></div>
          <div className="stat-content">
            <div className="stat-label">Pending Fees</div>
            <div className="stat-value">${pendingFees.toLocaleString()}</div>
            <div className="stat-change negative">↓ 5% collection rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary"><Icons.School /></div>
          <div className="stat-content">
            <div className="stat-label">Total Teachers</div>
            <div className="stat-value">{totalTeachers}</div>
            <div className="stat-change positive">All present today</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Attendance Overview</h3>
              <select className="form-input form-select" style={{ width: 'auto' }}>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="card-body">
              <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: '140px' }}></div>
                <div className="chart-bar" style={{ height: '160px' }}></div>
                <div className="chart-bar" style={{ height: '120px' }}></div>
                <div className="chart-bar" style={{ height: '180px' }}></div>
                <div className="chart-bar" style={{ height: '150px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                  <span key={day} style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Pending Approvals</h3>
              <span className="badge info">{approvals.filter(a => a.status === 'pending').length} Pending</span>
            </div>
            <div className="card-body">
              {approvals.filter(a => a.status === 'pending').map(approval => (
                <div className="approval-item" key={approval.id}>
                  <div className="approval-avatar">{approval.avatar}</div>
                  <div className="approval-content">
                    <div className="approval-title">{approval.requestedBy}</div>
                    <div className="approval-details">{approval.details}</div>
                  </div>
                  {approval.amount && (
                    <div className="approval-amount">${approval.amount.toLocaleString()}</div>
                  )}
                  <div className="approval-actions">
                    <button className="btn btn-success btn-sm" onClick={() => handleApproval(approval.id, 'approved')}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleApproval(approval.id, 'rejected')}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">School Stats</h3>
            </div>
            <div className="card-body">
              <div className="pie-chart-placeholder"></div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%' }}></span>
                  Grade 10 (35%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%' }}></span>
                  Grade 9 (25%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%' }}></span>
                  Grade 8 (22%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ width: '12px', height: '12px', background: 'var(--warning)', borderRadius: '50%' }}></span>
                  Others (18%)
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="card-body">
              {[
                { icon: '📝', text: 'New admission request received', time: '5 min ago' },
                { icon: '💰', text: 'Fee payment from Alex M.', time: '15 min ago' },
                { icon: '📊', text: 'Class 10A results published', time: '1 hour ago' },
                { icon: '📅', text: 'PTM scheduled for Jan 25', time: '2 hours ago' },
              ].map((activity, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: idx < 3 ? '1px solid var(--gray-100)' : 'none' }}>
                  <span style={{ fontSize: '20px' }}>{activity.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--gray-700)' }}>{activity.text}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Teacher Dashboard
export const TeacherDashboard: React.FC = () => {
  const { students, timetable, assignments } = useApp();
  const [selectedDate, setSelectedDate] = useState(18);

  const todaySchedule = timetable.filter(t => t.day === 'Monday' && t.class === '10A');
  const myStudents = students.filter(s => s.class === '10');

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">Teacher Workspace</h1>
        <p className="page-subtitle">Welcome back, Mr. Wilson. Here's your schedule for today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary"><Icons.Users /></div>
          <div className="stat-content">
            <div className="stat-label">My Students</div>
            <div className="stat-value">{myStudents.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success"><Icons.Calendar /></div>
          <div className="stat-content">
            <div className="stat-label">Classes Today</div>
            <div className="stat-value">{todaySchedule.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning"><Icons.FileText /></div>
          <div className="stat-content">
            <div className="stat-label">Pending Reviews</div>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon primary"><Icons.Check /></div>
          <div className="stat-content">
            <div className="stat-label">Attendance Rate</div>
            <div className="stat-value">94%</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Class Timetable</h3>
              <select className="form-input form-select" style={{ width: 'auto' }}>
                <option>Class 10A</option>
                <option>Class 10B</option>
                <option>Class 9A</option>
              </select>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div className="calendar" style={{ flex: '0 0 280px', minWidth: '280px' }}>
                  <div className="calendar-header">
                    <span className="calendar-title">January 2025</span>
                    <div className="calendar-nav">
                      <button className="calendar-nav-btn">‹</button>
                      <button className="calendar-nav-btn">›</button>
                    </div>
                  </div>
                  <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div className="calendar-day-header" key={day}>{day}</div>
                    ))}
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      return (
                        <div
                          key={i}
                          className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${day === 18 ? 'today' : ''}`}
                          onClick={() => setSelectedDate(day)}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h4 style={{ marginBottom: '16px', color: 'var(--gray-700)' }}>Today's Schedule</h4>
                  <div className="timetable-grid" style={{ gridTemplateColumns: '80px 1fr' }}>
                    {['08:00', '09:00', '10:00', '11:00', '12:00'].map((time, idx) => (
                      <React.Fragment key={time}>
                        <div className="timetable-time">{time}</div>
                        {idx < todaySchedule.length ? (
                          <div className="timetable-cell">
                            <div className="timetable-subject">{todaySchedule[idx]?.subject}</div>
                            <div className="timetable-room">{todaySchedule[idx]?.room}</div>
                          </div>
                        ) : (
                          <div className="timetable-cell" style={{ background: 'var(--gray-50)', opacity: 0.5 }}>
                            <div className="timetable-subject" style={{ color: 'var(--gray-400)' }}>Free Period</div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Student Roster</h3>
              <div className="search-box" style={{ position: 'relative' }}>
                <Icons.Search />
                <input
                  type="text"
                  placeholder="Search students..."
                  style={{
                    background: 'var(--gray-50)',
                    border: '1px solid var(--gray-200)',
                    color: 'var(--gray-700)',
                    width: '200px',
                  }}
                />
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Name</th>
                      <th>Module</th>
                      <th>Participation</th>
                      <th>Performance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myStudents.map((student, idx) => (
                      <tr key={student.id}>
                        <td>{student.avatar} {student.name.split(' ')[0]}</td>
                        <td>{student.name.split(' ')[1] || 'N/A'}</td>
                        <td>—</td>
                        <td>—</td>
                        <td>{Math.floor(Math.random() * 50) + 10}</td>
                        <td>
                          <span style={{ color: idx % 2 === 0 ? 'var(--success)' : 'var(--warning)' }}>
                            {idx % 2 === 0 ? '✓' : '◐'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {[1, 2, 3, 4].map(n => (
                              <span
                                key={n}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  background: 'var(--primary-light)',
                                  color: 'var(--primary)',
                                  borderRadius: '4px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}
                              >
                                {n}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mark-attendance-cta" style={{ marginBottom: '24px' }}>
            <div className="mark-attendance-icon">
              <Icons.Grid />
            </div>
            <h3>Mark Attendance</h3>
            <p>Click to mark today's attendance</p>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginTop: '16px' }}>
              Start Marking
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Assignments</h3>
            </div>
            <div className="card-body">
              {assignments.slice(0, 3).map(assignment => (
                <div key={assignment.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--gray-800)' }}>{assignment.title}</span>
                    <span className="badge info">{assignment.subject}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray-500)' }}>
                    <span>Due: {assignment.dueDate}</span>
                    <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '8px' }}>
                    <div
                      className="progress-bar-fill primary"
                      style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Parent Dashboard
export const ParentDashboard: React.FC = () => {
  const { currentUser, students, grades, fees, attendance } = useApp();

  const child = students.find(s => s.id === currentUser?.childId) || students[0];
  const childGrades = grades.filter(g => g.studentId === child.id);
  const childFees = fees.filter(f => f.studentId === child.id);
  const childAttendance = attendance.filter(a => a.studentId === child.id);

  const subjects = [...new Set(childGrades.map(g => g.subject))];
  const gpaBySubject = subjects.map(subject => {
    const subjectGrades = childGrades.filter(g => g.subject === subject);
    const avg = subjectGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * 10, 0) / subjectGrades.length;
    return { subject, score: avg.toFixed(2) };
  });

  const totalDue = childFees.filter(f => f.status !== 'paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title" style={{ color: 'var(--primary)' }}>Parent Portal</h1>
        <p className="page-subtitle">Track your child's academic progress and manage payments</p>
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="child-info-card">
            <h3 style={{ marginBottom: '16px', fontWeight: '600', color: 'var(--gray-800)' }}>Child Info</h3>
            <div className="child-info-grid">
              <div className="child-info-item">
                <label>Name</label>
                <span>{child.name}</span>
              </div>
              <div className="child-info-item">
                <label>Class</label>
                <span>{child.class}{child.section}</span>
              </div>
              <div className="child-info-item">
                <label>Roll No</label>
                <span>{child.rollNo}</span>
              </div>
              <div className="child-info-item">
                <label>Admission</label>
                <span>{child.admissionDate}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Academic Performance</h3>
            </div>
            <div className="card-body">
              {gpaBySubject.map(({ subject, score }) => (
                <div className="progress-bar-container" key={subject}>
                  <div className="progress-bar-header">
                    <span className="progress-bar-label">{subject}</span>
                    <span className="progress-bar-value">{score}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-bar-fill ${parseFloat(score) >= 8 ? 'primary' : parseFloat(score) >= 6 ? 'warning' : 'danger'}`}
                      style={{ width: `${parseFloat(score) * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Attendance Summary</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ textAlign: 'center', padding: '16px', background: '#D1FAE5', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>
                    {childAttendance.filter(a => a.status === 'present').length}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Present</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: '#FEE2E2', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--danger)' }}>
                    {childAttendance.filter(a => a.status === 'absent').length}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Absent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: '#FEF3C7', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>
                    {childAttendance.filter(a => a.status === 'late').length}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Late</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--primary-light)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary)' }}>
                    {childAttendance.filter(a => a.status === 'excused').length}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>Excused</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Fee Summary</h3>
            </div>
            <div className="card-body">
              {childFees.map(fee => (
                <div className="fee-card" key={fee.id} style={{ boxShadow: 'none', border: '1px solid var(--gray-100)', marginBottom: '12px' }}>
                  <div className="fee-info">
                    <h4>{fee.type}</h4>
                    <p>Due: {fee.dueDate}</p>
                  </div>
                  <div className="fee-amount">
                    <span className="amount">${fee.amount}</span>
                    <span className={`badge ${fee.status === 'paid' ? 'success' : fee.status === 'overdue' ? 'danger' : 'warning'}`} style={{ marginLeft: '8px' }}>
                      {fee.status}
                    </span>
                  </div>
                </div>
              ))}

              <button className="pay-btn">
                <Icons.DollarSign />
                Pay Fees (${totalDue})
              </button>
              <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: 'var(--danger)' }}>
                倒计时: 20天 05小时
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
