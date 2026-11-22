import React, { useState } from 'react';
import { Palette, Check, Type, Sparkles } from 'lucide-react';
import { BrandKit } from '../../types';

export const BrandKitView: React.FC = () => {
  const [brandKit, setBrandKit] = useState<BrandKit>({
    companyName: 'SnapBrand Studio',
    tagline: 'Precision Graphics for Modern Creators',
    palette: {
      primary: '#00F2FE',
      secondary: '#3B82F6',
      accent: '#FF7A18',
      surface: '#08090E',
      panel: '#0E121E'
    },
    typography: {
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      codeFont: 'JetBrains Mono'
    },
    badges: ['Vector Master', '4K Retina', 'Curved Type', 'Mesh Shader']
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
    <div className="flex-1 bg-white dark:bg-[#08090E] text-gray-900 dark:text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200 dark:border-[#181F33] gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-3">
            <Palette className="w-7 h-7 text-cyan-500" />
            <span>Brand Kit Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Define corporate palettes, typography scales, and approved tags to auto-apply across your artwork.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center space-x-2"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? 'Saved to Cloud!' : 'Save Brand Kit'}</span>
        </button>
      </div>

      {/* Color Palette Grid */}
      <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-6">
        <h3 className="text-sm font-bold">Standardized Hex Palette</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {(Object.keys(brandKit.palette) as Array<keyof typeof brandKit.palette>).map((key) => (
            <div key={key} className="space-y-2">
              <div 
                className="h-20 rounded-xl border border-black/10 dark:border-white/10 shadow-inner flex items-end p-2"
                style={{ backgroundColor: brandKit.palette[key] }}
              >
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white font-bold">
                  {brandKit.palette[key]}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold capitalize text-gray-700 dark:text-gray-300">{key}</p>
                <input
                  type="text"
                  value={brandKit.palette[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="mt-1 w-full bg-white dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-lg px-2 py-1 text-xs font-mono text-gray-900 dark:text-gray-200 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Presets */}
      <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
        <h3 className="text-sm font-bold flex items-center space-x-2">
          <Type className="w-4 h-4 text-cyan-500" />
          <span>Approved Typography System</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D15] border border-gray-200 dark:border-[#1A2238]">
            <p className="text-xs text-gray-500">Headings Font</p>
            <p className="text-lg font-black mt-1 text-gray-900 dark:text-white">{brandKit.typography.headingFont}</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D15] border border-gray-200 dark:border-[#1A2238]">
            <p className="text-xs text-gray-500">Body Typography</p>
            <p className="text-lg font-medium mt-1 text-gray-900 dark:text-white">{brandKit.typography.bodyFont}</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D15] border border-gray-200 dark:border-[#1A2238]">
            <p className="text-xs text-gray-500">Monospace Readouts</p>
            <p className="text-lg font-mono text-cyan-500 mt-1">{brandKit.typography.codeFont}</p>
          </div>
        </div>
      </div>

      {/* Reusable Badges */}
      <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
        <h3 className="text-sm font-bold">Approved Brand Badges &amp; Tags</h3>
        <div className="flex flex-wrap gap-2">
          {brandKit.badges.map((b) => (
            <span key={b} className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] text-xs font-mono font-medium text-gray-700 dark:text-gray-300">
              ● {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
