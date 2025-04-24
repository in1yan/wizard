import React from 'react';
import { Wand2, Menu, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="flex items-center justify-between py-4 px-4 border-b bg-gradient-to-r from-purple-900 to-indigo-900 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-3"
          aria-label="Toggle sidebar"
        >
          <Menu className="text-white" size={22} />
        </button>
        <Link to="/" className="flex items-center">
          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-2 rounded-xl shadow-lg shadow-purple-500/20 mr-3">
            <Wand2 className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">Wizard</h1>
            <p className="text-sm text-purple-200/70 dark:text-gray-300">Your Magical Document Assistant</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm hover:from-red-600 hover:to-red-700 transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default ChatHeader;