import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import { PrincipalDashboard, TeacherDashboard, ParentDashboard } from './components/Dashboards';
import {
  UserManagement,
  TimetableManagement,
  AttendanceManagement,
  AcademicRecords,
  FeeManagement,
  AssignmentManagement,
  AdmissionsManagement,
  ExamManagement,
  NotificationsModule,
  LibraryManagement,
  HRPayrollManagement,
} from './components/Modules';
import { User } from './types';

const AppContent: React.FC = () => {
  const { currentUser, setCurrentUser } = useApp();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveModule('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveModule('dashboard');
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      users: 'User Management',
      timetable: 'Timetable',
      attendance: 'Attendance',
      academics: 'Academic Records',
      assignments: 'Assignments',
      admissions: 'Admissions',
      exams: 'Exams',
      fees: 'Fee Management',
      notifications: 'Notifications',
      students: 'My Students',
      library: 'Library Management',
      hr: 'HR & Payroll',
    };
    return titles[activeModule] || 'Dashboard';
  };

  const renderModule = () => {
    // Dashboard based on role
    if (activeModule === 'dashboard') {
      if (currentUser.role === 'principal') return <PrincipalDashboard />;
      if (currentUser.role === 'teacher') return <TeacherDashboard />;
      if (currentUser.role === 'parent') return <ParentDashboard />;
    }

    // Common modules
    switch (activeModule) {
      case 'users':
        return <UserManagement />;
      case 'timetable':
        return <TimetableManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'academics':
        return <AcademicRecords />;
      case 'fees':
        return <FeeManagement />;
      case 'assignments':
        return <AssignmentManagement />;
      case 'admissions':
        return <AdmissionsManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'notifications':
        return <NotificationsModule />;
      case 'library':
        return <LibraryManagement />;
      case 'hr':
        return <HRPayrollManagement />;
      case 'students':
        return <AttendanceManagement />; // Reuse for student listing
      default:
        return <PrincipalDashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        currentUser={currentUser}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className="main-content">
        <TopHeader
          title={getPageTitle()}
          currentUser={currentUser}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="page-content">
          {renderModule()}
        </div>
        <footer className="footer">
          <div className="wcag-badge">
            <span>✓</span>
            WCAG 2.1 AA Compliant
          </div>
          <p style={{ marginTop: '8px' }}>© 2025 School Management System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
