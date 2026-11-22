import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Clock,
  Plus,
  Layers,
  Eye,
  FolderKanban,
  ExternalLink,
  Download,
  Trash2,
} from "lucide-react";
import { ActiveView } from "../../types";
import { useAuth } from "../../lib/AuthContext";

interface DashboardViewProps {
  onSelectView: (view: ActiveView) => void;
}

interface UserProject {
  id: string;
  name: string;
  width: number;
  height: number;
  theme: string;
  headline: string;
  subtitle: string;
  badgeText: string;
  updatedAt: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectView,
}) => {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/v1/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const stats = [
    {
      label: "Saved Artworks",
      value: projects.length.toString(),
      change: "Across all workspaces",
      icon: Layers,
      color: "text-cyan-500",
    },
    {
      label: "Dynamic Card Views",
      value: "12,480",
      change: "+18% this month",
      icon: Eye,
      color: "text-orange-500",
    },
    {
      label: "Active Brand Kits",
      value: "2",
      change: "Standardized palettes",
      icon: Sparkles,
      color: "text-emerald-500",
    },
    {
      label: "Export Resolution",
      value: "4K",
      change: "Lossless Vector",
      icon: Download,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-[#08090E] text-gray-900 dark:text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8 transition-colors">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200 dark:border-[#181F33] gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || "Creator"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your brand graphics, vector typography, and dynamic OpenGraph
            assets.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectView("studio")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Graphic</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-5 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between text-gray-500 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <span className="text-3xl font-extrabold font-mono text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-cyan-500" />
            <span>Your Saved Brand Artworks</span>
          </h2>
          <button
            onClick={() => onSelectView("studio")}
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            Open Studio &rarr;
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400 font-mono">
            Loading artwork library...
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 dark:border-[#1E2538] p-12 text-center space-y-3">
            <p className="text-sm text-gray-500">
              No brand graphics created yet.
            </p>
            <button
              onClick={() => onSelectView("studio")}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-600 transition-colors"
            >
              Start First Artwork
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectView("studio")}
                className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-5 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between h-52 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20">
                    {proj.badgeText}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {proj.width}x{proj.height}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {proj.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-[#181F33] text-[11px] text-gray-400 font-mono">
                  <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                  <span className="text-cyan-500 font-medium">Edit &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
