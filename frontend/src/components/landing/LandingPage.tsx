import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Type, 
  Palette, 
  Download, 
  Check, 
  ChevronDown, 
  Layers, 
  Shapes,
  Maximize2,
  Box,
  Eye,
  Sliders,
  Globe,
  Compass,
  Shirt,
  Tag,
  Monitor
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface LandingPageProps {
  onLaunchStudio: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchStudio, onOpenAuth }) => {
  // 1. Hero 3D Interactive Workbench State
  const [headline, setHeadline] = useState('HERITAGE CRAFT');
  const [subheading, setSubheading] = useState('Est. 2026 • Original Vector Design');
  const [curveMode, setCurveMode] = useState<'straight' | 'arch' | 'wave' | 'badge'>('arch');
  const [paletteMood, setPaletteMood] = useState<'graphite' | 'terracotta' | 'forest' | 'cream'>('graphite');
  const [selectedTexture, setSelectedTexture] = useState<'smooth' | 'grain' | 'halftone'>('grain');
  const [mockupView, setMockupView] = useState<'canvas' | 'apparel' | 'label' | 'social'>('canvas');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [annualBilling, setAnnualBilling] = useState(true);

  // Matte, tactile designer palettes
  const colorMoods = {
    graphite: {
      canvas: 'bg-[#18191E] text-white',
      border: 'border-[#2C2E38]',
      accent: '#38BDF8',
      tagBg: 'bg-white/10 text-gray-200',
      badgeBorder: 'border-white/20'
    },
    terracotta: {
      canvas: 'bg-[#2A1810] text-[#FED7AA]',
      border: 'border-[#4A2D1F]',
      accent: '#FB923C',
      tagBg: 'bg-amber-500/20 text-amber-200',
      badgeBorder: 'border-amber-500/30'
    },
    forest: {
      canvas: 'bg-[#101F18] text-[#BBF7D0]',
      border: 'border-[#1E3B2E]',
      accent: '#34D399',
      tagBg: 'bg-emerald-500/20 text-emerald-200',
      badgeBorder: 'border-emerald-500/30'
    },
    cream: {
      canvas: 'bg-[#F4EFE6] text-[#2D2823]',
      border: 'border-[#DCD3C4]',
      accent: '#C2410C',
      tagBg: 'bg-black/10 text-gray-800',
      badgeBorder: 'border-black/15'
    }
  };

  const currentMood = colorMoods[paletteMood];

  // Marquee Blueprints List (Duplicated for seamless continuous loop)
  const templateBlueprints = [
    { title: 'Motorcycle Heritage Crest', tag: 'VINTAGE BADGE', dims: '1200 × 1200', bg: 'bg-[#1C1824]' },
    { title: 'Cyberpunk Editorial Poster', tag: 'NEON TYPE', dims: '1440 × 2560', bg: 'bg-[#0E1726]' },
    { title: 'Artisan Coffee Roasters Seal', tag: 'PACKAGING', dims: '1000 × 1000', bg: 'bg-[#281810]' },
    { title: 'Botanical Cosmetics Label', tag: 'ORGANIC', dims: '1200 × 800', bg: 'bg-[#12231A]' },
    { title: 'Modern Swiss Typography Card', tag: 'EDITORIAL', dims: '1920 × 1080', bg: 'bg-[#1E1F26]' },
    { title: 'YouTube Tech Channel Cover', tag: 'HEADER ART', dims: '2560 × 1440', bg: 'bg-[#151D2A]' },
    // Duplicate set for smooth 100% loop
    { title: 'Motorcycle Heritage Crest', tag: 'VINTAGE BADGE', dims: '1200 × 1200', bg: 'bg-[#1C1824]' },
    { title: 'Cyberpunk Editorial Poster', tag: 'NEON TYPE', dims: '1440 × 2560', bg: 'bg-[#0E1726]' },
    { title: 'Artisan Coffee Roasters Seal', tag: 'PACKAGING', dims: '1000 × 1000', bg: 'bg-[#281810]' },
    { title: 'Botanical Cosmetics Label', tag: 'ORGANIC', dims: '1200 × 800', bg: 'bg-[#12231A]' },
    { title: 'Modern Swiss Typography Card', tag: 'EDITORIAL', dims: '1920 × 1080', bg: 'bg-[#1E1F26]' },
    { title: 'YouTube Tech Channel Cover', tag: 'HEADER ART', dims: '2560 × 1440', bg: 'bg-[#151D2A]' }
  ];

  const faqs = [
    {
      q: 'What makes SnapBrand different from standard design tools?',
      a: 'SnapBrand is built for vector typography, curved lettering, and vintage-to-modern badge crafting without the complexity of traditional desktop software. Everything operates on pure mathematical vector paths directly in your browser.'
    },
    {
      q: 'Can I export clean vector files for commercial print and merchandise?',
      a: 'Yes. Every artwork maintains pure mathematical SVG paths, so you can export infinitely scalable vectors for embroidery, screen printing, merchandise apparel, or high-res digital cards.'
    },
    {
      q: 'How does the dynamic OpenGraph preview engine work?',
      a: 'SnapBrand features a high-performance headless rendering API. You can embed live dynamic image URLs in your website meta tags, social share cards, or GitHub repositories.'
    },
    {
      q: 'Are my brand palettes and project files securely saved?',
      a: 'Yes, your Brand Kits and saved artworks are stored securely in your personal account library with instant cloud persistence across devices.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F1014] text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.12]">
            Design without limits. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-600 dark:from-sky-400 dark:via-indigo-400 dark:to-orange-400">
              Made for visual craft.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Create complex curved lettering, vintage brand badges, editorial typography, and high-resolution assets in an intuitive studio designed for creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onLaunchStudio}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Start Designing Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-gray-300 dark:border-[#272A35] bg-white dark:bg-[#15171E] text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-50 dark:hover:bg-[#1B1E26] transition-all"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* 2. LIVE 3D INTERACTIVE WORKBENCH (Kittl / Gamma Experience) */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-4 sm:p-6 shadow-xl perspective-1000">
          {/* Top Workbench Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#1E212A] gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Typography Studio</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">Live 3D Perspective</span>
            </div>

            {/* Palette Mood Chips */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 mr-1">Palette:</span>
              {(['graphite', 'terracotta', 'forest', 'cream'] as const).map((mood) => (
                <button
                  key={mood}
                  onClick={() => setPaletteMood(mood)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    paletteMood === mood
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold shadow-sm'
                      : 'bg-gray-100 dark:bg-[#1C1F28] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Center 3D Artwork Canvas Box with smooth hover tilt */}
          <div className={`mt-5 rounded-xl ${currentMood.canvas} border ${currentMood.border} p-8 sm:p-14 relative min-h-[320px] flex flex-col justify-between items-center text-center card-3d-tilt shadow-lg overflow-hidden`}>
            {/* Subtle Texture Grain Overlay */}
            {selectedTexture === 'grain' && (
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            )}

            {/* Top Ornamental Ribbon */}
            <div className="flex items-center space-x-3 relative z-10">
              <span className="h-[1px] w-12 bg-current opacity-30" />
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider ${currentMood.tagBg}`}>
                EST. 2026
              </span>
              <span className="h-[1px] w-12 bg-current opacity-30" />
            </div>

            {/* Central Curved Typography Output */}
            <div className="my-8 space-y-2 relative z-10">
              <div className="relative">
                {curveMode === 'arch' ? (
                  <h2 className="text-3xl sm:text-5xl font-black tracking-widest uppercase transition-all duration-200 select-none">
                    ⌒ {headline} ⌒
                  </h2>
                ) : curveMode === 'wave' ? (
                  <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-wider transition-all duration-200 select-none">
                    ~ {headline} ~
                  </h2>
                ) : curveMode === 'badge' ? (
                  <div className="inline-block p-6 rounded-full border-2 border-dashed border-current">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase select-none">
                      ★ {headline} ★
                    </h2>
                  </div>
                ) : (
                  <h2 className="text-3xl sm:text-5xl font-black tracking-wide uppercase transition-all duration-200 select-none">
                    {headline}
                  </h2>
                )}
              </div>

              <p className="text-xs sm:text-sm opacity-80 max-w-md mx-auto pt-2">
                {subheading}
              </p>
            </div>

            {/* Bottom Ornament */}
            <div className="text-[11px] opacity-60 font-medium tracking-widest uppercase relative z-10">
              ✦ ORIGINAL VECTOR CRAFTSMANSHIP ✦
            </div>
          </div>

          {/* Designer Controls Bar */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Headline Text</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#101217] border border-gray-200 dark:border-[#22252E] rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle / Est.</label>
              <input
                type="text"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#101217] border border-gray-200 dark:border-[#22252E] rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Curve Transformation</label>
              <div className="grid grid-cols-4 gap-1">
                {(['straight', 'arch', 'wave', 'badge'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setCurveMode(mode)}
                    className={`py-2 text-[11px] font-semibold capitalize rounded-lg transition-all ${
                      curveMode === mode
                        ? 'bg-sky-500 text-white font-bold'
                        : 'bg-gray-100 dark:bg-[#1C1F28] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SMOOTH CONTINUOUS HORIZONTAL TEMPLATE MARQUEE (Kittl / Gamma Style) */}
      <section className="py-12 overflow-hidden border-y border-gray-200/70 dark:border-[#1E212A] bg-gray-50/50 dark:bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Live Showcase • Gliding Blueprints
            </span>
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Hover to inspect details
          </span>
        </div>

        {/* Continuous Smooth Infinite Marquee */}
        <div className="animate-marquee-smooth space-x-5 py-2">
          {templateBlueprints.map((item, idx) => (
            <div
              key={idx}
              onClick={onLaunchStudio}
              className={`w-72 h-44 rounded-2xl ${item.bg} text-white p-5 flex flex-col justify-between border border-gray-200/50 dark:border-[#272B38] shrink-0 cursor-pointer shadow-md hover:scale-105 transition-transform duration-300 group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-200">
                  {item.tag}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{item.dims}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold group-hover:text-sky-400 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                  <span>Open in editor</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KITTL-STYLE 3D FEATURES SHOWCASE */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono">
            DESIGN SUPERPOWERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 tracking-tight">
            Crafted for pure creative velocity.
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            Forget complex desktop node editors. SnapBrand gives you thoughtful 3D text extrusions, curved path warping, and instant palette magic right inside your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: 3D Typography & Distortion */}
          <div className="rounded-3xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#13151C] p-8 flex flex-col justify-between shadow-sm hover:border-sky-500/40 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6">
                <Type className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                3D Extrusions &amp; Real-Time Curved Lettering
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Warp words along circular seals, vintage arched ribbons, and angled 3D bevels without converting fonts to flat outlines. Keep all text fully editable.
              </p>
            </div>
            <div className="mt-8 p-8 rounded-2xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1E212B] text-center card-3d-tilt">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-500 uppercase">
                ✦ 3D VECTOR TYPE ✦
              </span>
            </div>
          </div>

          {/* Feature 2: Color Harmonies & Instant Recoloring */}
          <div className="rounded-3xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#13151C] p-8 flex flex-col justify-between shadow-sm hover:border-amber-500/40 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Harmonic Palette Recolor Engine
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Test hundreds of balanced designer palettes in milliseconds. One click recolors every layer, stroke, and highlight across your entire composition.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-3 p-8 rounded-2xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1E212B]">
              <span className="w-10 h-10 rounded-full bg-[#18191E] border border-gray-300 dark:border-white/20 shadow-md" />
              <span className="w-10 h-10 rounded-full bg-[#FB923C] shadow-md" />
              <span className="w-10 h-10 rounded-full bg-[#10B981] shadow-md" />
              <span className="w-10 h-10 rounded-full bg-[#38BDF8] shadow-md" />
            </div>
          </div>

          {/* Feature 3: Handcrafted Badges & Ornaments */}
          <div className="rounded-3xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#13151C] p-8 flex flex-col justify-between shadow-sm hover:border-emerald-500/40 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Shapes className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Authentic Vector Seals, Crests &amp; Frames
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Elevate your graphics with genuine decorative ribbons, heritage stars, and circular seal stamps illustrated by master badge artists.
              </p>
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1E212B] flex items-center justify-around text-xs font-mono text-gray-600 dark:text-gray-300">
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#171A22] border border-gray-200 dark:border-[#252936]">[ CRESTS ]</span>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#171A22] border border-gray-200 dark:border-[#252936]">[ RIBBONS ]</span>
              <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#171A22] border border-gray-200 dark:border-[#252936]">[ SEALS ]</span>
            </div>
          </div>

          {/* Feature 4: 3D Multi-Device & Print Mockup Engine */}
          <div className="rounded-3xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#13151C] p-8 flex flex-col justify-between shadow-sm hover:border-indigo-500/40 transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Real-Time 3D Mockup Generator
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Preview your vector design instantly wrapped onto real apparel, packaging kraft boxes, vinyl stickers, and digital social displays with realistic lighting.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 p-6 rounded-2xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1E212B] text-xs font-semibold">
              <span className="flex items-center space-x-1 text-sky-600 dark:text-sky-400">
                <Shirt className="w-4 h-4" />
                <span>APPAREL</span>
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                <Tag className="w-4 h-4" />
                <span>PACKAGING</span>
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                <Monitor className="w-4 h-4" />
                <span>OPENGRAPH</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING ARCHITECTURE */}
      <section id="pricing" className="py-24 border-t border-gray-200/80 dark:border-[#1E212A] max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Simple, honest pricing.
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Free forever for personal creation. Upgrade for commercial licenses and high-DPI exports.
          </p>

          <div className="mt-6 inline-flex items-center bg-gray-100 dark:bg-[#15171F] p-1 rounded-xl border border-gray-200 dark:border-[#222530]">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !annualBilling
                  ? 'bg-white dark:bg-[#202430] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                annualBilling
                  ? 'bg-white dark:bg-[#202430] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">20% OFF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Starter</h3>
              <p className="text-xs text-gray-500 mt-0.5">Free for personal design</p>
              <div className="mt-5 text-3xl font-extrabold text-gray-900 dark:text-white">$0</div>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Full Studio Canvas Access</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Curved Text &amp; Lettering Engine</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Lossless SVG &amp; PNG Exports</span></li>
              </ul>
            </div>
            <button onClick={onLaunchStudio} className="mt-8 w-full py-2.5 rounded-xl bg-gray-100 dark:bg-[#1C1F28] text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#232733] transition-colors">
              Start Free
            </button>
          </div>

          {/* Pro Creator */}
          <div className="rounded-2xl border-2 border-sky-500 bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-lg relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider">
              MOST POPULAR
            </span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pro Creator</h3>
              <p className="text-xs text-gray-500 mt-0.5">For professional creators &amp; designers</p>
              <div className="mt-5 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$12' : '$15'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-gray-700 dark:text-gray-200">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Unlimited 4K Retina Vector Exports</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Custom Brand Kits &amp; Palettes</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Dynamic OpenGraph Link Generation</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Commercial Merchandise License</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('signup')} className="mt-8 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-bold text-white transition-colors">
              Upgrade to Pro
            </button>
          </div>

          {/* Team Studio */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Team Studio</h3>
              <p className="text-xs text-gray-500 mt-0.5">For creative agencies &amp; teams</p>
              <div className="mt-5 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$39' : '$49'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Up to 10 Team Members</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Shared Brand Assets &amp; Typography</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Priority High-Speed Rendering</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('signup')} className="mt-8 w-full py-2.5 rounded-xl bg-gray-100 dark:bg-[#1C1F28] text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#232733] transition-colors">
              Contact Team
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section id="faq" className="py-20 border-t border-gray-200/80 dark:border-[#1E212A] max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#14161C] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-3.5 px-5 text-left flex items-center justify-between font-medium text-sm text-gray-900 dark:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-[#1C1F28] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. GAMMA-STYLE MEGA FOOTER (Direct benchmark from gamma.app) */}
      <footer className="border-t border-gray-200 dark:border-[#1E212A] bg-white dark:bg-[#0A0C10] pt-20 pb-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Top Brand Statement Block */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-16 border-b border-gray-100 dark:border-[#191C24] gap-8">
            <div className="space-y-3 max-w-xl">
              <BrandLogo size="lg" showTagline={true} />
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-snug">
                A new medium for crafting brand identity. Powered by vector craft.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Empowering independent designers, creative studios, and product makers with browser-first typographic precision.
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={onLaunchStudio}
                className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold text-xs shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center space-x-2"
              >
                <span>Start Designing Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5-Column Navigation Matrix */}
          <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
            {/* Column 1: Product */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Product</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Vector Canvas Studio</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Curved Typography</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Color Palette Magic</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">3D Mockup Generator</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Dynamic OpenGraph API</button></li>
                <li><a href="#pricing" className="hover:text-sky-500">Commercial License</a></li>
              </ul>
            </div>

            {/* Column 2: Blueprints */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Blueprints</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Vintage Badges</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">YouTube Channel Banners</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Twitter / X Headers</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Apparel T-Shirt Art</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Product Packaging Seals</button></li>
                <li><button onClick={onLaunchStudio} className="hover:text-sky-500">Editorial Magazine Covers</button></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Resources</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><a href="#faq" className="hover:text-sky-500">Help &amp; Tutorials</a></li>
                <li><a href="#features" className="hover:text-sky-500">Typography Guide</a></li>
                <li><a href="#features" className="hover:text-sky-500">Color Theory Guide</a></li>
                <li><a href="#pricing" className="hover:text-sky-500">Creator Community</a></li>
                <li><a href="#faq" className="hover:text-sky-500">Asset Guidelines</a></li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Company</h4>
              <ul className="space-y-2.5 text-gray-500 dark:text-gray-400">
                <li><a href="#features" className="hover:text-sky-500">About SnapBrand</a></li>
                <li><a href="#features" className="hover:text-sky-500">Design Manifesto</a></li>
                <li><a href="#pricing" className="hover:text-sky-500">Press Kit &amp; Media</a></li>
                <li><a href="#faq" className="hover:text-sky-500">Privacy Policy</a></li>
                <li><a href="#faq" className="hover:text-sky-500">Terms of Service</a></li>
              </ul>
            </div>

            {/* Column 5: System Status */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px]">Studio Status</h4>
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#131620] border border-gray-100 dark:border-[#1E2230] space-y-2">
                <div className="flex items-center space-x-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
                <p className="text-[10px] text-gray-400">
                  Real-time vector rendering engine: 99.99% measured availability.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Social Strip */}
          <div className="pt-8 border-t border-gray-100 dark:border-[#191C24] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© 2026 snapbrand.io. Crafted with precision for visual creators worldwide.</p>
            <div className="flex items-center space-x-6 text-gray-500">
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">X / Twitter</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Dribbble</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">GitHub</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Discord</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
