import React, { useState } from 'react';
import { 
  Download, 
  Layers, 
  Type, 
  Palette, 
  Tag, 
  Code, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Check, 
  Copy, 
  Share2,
  Sparkles,
  Sliders
} from 'lucide-react';
import { Project } from '../../types';

interface StudioViewProps {
  onBackToDashboard?: () => void;
}

export const StudioView: React.FC<StudioViewProps> = () => {
  // Studio Canvas State
  const [projectName, setProjectName] = useState('AWS Multi-AZ Cloud Architecture');
  const [headline, setHeadline] = useState('DevSecOps Cloud Architecture');
  const [subtitle, setSubtitle] = useState('High-availability microservices with automated rolling rollback');
  const [badgeText, setBadgeText] = useState('AWS PRODUCTION');
  const [theme, setTheme] = useState<'cyber' | 'sunset' | 'obsidian' | 'emerald' | 'minimal'>('cyber');
  const [dimensions, setDimensions] = useState<{ width: number; height: number; label: string }>({
    width: 1200,
    height: 630,
    label: 'OpenGraph (1200x630)'
  });
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<'presets' | 'typography' | 'mesh' | 'badges' | 'api'>('mesh');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedTechBadges, setSelectedTechBadges] = useState<string[]>(['AWS', 'Docker', 'PostgreSQL']);

  const themes = {
    cyber: {
      bg: 'from-[#090a14] via-[#10172e] to-[#062442]',
      accent: '#00f2fe',
      glow: '#00f2fe',
      textColor: '#ffffff'
    },
    sunset: {
      bg: 'from-[#140b0d] via-[#2c0e1b] to-[#401815]',
      accent: '#ff7a18',
      glow: '#ff7a18',
      textColor: '#ffffff'
    },
    obsidian: {
      bg: 'from-[#090a0f] via-[#131520] to-[#1a1c2b]',
      accent: '#e5e7eb',
      glow: '#9ca3af',
      textColor: '#ffffff'
    },
    emerald: {
      bg: 'from-[#08120e] via-[#0f291e] to-[#063826]',
      accent: '#00e676',
      glow: '#00e676',
      textColor: '#ffffff'
    },
    minimal: {
      bg: 'from-[#101217] via-[#161822] to-[#1c202d]',
      accent: '#a5b4fc',
      glow: '#818cf8',
      textColor: '#ffffff'
    }
  };

  const presetSizes = [
    { width: 1200, height: 630, label: 'OpenGraph (1200x630)' },
    { width: 1280, height: 640, label: 'GitHub Header (1280x640)' },
    { width: 1500, height: 500, label: 'Twitter/X (1500x500)' },
    { width: 240, height: 240, label: 'Badge Card (240x240)' }
  ];

  const availableBadges = ['AWS', 'Docker', 'Kubernetes', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'DevSecOps', 'Linux'];

  const toggleBadge = (item: string) => {
    if (selectedTechBadges.includes(item)) {
      setSelectedTechBadges(selectedTechBadges.filter(b => b !== item));
    } else {
      setSelectedTechBadges([...selectedTechBadges, item]);
    }
  };

  // Generate lossless SVG master string for download or dynamic API
  const generateSvgMarkup = () => {
    const currentTheme = themes[theme];
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090a12"/>
      <stop offset="50%" stop-color="#12182d"/>
      <stop offset="100%" stop-color="#062947"/>
    </linearGradient>
    <radialGradient id="meshGlow" cx="0.8" cy="0.2" r="0.7">
      <stop offset="0%" stop-color="${currentTheme.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${currentTheme.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#ffffff" opacity="0.08"/>
    </pattern>
  </defs>
  
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#bgGrad)"/>
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#dotGrid)"/>
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#meshGlow)"/>
  <rect x="0" y="0" width="${dimensions.width}" height="3" fill="${currentTheme.accent}"/>

  <g transform="translate(80, 80)">
    <rect width="180" height="36" rx="18" fill="#141824" stroke="${currentTheme.accent}" stroke-width="1.5"/>
    <text x="35" y="23" font-family="monospace" font-size="13" font-weight="bold" fill="${currentTheme.accent}">${badgeText.toUpperCase()}</text>
  </g>

  <text x="80" y="220" font-family="sans-serif" font-size="52" font-weight="800" fill="#ffffff">
    ${headline}
  </text>
  <text x="80" y="280" font-family="sans-serif" font-size="24" font-weight="400" fill="#9ca3af">
    ${subtitle}
  </text>
</svg>`;
  };

  const handleDownloadSvg = () => {
    const markup = generateSvgMarkup();
    const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const dynamicApiUrl = `http://localhost:5000/api/v1/render/og?title=${encodeURIComponent(headline)}&subtitle=${encodeURIComponent(subtitle)}&theme=${theme}&badge=${encodeURIComponent(badgeText)}`;

  const copyApiSnippet = () => {
    navigator.clipboard.writeText(`<meta property="og:image" content="${dynamicApiUrl}" />`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0b12] text-gray-100 overflow-hidden select-none">
      {/* 1. TOP STUDIO BAR */}
      <header className="h-14 border-b border-[#1b1f2f] bg-[#0e101a] px-4 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-sm font-semibold text-white px-2 py-1 rounded hover:bg-[#181c2e] focus:bg-[#181c2e] focus:outline-none transition-colors max-w-xs"
          />
          <span className="text-gray-500 text-xs">/</span>
          {/* Preset Size Picker */}
          <select
            value={dimensions.label}
            onChange={(e) => {
              const selected = presetSizes.find(s => s.label === e.target.value);
              if (selected) setDimensions(selected);
            }}
            className="bg-[#151827] border border-[#23283c] text-xs text-gray-300 rounded-md px-2 py-1 focus:outline-none"
          >
            {presetSizes.map(s => (
              <option key={s.label} value={s.label}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Zoom & Viewport Controls */}
        <div className="hidden sm:flex items-center space-x-2">
          <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#191d30]">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-gray-400 w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#191d30]">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom(100)} className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-[#191d30]" title="Reset Zoom">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={copyApiSnippet}
            className="px-3 py-1.5 rounded-lg border border-[#252b42] text-xs font-medium text-gray-300 hover:text-white hover:bg-[#191c2e] flex items-center space-x-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            <span>{copiedCode ? 'Copied Meta Tag!' : 'Copy OG Link'}</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 text-xs font-semibold text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Vector SVG</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE (Tool Drawer + Center Canvas + Properties Inspector) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tool Drawer */}
        <aside className="w-72 bg-[#0e101a] border-r border-[#1b1f2f] flex flex-col z-10">
          {/* Tool Drawer Tab Switcher */}
          <div className="flex border-b border-[#1b1f2f] bg-[#0c0e16]">
            {[
              { id: 'mesh', label: 'Theme', icon: Palette },
              { id: 'typography', label: 'Text', icon: Type },
              { id: 'badges', label: 'Badges', icon: Tag },
              { id: 'api', label: 'API', icon: Code }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 text-xs font-medium flex flex-col items-center space-y-1 transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-400 border-b-2 border-orange-500 bg-[#141624]'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tool Tab Content */}
          <div className="p-4 space-y-5 flex-1 overflow-y-auto">
            {activeTab === 'mesh' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">Atmospheric Colorways</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(themes) as Array<keyof typeof themes>).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`p-3 rounded-xl border text-left text-xs capitalize transition-all ${
                        theme === t
                          ? 'border-orange-500 bg-[#1a1c2e] text-white font-bold'
                          : 'border-[#202538] bg-[#121420] text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full mb-2" style={{ backgroundColor: themes[t].accent }} />
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Headline Text</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-[#151724] border border-[#23273c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Subtitle</label>
                  <textarea
                    rows={3}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-[#151724] border border-[#23273c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Category Badge Pill</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-[#151724] border border-[#23273c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">Tech Stack Stamping</h4>
                <p className="text-[11px] text-gray-500">Toggle technology logos to stamp into the banner footer:</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableBadges.map(item => (
                    <button
                      key={item}
                      onClick={() => toggleBadge(item)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                        selectedTechBadges.includes(item)
                          ? 'bg-orange-500/20 border border-orange-500/40 text-orange-300 font-semibold'
                          : 'bg-[#151724] border border-[#23273a] text-gray-400 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider">Headless Dynamic Endpoint</h4>
                <p className="text-xs text-gray-400">
                  Embed this live URL directly inside your GitHub README, website meta tags, or blog cards:
                </p>
                <div className="bg-[#090a10] border border-[#1e2335] rounded-lg p-2.5 font-mono text-[11px] text-gray-300 break-all select-all">
                  {dynamicApiUrl}
                </div>
                <button
                  onClick={copyApiSnippet}
                  className="w-full py-2 rounded-lg bg-[#181c2d] hover:bg-[#20253c] text-xs font-medium text-white border border-[#252c44] flex items-center justify-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Copy Meta Tag</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Center Infinite Workbench */}
        <main className="flex-1 overflow-auto p-8 flex items-center justify-center canvas-dot-grid relative bg-[#090a0f]">
          {/* The Artwork Canvas with drop shadow */}
          <div
            style={{
              width: `${dimensions.width * 0.65}px`,
              height: `${dimensions.height * 0.65}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
            className={`rounded-xl bg-gradient-to-br ${themes[theme].bg} border border-[#22273c] p-8 relative shadow-2xl flex flex-col justify-between transition-all duration-300 overflow-hidden shrink-0`}
          >
            {/* Top Badge */}
            <div className="relative z-10">
              <span
                style={{ borderColor: themes[theme].accent, color: themes[theme].accent }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#0d0f1a]/80 border shadow-lg"
              >
                ● {badgeText.toUpperCase()}
              </span>
            </div>

            {/* Main Typography */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {headline}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg">
                {subtitle}
              </p>
            </div>

            {/* Bottom Meta & Stamped Badges */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                {selectedTechBadges.map(b => (
                  <span key={b} className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/50 border border-white/10 text-gray-300">
                    {b}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                SNAPBRAND ENGINE • 4K LOSSLESS
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
