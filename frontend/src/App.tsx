import React, { useState } from 'react';
import { ThemeProvider } from './lib/ThemeContext';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { StudioView } from './components/studio/StudioView';
import { BrandKitView } from './components/brandkit/BrandKitView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthModal } from './components/common/AuthModal';
import { ActiveView } from './types';
import { Sparkles, ArrowRight } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();

  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [inGuestStudio, setInGuestStudio] = useState(false);

  const openAuth = (mode: 'signin' | 'signup' = 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090E] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors">
      {/* 1. Guest Studio Preview Mode (Launched directly from Landing Page) */}
      {inGuestStudio && !user && (
        <div className="relative h-screen flex flex-col">
          <div className="bg-white dark:bg-[#0B0E17] border-b border-gray-200 dark:border-[#171D2E] px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">Interactive Studio Preview</span>
              <span className="text-gray-400">• Create freely in memory</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => openAuth('signup')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-95 transition-opacity"
              >
                Sign Up to Save
              </button>
              <button
                onClick={() => setInGuestStudio(false)}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Exit Studio &rarr;
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <StudioView onBackToDashboard={() => setInGuestStudio(false)} />
          </div>
        </div>
      )}

      {/* 2. Public Experience: Full 13-Section Kittl-Tier Landing Page */}
      {!user && !inGuestStudio && (
        <>
          <Navbar
            onOpenAuth={openAuth}
            onLaunchStudio={() => setInGuestStudio(true)}
            onGoToDashboard={() => openAuth('signin')}
          />
          <main className="flex-1">
            <LandingPage
              onLaunchStudio={() => setInGuestStudio(true)}
              onOpenAuth={openAuth}
            />
          </main>
        </>
      )}

      {/* 3. Authenticated SaaS Experience: Full Dashboard & Studio Suite */}
      {user && (
        <div className="flex h-screen overflow-hidden">
          {/* Collapsible Mini-Rail Sidebar */}
          <Sidebar
            activeView={activeView}
            onSelectView={(v) => setActiveView(v)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenCommand={() => setShowCommandPalette(true)}
          />

          {/* Main App Workspace */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeView === 'dashboard' && <DashboardView onSelectView={(v) => setActiveView(v)} />}
            {activeView === 'studio' && <StudioView />}
            {activeView === 'projects' && <DashboardView onSelectView={(v) => setActiveView(v)} />}
            {activeView === 'templates' && <StudioView />}
            {activeView === 'brandkit' && <BrandKitView />}
            {activeView === 'settings' && <SettingsView />}
          </div>
        </div>
      )}

      {/* Global Quick Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectView={(v) => setActiveView(v)}
      />

      {/* Real Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
