import React from 'react';
import { Sun, Moon, ArrowRight, LogOut, LayoutDashboard, PenTool } from 'lucide-react';
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF9F6]/90 dark:bg-[#0F1014]/90 border-b border-gray-200/80 dark:border-[#1E212A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo (Snap Cube) */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="md" />
        </div>

        {/* Consumer Design Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-gray-600 dark:text-gray-300">
          <a href="#features" className="hover:text-gray-950 dark:hover:text-white transition-colors">Capabilities</a>
          <a href="#templates" className="hover:text-gray-950 dark:hover:text-white transition-colors">Blueprints</a>
          <a href="#pricing" className="hover:text-gray-950 dark:hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-gray-950 dark:hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-[#161820] border border-gray-200 dark:border-[#222530] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-2.5">
              <button
                onClick={onGoToDashboard}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-[#161820] border border-gray-200 dark:border-[#222530] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#1E212A] transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-sky-500" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={onLaunchStudio}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-xs shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Open Studio</span>
              </button>

              <button
                onClick={signout}
                className="p-2 rounded-xl text-gray-400 hover:text-rose-500 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-xs shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
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
