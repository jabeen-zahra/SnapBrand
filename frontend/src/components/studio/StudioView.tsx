import React, { useState } from 'react';
import { 
  Download, 
  Type, 
  Palette, 
  Tag, 
  Code, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Check, 
  Copy, 
  Save,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { BrandLogo } from '../common/BrandLogo';

interface StudioViewProps {
  onBackToDashboard?: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onBackToDashboard }) => {
  const { user, token } = useAuth();

  const [projectName, setProjectName] = useState('Cyberpunk Neon Noir');
  const [headline, setHeadline] = useState('CYBERPUNK NEON NOIR');
  const [subtitle, setSubtitle] = useState('Vector typography, curved paths, and generative mesh gradients');
  const [badgeText, setBadgeText] = useState('STUDIO MASTER');
  const [theme, setTheme] = useState<'cyber' | 'sunset' | 'obsidian' | 'emerald' | 'minimal'>('cyber');
  const [dimensions, setDimensions] = useState<{ width: number; height: number; label: string }>({
    width: 1200,
    height: 630,
    label: 'OpenGraph (1200x630)'
  });
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<'mesh' | 'typography' | 'badges' | 'api'>('mesh');
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedCreativeTags, setSelectedCreativeTags] = useState<string[]>(['VECTOR 4K', 'RETRO 80S', 'NEON SHADER']);

  const themes = {
    cyber: {
      bg: 'from-[#0A0E1A] via-[#0E1528] to-[#08203D]',
      accent: '#00F2FE',
      glow: '#00F2FE',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
    },
    sunset: {
      bg: 'from-[#170C0F] via-[#2A111E] to-[#401815]',
      accent: '#FF7A18',
      glow: '#FF7A18',
      badgeBg: 'bg-orange-500/10 border-orange-500/30 text-orange-400'
    },
    obsidian: {
      bg: 'from-[#090A0F] via-[#131520] to-[#1A1C2B]',
      accent: '#E5E7EB',
      glow: '#9CA3AF',
      badgeBg: 'bg-white/10 border-white/20 text-gray-200'
    },
    emerald: {
      bg: 'from-[#08120E] via-[#0F291E] to-[#063826]',
      accent: '#00E676',
      glow: '#00E676',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    },
    minimal: {
      bg: 'from-[#101217] via-[#161822] to-[#1C202D]',
      accent: '#A5B4FC',
      glow: '#818CF8',
      badgeBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
    }
  };

  const presetSizes = [
    { width: 1200, height: 630, label: 'OpenGraph Card (1200x630)' },
    { width: 1280, height: 640, label: 'GitHub Header (1280x640)' },
    { width: 1500, height: 500, label: 'Twitter/X Cover (1500x500)' },
    { width: 1080, height: 1080, label: 'Square Post (1080x1080)' }
  ];

  const creativeTags = [
    'VECTOR 4K', 'RETRO 80S', 'NEON SHADER', 'EDITORIAL', 'SWISS TYPE', 'BAUHAUS', 'MINIMALIST', 'VINTAGE BADGE'
  ];

  const toggleTag = (tag: string) => {
    if (selectedCreativeTags.includes(tag)) {
      setSelectedCreativeTags(selectedCreativeTags.filter(t => t !== tag));
    } else {
      setSelectedCreativeTags([...selectedCreativeTags, tag]);
    }
  };

  const generateSvgMarkup = () => {
    const currentTheme = themes[theme];
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0E1A"/>
      <stop offset="50%" stop-color="#0E1528"/>
      <stop offset="100%" stop-color="#08203D"/>
    </linearGradient>
    <radialGradient id="meshGlow" cx="0.8" cy="0.2" r="0.7">
      <stop offset="0%" stop-color="${currentTheme.accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${currentTheme.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#bgGrad)"/>
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

  const handleSaveToCloud = async () => {
    if (!token) {
      alert('Please sign in to save your artwork to the cloud library.');
      return;
    }

    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: projectName,
          width: dimensions.width,
          height: dimensions.height,
          theme,
          headline,
          subtitle,
          badgeText
        })
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  };

  const dynamicApiUrl = `http://localhost:5000/api/v1/render/og?title=${encodeURIComponent(headline)}&subtitle=${encodeURIComponent(subtitle)}&theme=${theme}&badge=${encodeURIComponent(badgeText)}`;

  const copyApiSnippet = () => {
    navigator.clipboard.writeText(`<meta property="og:image" content="${dynamicApiUrl}" />`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#07080C] text-gray-900 dark:text-gray-100 overflow-hidden select-none transition-colors">
      {/* 1. TOP STUDIO BAR */}
      <header className="h-14 border-b border-gray-200 dark:border-[#171D2E] bg-white dark:bg-[#0B0E17] px-4 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#141826] transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <BrandLogo size="sm" showDomain={false} />

          <span className="text-gray-300 dark:text-gray-700">|</span>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-semibold text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#161C2C] focus:bg-gray-100 dark:focus:bg-[#161C2C] focus:outline-none transition-colors max-w-xs"
          />

          {/* Preset Size Picker */}
          <select
            value={dimensions.label}
            onChange={(e) => {
              const selected = presetSizes.find(s => s.label === e.target.value);
              if (selected) setDimensions(selected);
            }}
            className="bg-gray-100 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] text-xs text-gray-700 dark:text-gray-300 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {presetSizes.map(s => (
              <option key={s.label} value={s.label}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Center Viewport Zoom */}
        <div className="hidden sm:flex items-center space-x-2">
          <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-gray-500 w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom(100)} className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white" title="Reset Zoom">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveToCloud}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#222A40] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#161C2C] flex items-center space-x-1.5 transition-colors"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? 'Saved!' : 'Save'}</span>
          </button>

          <button
            onClick={copyApiSnippet}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#222A40] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#161C2C] flex items-center space-x-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Embed Link'}</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export 4K SVG</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tool Drawer */}
        <aside className="w-72 bg-white dark:bg-[#0B0E17] border-r border-gray-200 dark:border-[#171D2E] flex flex-col z-10">
          <div className="flex border-b border-gray-200 dark:border-[#171D2E] bg-gray-50/50 dark:bg-[#080A10]">
            {[
              { id: 'mesh', label: 'Colorway', icon: Palette },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'badges', label: 'Tags', icon: Tag },
              { id: 'api', label: 'Dynamic API', icon: Code }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 text-xs font-semibold flex flex-col items-center space-y-1 transition-colors ${
                    activeTab === tab.id
                      ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 bg-white dark:bg-[#121624]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 space-y-5 flex-1 overflow-y-auto">
            {activeTab === 'mesh' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-gray-500 font-bold tracking-wider">Atmospheric Colorways</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(themes) as Array<keyof typeof themes>).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`p-3 rounded-xl border text-left text-xs capitalize transition-all ${
                        theme === t
                          ? 'border-cyan-500 bg-cyan-50/50 dark:bg-[#161C2C] text-gray-900 dark:text-white font-bold ring-1 ring-cyan-500/50'
                          : 'border-gray-200 dark:border-[#1F273D] bg-white dark:bg-[#0E121E] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Headline Text</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tagline</label>
                  <textarea
                    rows={3}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Badge Pill Text</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-gray-500 font-bold tracking-wider">Creative Style Stamping</h4>
                <p className="text-[11px] text-gray-500">Toggle design tags to stamp onto the bottom of the card:</p>
                <div className="flex flex-wrap gap-1.5">
                  {creativeTags.map(item => (
                    <button
                      key={item}
                      onClick={() => toggleTag(item)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedCreativeTags.includes(item)
                          ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 font-bold'
                          : 'bg-gray-100 dark:bg-[#141826] border border-gray-200 dark:border-[#20273D] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
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
                <h4 className="text-xs font-mono uppercase text-gray-500 font-bold tracking-wider">Dynamic OpenGraph URL</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Embed this live URL in your website metadata or social share cards for real-time rendering:
                </p>
                <div className="bg-gray-100 dark:bg-[#08090E] border border-gray-200 dark:border-[#1E2538] rounded-xl p-3 font-mono text-[11px] text-gray-700 dark:text-gray-300 break-all select-all">
                  {dynamicApiUrl}
                </div>
                <button
                  onClick={copyApiSnippet}
                  className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-[#161C2C] border border-gray-200 dark:border-[#222A40] text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#1E2538] flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy HTML Meta Tag</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Center Workbench with Dotted Mesh */}
        <main className="flex-1 overflow-auto p-8 flex items-center justify-center canvas-dot-grid relative bg-gray-100 dark:bg-[#07080D]">
          <div
            style={{
              width: `${dimensions.width * 0.65}px`,
              height: `${dimensions.height * 0.65}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
            className={`rounded-2xl bg-gradient-to-br ${themes[theme].bg} border border-gray-200 dark:border-[#222A40] p-8 sm:p-12 relative shadow-2xl flex flex-col justify-between transition-all duration-300 overflow-hidden shrink-0`}
          >
            {/* Top Badge */}
            <div className="relative z-10">
              <span
                style={{ borderColor: themes[theme].accent, color: themes[theme].accent }}
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-black/60 border shadow-lg backdrop-blur-md"
              >
                ● {badgeText.toUpperCase()}
              </span>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                {headline}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg font-normal">
                {subtitle}
              </p>
            </div>

            {/* Bottom Meta & Stamped Tags */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                {selectedCreativeTags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/50 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-gray-400">
                SNAPBRAND STUDIO • 4K LOSSLESS
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
