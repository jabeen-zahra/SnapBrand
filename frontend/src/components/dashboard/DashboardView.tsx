import React from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Download, 
  Layers, 
  Cpu, 
  CheckCircle2,
  FolderKanban
} from 'lucide-react';
import { ActiveView } from '../../types';

interface DashboardViewProps {
  onSelectView: (view: ActiveView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectView }) => {
  const stats = [
    { label: 'Active Brand Assets', value: '18', change: '+4 this week', icon: Layers, color: 'text-orange-400' },
    { label: 'Dynamic API Calls', value: '4,289', change: '99.98% cache hit', icon: Cpu, color: 'text-cyan-400' },
    { label: 'Avg Render Latency', value: '14.2ms', change: '-3.1ms faster', icon: Sparkles, color: 'text-emerald-400' },
    { label: 'DevSecOps Vulnerabilities', value: '0', change: 'Zero CVE policy', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  const recentProjects = [
    {
      id: 'p1',
      title: 'DevOps Multi-AZ Master Architecture',
      theme: 'cyber',
      dimensions: '1280x640',
      badge: 'AWS CLOUD',
      updated: '10 mins ago'
    },
    {
      id: 'p2',
      title: 'SnapBrand v2.4 Release Banner',
      theme: 'sunset',
      dimensions: '1200x630',
      badge: 'PROD RELEASE',
      updated: '2 hours ago'
    },
    {
      id: 'p3',
      title: 'Kubernetes Cluster Status Board',
      theme: 'emerald',
      dimensions: '1500x500',
      badge: 'MONITORING',
      updated: 'Yesterday'
    }
  ];

  return (
    <div className="flex-1 bg-[#090a0f] text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#1b1f2e] gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Platform Overview
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time telemetry, visual asset performance, and AWS Multi-AZ health status.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectView('studio')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Asset</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-xl bg-[#11131e] border border-[#1e2335] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white font-mono">{stat.value}</span>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cloud Infrastructure & DevSecOps Health Ribbon */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/20 via-[#101322] to-cyan-950/20 border border-emerald-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">DevSecOps &amp; Multi-AZ Cluster Operational</h3>
            <p className="text-xs text-gray-400">All 12 CI/CD stages passing • Gitleaks Clean • Trivy 0 CVEs • ASG Target Tracking Active</p>
          </div>
        </div>
        <button 
          onClick={() => onSelectView('settings')}
          className="px-3 py-1.5 rounded-lg bg-[#181b2a] border border-[#23283c] text-xs font-medium text-emerald-400 hover:text-white transition-colors"
        >
          View Audit Logs &rarr;
        </button>
      </div>

      {/* Recent Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-orange-400" />
            <span>Recent Brand Assets</span>
          </h2>
          <button 
            onClick={() => onSelectView('studio')}
            className="text-xs text-orange-400 hover:text-orange-300 font-medium"
          >
            Open in Studio &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectView('studio')}
              className="rounded-xl bg-[#11131e] border border-[#1f2438] p-5 hover:border-orange-500/40 transition-all cursor-pointer group flex flex-col justify-between h-48"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181b2a] text-orange-400 border border-orange-500/20 font-bold">
                  {project.badge}
                </span>
                <span className="text-[10px] font-mono text-gray-500">{project.dimensions}</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {project.title}
                </h4>
                <div className="flex items-center space-x-1.5 text-xs text-gray-500 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.updated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
