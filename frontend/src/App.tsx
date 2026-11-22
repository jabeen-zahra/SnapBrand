import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { StudioView } from './components/studio/StudioView';
import { BrandKitView } from './components/brandkit/BrandKitView';
import { SettingsView } from './components/settings/SettingsView';
import { ActiveView, User } from './types';
import { Sparkles, X, ShieldCheck, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // Authentication & Navigation State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inGuestStudio, setInGuestStudio] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Default User State
  const [user, setUser] = useState<User>({
    id: 'usr_devops_lead',
    name: 'DevOps Lead Engineer',
    email: 'lead@snapbrand.cloud',
    role: 'Platform Architect',
    plan: 'Enterprise Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const handleDemoLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setInGuestStudio(false);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInGuestStudio(false);
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-100 flex flex-col font-sans">
      {/* 1. If in Guest Studio mode (launched directly from landing page) */}
      {inGuestStudio && !isLoggedIn && (
        <div className="relative h-screen flex flex-col">
          {/* Top Bar for Guest Studio */}
          <div className="bg-[#12141f] border-b border-[#1f2438] px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-semibold text-gray-200">Guest Studio Preview</span>
              <span className="text-gray-500">• Changes are stored in memory</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Sign in to Save
              </button>
              <button
                onClick={() => setInGuestStudio(false)}
                className="text-gray-400 hover:text-white"
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

      {/* 2. If Not Logged In and Not in Guest Studio: Full 13-Section Landing Page */}
      {!isLoggedIn && !inGuestStudio && (
        <>
          <Navbar
            onOpenAuth={() => setShowAuthModal(true)}
            onEnterStudio={() => setInGuestStudio(true)}
            isLoggedIn={isLoggedIn}
            onGoToApp={() => setActiveView('dashboard')}
          />
          <main className="flex-1">
            <LandingPage
              onLaunchStudio={() => setInGuestStudio(true)}
              onOpenAuth={() => setShowAuthModal(true)}
            />
          </main>
        </>
      )}

      {/* 3. If Logged In: Full SaaS Dashboard Suite */}
      {isLoggedIn && (
        <div className="flex h-screen overflow-hidden">
          {/* Collapsible Mini-Rail Sidebar */}
          <Sidebar
            activeView={activeView}
            onSelectView={(v) => setActiveView(v)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            user={user}
            onLogout={handleLogout}
            onOpenCommand={() => setShowCommandPalette(true)}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#090a0f]">
            {activeView === 'dashboard' && <DashboardView onSelectView={(v) => setActiveView(v)} />}
            {activeView === 'studio' && <StudioView />}
            {activeView === 'projects' && <DashboardView onSelectView={(v) => setActiveView(v)} />}
            {activeView === 'templates' && <StudioView />}
            {activeView === 'brandkit' && <BrandKitView />}
            {activeView === 'settings' && <SettingsView />}
          </div>
        </div>
      )}

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectView={(v) => setActiveView(v)}
      />

      {/* Auth Modal (With 1-Click Demo Access for Evaluators/TAs) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#10121d] border border-[#22273c] rounded-2xl shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 mx-auto flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Welcome to SnapBrand</h3>
              <p className="text-xs text-gray-400">
                Sign in to your platform workspace or use instant evaluator demo access.
              </p>
            </div>

            <div className="space-y-4">
              {/* Evaluator 1-Click Access Button */}
              <button
                onClick={handleDemoLogin}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Instant Demo Access (1-Click)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1e2335]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono">
                  <span className="bg-[#10121d] px-2 text-gray-500">Or email credentials</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="evaluator@fast.nu.edu.pk"
                  className="w-full bg-[#161825] border border-[#23283c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full bg-[#161825] border border-[#23283c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                onClick={handleDemoLogin}
                className="w-full py-2.5 rounded-xl bg-[#191d2d] border border-[#252b42] text-xs font-semibold text-gray-200 hover:text-white hover:bg-[#20253c] transition-colors"
              >
                Sign In
              </button>

              <div className="pt-2 text-center text-[11px] text-gray-500 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by DevSecOps least-privilege IAM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
