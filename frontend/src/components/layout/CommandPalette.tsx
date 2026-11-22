import React, { useState, useEffect } from "react";
import {
  Search,
  PenTool,
  FolderKanban,
  Library,
  Palette,
  Settings,
  LayoutDashboard,
  X,
} from "lucide-react";
import { ActiveView } from "../../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: ActiveView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectView,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      title: "Open Studio Canvas",
      view: "studio" as ActiveView,
      icon: PenTool,
      category: "Creation",
    },
    {
      title: "Browse Blueprints & Templates",
      view: "templates" as ActiveView,
      icon: Library,
      category: "Library",
    },
    {
      title: "Manage Projects",
      view: "projects" as ActiveView,
      icon: FolderKanban,
      category: "Workspaces",
    },
    {
      title: "Edit Brand Kit Palettes",
      view: "brandkit" as ActiveView,
      icon: Palette,
      category: "Design System",
    },
    {
      title: "Platform & Security Settings",
      view: "settings" as ActiveView,
      icon: Settings,
      category: "Settings",
    },
    {
      title: "Return to Dashboard",
      view: "dashboard" as ActiveView,
      icon: LayoutDashboard,
      category: "General",
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#10121d] border border-[#23273c] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#1e2235]">
          <Search className="w-4 h-4 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or navigate anywhere..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No actions matching "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    onSelectView(item.view);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-[#191c2b] hover:text-white transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
