import React from 'react';
import { Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onEnterStudio: () => void;
  isLoggedIn: boolean;
  onGoToApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onEnterStudio, isLoggedIn, onGoToApp }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0f]/80 border-b border-[#1b1f2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 via-pink-600 to-cyan-500 p-[1.5px] flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0e14] rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-orange-400" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Snap<span className="text-orange-500">Brand</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            v2.4 PROD
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#bento" className="hover:text-white transition-colors">Engine</a>
          <a href="#marquee" className="hover:text-white transition-colors">Blueprints</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <button
              onClick={onGoToApp}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onEnterStudio}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-rose-500 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
              >
                <span>Launch Studio Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
