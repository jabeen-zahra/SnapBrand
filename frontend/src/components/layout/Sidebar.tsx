import React from "react";
import {
  LayoutDashboard,
  PenTool,
  FolderKanban,
  Library,
  Palette,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import { ActiveView } from "../../types";
import { useAuth } from "../../lib/AuthContext";
import { useTheme } from "../../lib/ThemeContext";
import { BrandLogo } from "../common/BrandLogo";

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenCommand: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  onOpenCommand,
}) => {
  const { user, signout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: "dashboard" as ActiveView, label: "Overview", icon: LayoutDashboard },
    {
      id: "studio" as ActiveView,
      label: "Studio Canvas",
      icon: PenTool,
      badge: "PRO",
    },
    { id: "projects" as ActiveView, label: "My Projects", icon: FolderKanban },
    { id: "templates" as ActiveView, label: "Blueprints", icon: Library },
    { id: "brandkit" as ActiveView, label: "Brand Kits", icon: Palette },
    { id: "settings" as ActiveView, label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`relative z-30 flex flex-col h-screen bg-gray-50 dark:bg-[#0B0D15] border-r border-gray-200 dark:border-[#171D2E] transition-all duration-300 select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-[#171D2E]">
        <div className="flex items-center space-x-2 overflow-hidden">
          <BrandLogo size="sm" showDomain={!collapsed} />
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#151A2B] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Quick Search Trigger */}
      <div className="p-3">
        <button
          onClick={onOpenCommand}
          className={`w-full flex items-center rounded-xl border border-gray-200 dark:border-[#1F273D] bg-white dark:bg-[#111422] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-xs transition-colors ${
            collapsed ? "justify-center" : "justify-between"
          }`}
          title="Quick Search (Ctrl + K)"
        >
          <div className="flex items-center space-x-2">
            <Command className="w-3.5 h-3.5 text-cyan-500" />
            {!collapsed && <span>Search Studio</span>}
          </div>
          {!collapsed && (
            <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-[#1A2033] text-gray-500 rounded border border-gray-200 dark:border-[#27314C]">
              Ctrl K
            </kbd>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center rounded-xl text-xs font-semibold transition-colors ${
                collapsed
                  ? "justify-center px-0 py-2.5"
                  : "px-3.5 py-2.5 space-x-3"
              } ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/15 to-transparent text-cyan-600 dark:text-cyan-400 border-l-2 border-cyan-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#121626]"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? "text-cyan-500" : "text-gray-400"}`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Light / Dark Mode Toggle inside Sidebar */}
      {!collapsed && (
        <div className="px-3 py-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-[#111422] border border-gray-200 dark:border-[#1F273D] text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span>{theme === "dark" ? "Dark Theme" : "Light Theme"}</span>
            </div>
            <span className="text-[10px] text-gray-400 capitalize">
              {theme}
            </span>
          </button>
        </div>
      )}

      {/* User Footer Dock */}
      <div className="p-3 border-t border-gray-200 dark:border-[#171D2E]">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              }
              alt={user?.fullName || "User"}
              className="w-8 h-8 rounded-full object-cover border border-cyan-500/40 shrink-0"
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-200 truncate">
                  {user?.fullName || "Creator"}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {user?.plan || "Pro Creator"}
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={signout}
              className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
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
