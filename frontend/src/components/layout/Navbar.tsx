import React from 'react';
import { Sun, Moon, ArrowRight, User as UserIcon, LogOut, LayoutDashboard, PenTool } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onLaunchStudio: () => void;
  onGoToDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAuth, 
  onLaunchStudio, 
  onGoToDashboard 
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signout } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#08090E]/85 border-b border-gray-200/80 dark:border-[#181F33] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo from Attached Sheet */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="md" />
        </div>

        {/* Consumer Design Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#studio-interactive" className="hover:text-gray-900 dark:hover:text-white transition-colors">Studio Playground</a>
          <a href="#templates" className="hover:text-gray-900 dark:hover:text-white transition-colors">Templates</a>
          <a href="#showcase" className="hover:text-gray-900 dark:hover:text-white transition-colors">Showcase</a>
          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
        </nav>

        {/* Right Controls: Theme Toggle & Auth Buttons */}
        <div className="flex items-center space-x-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-[#121624] border border-gray-200 dark:border-[#1E2538] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={onGoToDashboard}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-[#141A2B] border border-gray-200 dark:border-[#222B42] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#1B233A] transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-500" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={onLaunchStudio}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Open Studio</span>
              </button>

              <button
                onClick={signout}
                className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-[#141A2B] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
              >
                <span>Start Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
