import React from 'react';
import { User } from '../types';
import { mockSchool } from '../data/mockData';
import { Icons } from './Icons';

interface SidebarProps {
  currentUser: User;
  activeModule: string;
  setActiveModule: (module: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeModule,
  setActiveModule,
  onLogout,
  isOpen,
  setIsOpen,
}) => {
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
    ];

    if (currentUser.role === 'principal') {
      return [
        ...baseItems,
        { id: 'users', label: 'User Management', icon: <Icons.Users /> },
        { id: 'timetable', label: 'Timetable', icon: <Icons.Calendar /> },
        { id: 'attendance', label: 'Attendance', icon: <Icons.Check /> },
        { id: 'academics', label: 'Academic Records', icon: <Icons.Book /> },
        { id: 'assignments', label: 'Assignments', icon: <Icons.FileText /> },
        { id: 'admissions', label: 'Admissions', icon: <Icons.UserPlus /> },
        { id: 'exams', label: 'Exams', icon: <Icons.Award /> },
        { id: 'fees', label: 'Fee Management', icon: <Icons.DollarSign /> },
        { id: 'library', label: 'Library', icon: <Icons.Library /> },
        { id: 'hr', label: 'HR & Payroll', icon: <Icons.Briefcase /> },
        { id: 'notifications', label: 'Notifications', icon: <Icons.Bell /> },
      ];
    } else if (currentUser.role === 'teacher') {
      return [
        ...baseItems,
        { id: 'timetable', label: 'My Timetable', icon: <Icons.Calendar /> },
        { id: 'attendance', label: 'Attendance', icon: <Icons.Check /> },
        { id: 'academics', label: 'Grade Entry', icon: <Icons.Book /> },
        { id: 'assignments', label: 'Assignments', icon: <Icons.FileText /> },
        { id: 'students', label: 'My Students', icon: <Icons.Users /> },
        { id: 'library', label: 'Library', icon: <Icons.Library /> },
        { id: 'notifications', label: 'Notifications', icon: <Icons.Bell /> },
      ];
    } else {
      return [
        ...baseItems,
        { id: 'academics', label: 'Academic Performance', icon: <Icons.Book /> },
        { id: 'attendance', label: 'Attendance', icon: <Icons.Check /> },
        { id: 'fees', label: 'Fee Payment', icon: <Icons.DollarSign /> },
        { id: 'notifications', label: 'Messages', icon: <Icons.Message /> },
      ];
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 99,
          }}
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">{mockSchool.logo}</div>
          <div className="sidebar-logo-text">
            {mockSchool.name}
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
            {getNavItems().map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveModule(item.id);
                  setIsOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">System</div>
            <div className="nav-item" onClick={onLogout}>
              <Icons.LogOut />
              Sign Out
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{currentUser.avatar}</div>
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
