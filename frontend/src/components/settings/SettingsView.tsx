import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  User, 
  HardDrive, 
  Check, 
  Copy, 
  Trash2, 
  ExternalLink,
  ShieldAlert,
  Server
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'security' | 'storage'>('security');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const auditLogs = [
    { id: '1', action: 'ECR_IMAGE_PULL', actor: 'ASG Instance az-east-1a (i-08a91bc7)', status: 'PASS', time: '2 mins ago', ip: '10.0.10.45' },
    { id: '2', action: 'SYNTHETIC_SMOKE_PASS', actor: 'GitHub Actions Stage 12 Runner', status: 'PASS', time: '6 mins ago', ip: '54.210.88.19' },
    { id: '3', action: 'SECRETS_OIDC_ASSUME', actor: 'arn:aws:iam::123456789:role/SnapBrandCI', status: 'PASS', time: '10 mins ago', ip: '140.82.115.7' },
    { id: '4', action: 'DYNAMIC_OG_RENDER', actor: 'Twitterbot Crawler (Cache Hit)', status: 'PASS', time: '15 mins ago', ip: '199.16.157.180' },
  ];

  const copyKey = () => {
    navigator.clipboard.writeText('sb_live_secops_hardened_872149021');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#090a0f] text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8">
      {/* Settings Header */}
      <div className="pb-6 border-b border-[#1b1f2e]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Platform &amp; DevSecOps Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your identity, developer API credentials, AWS IAM roles, and zero-trust audit trail.
        </p>

        {/* Tab Switcher */}
        <div className="flex space-x-6 mt-6 border-b border-[#181c2d]">
          {[
            { id: 'security', label: 'Security & Audit Logs', icon: Shield },
            { id: 'api', label: 'API Keys & Webhooks', icon: Key },
            { id: 'profile', label: 'Profile & Team', icon: User },
            { id: 'storage', label: 'Cloud Quota & Storage', icon: HardDrive },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-500 text-orange-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Security & Audit Trail */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>DevSecOps Zero-Trust Posture</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
                <p className="text-xs text-gray-400">Gitleaks Secrets Status</p>
                <p className="text-sm font-bold text-emerald-400 font-mono mt-1">✓ 0 SECRETS FOUND</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
                <p className="text-xs text-gray-400">Trivy &amp; Snyk CVEs</p>
                <p className="text-sm font-bold text-emerald-400 font-mono mt-1">✓ 0 HIGH / CRITICAL</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
                <p className="text-xs text-gray-400">AWS IAM Authentication</p>
                <p className="text-sm font-bold text-cyan-400 font-mono mt-1">EPHEMERAL OIDC</p>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Continuous Security Audit Trail</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1f2438] text-gray-500 font-mono">
                    <th className="py-2.5 px-3">ACTION</th>
                    <th className="py-2.5 px-3">PRINCIPAL / ACTOR</th>
                    <th className="py-2.5 px-3">SOURCE IP</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181c2b] text-gray-300 font-mono">
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-3 px-3 font-semibold text-orange-400">{log.action}</td>
                      <td className="py-3 px-3">{log.actor}</td>
                      <td className="py-3 px-3 text-gray-400">{log.ip}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{log.status}</td>
                      <td className="py-3 px-3 text-gray-500">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: API Keys */}
      {activeTab === 'api' && (
        <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Active Live Secret Keys</h3>
          <p className="text-xs text-gray-400">
            Use this token to authenticate programmatic dynamic rendering requests via cURL or Next.js.
          </p>
          <div className="flex items-center space-x-3 bg-[#0c0e16] p-3 rounded-lg border border-[#202538]">
            <span className="font-mono text-xs text-gray-300 flex-1 truncate">
              sb_live_secops_hardened_872149021
            </span>
            <button
              onClick={copyKey}
              className="px-3 py-1.5 rounded bg-[#181b2a] border border-[#23283c] text-xs text-gray-300 hover:text-white flex items-center space-x-1"
            >
              {apiKeyCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{apiKeyCopied ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Profile */}
      {activeTab === 'profile' && (
        <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4 max-w-xl">
          <h3 className="text-base font-bold text-white">Identity Details</h3>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Display Name</label>
            <input type="text" defaultValue="DevOps Lead Engineer" className="w-full bg-[#161825] border border-[#23283c] rounded px-3 py-2 text-xs text-white" />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Email Address</label>
            <input type="email" defaultValue="lead@snapbrand.cloud" className="w-full bg-[#161825] border border-[#23283c] rounded px-3 py-2 text-xs text-white" />
          </div>
        </div>
      )}

      {/* Tab 4: Cloud Quota & Storage */}
      {activeTab === 'storage' && (
        <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Cloud Storage Allocation</h3>
          <p className="text-xs text-gray-400">AWS S3 &amp; MinIO Object Storage quota</p>
          <div className="w-full bg-[#161825] rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-cyan-400 h-2.5 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <p className="text-xs font-mono text-gray-400">420 MB of 1,024 MB Used (42%)</p>
        </div>
      )}
    </div>
  );
};
