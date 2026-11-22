import React, { useState } from 'react';
import { Palette, Check, Plus, Trash2, Sliders, Type } from 'lucide-react';
import { BrandKit } from '../../types';

export const BrandKitView: React.FC = () => {
  const [brandKit, setBrandKit] = useState<BrandKit>({
    companyName: 'SnapBrand Cloud',
    tagline: 'Edge Visual Studio & Dynamic OpenGraph Engine',
    palette: {
      primary: '#ff7a18',
      secondary: '#00f2fe',
      accent: '#00e676',
      surface: '#090a0f',
      panel: '#12131c'
    },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      codeFont: 'JetBrains Mono'
    },
    badges: ['AWS', 'Docker', 'React 19', 'TypeScript', 'DevSecOps', 'PostgreSQL', 'Redis']
  });

  const [saved, setSaved] = useState(false);

  const handleColorChange = (key: keyof typeof brandKit.palette, value: string) => {
    setBrandKit({
      ...brandKit,
      palette: { ...brandKit.palette, [key]: value }
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#090a0f] text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#1b1f2e] gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Palette className="w-7 h-7 text-orange-400" />
            <span>Brand Kit Engine</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Define corporate palettes, typography scales, and approved tech badges for uniform asset generation.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center space-x-2"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? 'Saved to Cloud!' : 'Save Brand Kit'}</span>
        </button>
      </div>

      {/* Color Palette Grid */}
      <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-6">
        <h3 className="text-base font-bold text-white">Color Palette Architecture</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {(Object.keys(brandKit.palette) as Array<keyof typeof brandKit.palette>).map((key) => (
            <div key={key} className="space-y-2">
              <div 
                className="h-20 rounded-xl border border-white/10 shadow-inner flex items-end p-2"
                style={{ backgroundColor: brandKit.palette[key] }}
              >
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
                  {brandKit.palette[key]}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold capitalize text-gray-300">{key}</p>
                <input
                  type="text"
                  value={brandKit.palette[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="mt-1 w-full bg-[#181b2a] border border-[#23283c] rounded px-2 py-1 text-xs font-mono text-gray-300 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Presets */}
      <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Type className="w-4 h-4 text-cyan-400" />
          <span>Approved Typography System</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
            <p className="text-xs text-gray-400">Headings Font</p>
            <p className="text-lg font-extrabold text-white mt-1">{brandKit.typography.headingFont}</p>
          </div>
          <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
            <p className="text-xs text-gray-400">Body Typography</p>
            <p className="text-lg font-medium text-white mt-1">{brandKit.typography.bodyFont}</p>
          </div>
          <div className="p-4 rounded-lg bg-[#0d0f17] border border-[#1b1f30]">
            <p className="text-xs text-gray-400">Code / Metrics Font</p>
            <p className="text-lg font-mono text-orange-400 mt-1">{brandKit.typography.codeFont}</p>
          </div>
        </div>
      </div>

      {/* Reusable Badges */}
      <div className="rounded-xl bg-[#11131e] border border-[#1f2438] p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Approved Tech Stack Badges</h3>
        <div className="flex flex-wrap gap-2">
          {brandKit.badges.map((b) => (
            <span key={b} className="px-3 py-1.5 rounded-lg bg-[#161825] border border-[#252b42] text-xs font-mono text-gray-300">
              ● {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
