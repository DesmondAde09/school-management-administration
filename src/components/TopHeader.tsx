import React from 'react';
import { User } from '../types';
import { useApp } from '../context/AppContext';
import { Icons } from './Icons';

interface TopHeaderProps {
  title: string;
  currentUser: User;
  toggleSidebar: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ title, currentUser, toggleSidebar }) => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Icons.Menu />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Icons.Search />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="header-icon-btn">
          <Icons.Bell />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        <div className="header-avatar">{currentUser.avatar}</div>
      </div>
    </header>
  );
};

export default TopHeader;
