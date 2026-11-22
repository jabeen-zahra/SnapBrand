import React from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  FolderKanban, 
  Library, 
  Palette, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  LogOut,
  Command,
  ShieldCheck
} from 'lucide-react';
import { ActiveView, User } from '../../types';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: User;
  onLogout: () => void;
  onOpenCommand: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  user,
  onLogout,
  onOpenCommand
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'studio' as ActiveView, label: 'Studio Canvas', icon: PenTool, badge: 'LIVE' },
    { id: 'projects' as ActiveView, label: 'My Projects', icon: FolderKanban },
    { id: 'templates' as ActiveView, label: 'Blueprints', icon: Library },
    { id: 'brandkit' as ActiveView, label: 'Brand Kits', icon: Palette },
    { id: 'settings' as ActiveView, label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`relative z-30 flex flex-col h-screen bg-[#0d0e14] border-r border-[#1a1c29] transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Brand Mark */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#1a1c29]">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-cyan-500 p-[1.5px] shrink-0">
            <div className="w-full h-full bg-[#0d0e14] rounded-[6.5px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-orange-400" />
            </div>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-white tracking-tight truncate">
              Snap<span className="text-orange-500">Brand</span>
            </span>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1c29] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Command Palette Trigger */}
      <div className="p-3">
        <button
          onClick={onOpenCommand}
          className={`w-full flex items-center rounded-lg border border-[#232738] bg-[#12141f] text-gray-400 hover:text-white hover:border-[#383e58] px-3 py-2 text-xs transition-colors ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
          title="Command Palette (Ctrl + K)"
        >
          <div className="flex items-center space-x-2">
            <Command className="w-3.5 h-3.5 text-orange-400" />
            {!collapsed && <span>Quick Search</span>}
          </div>
          {!collapsed && (
            <kbd className="px-1.5 py-0.5 text-[10px] bg-[#1b1f2e] text-gray-400 rounded border border-[#2b3149]">
              Ctrl K
            </kbd>
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors ${
                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5 space-x-3'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500/15 to-transparent text-orange-400 border-l-2 border-orange-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#151724]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-400' : 'text-gray-400'}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-mono font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* DevSecOps Status Pill */}
      {!collapsed && (
        <div className="mx-3 my-2 p-2.5 rounded-lg bg-[#141624] border border-[#222638] flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <p className="font-semibold text-gray-200">DevSecOps Active</p>
            <p className="text-gray-400 text-[10px]">Zero CVEs | Multi-AZ</p>
          </div>
        </div>
      )}

      {/* User Dock & Logout */}
      <div className="p-3 border-t border-[#1a1c29]">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full object-cover border border-orange-500/40 shrink-0" 
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-200 truncate">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.plan}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={onLogout}
              className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
