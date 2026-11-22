import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Layers, 
  Type, 
  Palette, 
  Sliders, 
  Download, 
  Check, 
  ChevronDown, 
  Maximize2,
  Brush,
  Eye,
  Shapes,
  Laptop
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface LandingPageProps {
  onLaunchStudio: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchStudio, onOpenAuth }) => {
  // Live Interactive Hero Sandbox State (Pure design controls)
  const [headline, setHeadline] = useState('CREATIVE HORIZON');
  const [tagline, setTagline] = useState('Next-Generation Vector Graphics & Brand Assets');
  const [selectedStyle, setSelectedStyle] = useState<'cyber' | 'sunset' | 'editorial' | 'retro'>('cyber');
  const [curvedText, setCurvedText] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(4);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [annualBilling, setAnnualBilling] = useState(true);

  const stylePresets = {
    cyber: {
      bg: 'from-[#0A0E1A] via-[#0E1528] to-[#08203D]',
      accent: '#00F2FE',
      pill: 'CYBER EDITION',
      fontStyle: 'font-extrabold uppercase tracking-widest text-cyan-400',
      border: 'border-cyan-500/40'
    },
    sunset: {
      bg: 'from-[#170C0F] via-[#2A111E] to-[#401815]',
      accent: '#FF7A18',
      pill: 'GOLDEN HOUR',
      fontStyle: 'font-extrabold tracking-tight text-orange-400',
      border: 'border-orange-500/40'
    },
    editorial: {
      bg: 'from-[#0B0D13] via-[#141824] to-[#1C2033]',
      accent: '#E2E8F0',
      pill: 'MODERN MONO',
      fontStyle: 'font-bold uppercase tracking-wider text-gray-100',
      border: 'border-gray-500/40'
    },
    retro: {
      bg: 'from-[#091512] via-[#0E261E] to-[#073625]',
      accent: '#00E676',
      pill: 'VINTAGE BADGE',
      fontStyle: 'font-black tracking-tight text-emerald-400',
      border: 'border-emerald-500/40'
    }
  };

  const currentPreset = stylePresets[selectedStyle];

  const faqs = [
    {
      q: 'What makes SnapBrand different from generic design tools?',
      a: 'SnapBrand is built from the ground up for high-precision brand creation. It combines intuitive vector typography, procedural mesh gradients, and instant 4K lossless SVG/PNG exports with headless dynamic URL generation for real-time social previews.'
    },
    {
      q: 'Can I export lossless vector files for print and high-res display?',
      a: 'Yes! Every design asset maintains pure mathematical vector definitions. You can export ultra-clean SVGs, 2x Retina PNGs, or dynamic URLs with zero pixel distortion at any resolution.'
    },
    {
      q: 'Are my brand palettes and project files securely saved?',
      a: 'All project states, custom typography pairings, and Brand Kits are securely persisted to your account database with end-to-end user isolation and automated cloud backups.'
    },
    {
      q: 'Can I generate dynamic OpenGraph cards for my blog or software?',
      a: 'Yes! SnapBrand provides a high-speed dynamic rendering engine. Simply pass your title, subtitle, and theme as query parameters to get instant, cached visual cards for Twitter/X, GitHub, and LinkedIn.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090E] text-gray-900 dark:text-gray-100 transition-colors selection:bg-cyan-500 selection:text-white overflow-hidden">
      {/* 1. TOP ANNOUNCEMENT PILL */}
      <div className="border-b border-gray-200 dark:border-[#181F33] bg-gray-50/80 dark:bg-[#0D101C]/80 py-2.5 px-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-medium text-gray-600 dark:text-gray-300">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] uppercase tracking-wider border border-cyan-500/20">
            NEW V2.4
          </span>
          <span>⚡ Introducing 3D Extrusions, Curved Typography &amp; Dynamic Edge Preview</span>
          <button onClick={onLaunchStudio} className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold ml-1">
            Explore Studio &rarr;
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION WITH 3D INTERACTIVE PLAYGROUND */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-[#121626] border border-gray-200 dark:border-[#20273D] text-xs font-medium text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>THE NEXT-GEN VECTOR &amp; BRAND DESIGN SUITE</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            Design Iconic Brand Assets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500">
              Without the Complexity.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
            Effortlessly craft vector banners, curved typography, generative mesh backgrounds, and social previews in an intuitive studio built for modern creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchStudio}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
            >
              <span>Open Studio Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-100 dark:bg-[#131726] border border-gray-200 dark:border-[#222B42] text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-[#1B2238] transition-all"
            >
              Create Account &rarr;
            </button>
          </div>
        </div>

        {/* 3D INTERACTIVE WORKBENCH SHOWCASE (Kittl-Level Real Canvas) */}
        <div id="studio-interactive" className="mt-14 max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-[#1F273E] bg-white dark:bg-[#0E121E] shadow-2xl p-5 sm:p-7 relative">
          {/* Top Workbench Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-gray-100 dark:border-[#1A2238] gap-4">
            <div className="flex items-center space-x-3">
              <BrandLogo size="sm" showDomain={false} />
              <span className="text-xs font-mono text-gray-400">interactive-canvas // real-time vector</span>
            </div>

            {/* Aesthetic Theme Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 font-medium">Style:</span>
              {(['cyber', 'sunset', 'editorial', 'retro'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedStyle === style
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-[#161B2C] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Center 3D Interactive Canvas Box */}
          <div className={`mt-6 rounded-2xl bg-gradient-to-br ${currentPreset.bg} border ${currentPreset.border} p-8 sm:p-14 relative min-h-[320px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner transition-all duration-300`}>
            {/* Background Ambient Glow */}
            <div 
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 pointer-events-none blur-3xl"
              style={{ backgroundColor: currentPreset.accent }}
            />

            {/* Top Badge Pill */}
            <div className="relative z-10">
              <span 
                style={{ borderColor: currentPreset.accent, color: currentPreset.accent }}
                className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-black/60 border backdrop-blur-md"
              >
                ● {currentPreset.pill}
              </span>
            </div>

            {/* Headline and Tagline */}
            <div className="relative z-10 my-8 space-y-3">
              <h2 
                style={{ letterSpacing: `${letterSpacing}px` }}
                className={`text-3xl sm:text-5xl ${currentPreset.fontStyle} text-white transition-all`}
              >
                {headline}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl font-normal">
                {tagline}
              </p>
            </div>

            {/* Bottom Card Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>SNAPBRAND STUDIO 2.4</span>
              <span className="text-cyan-400">4K RETINA READY</span>
            </div>
          </div>

          {/* Quick Design Tweakers */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Headline Text
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Tagline / Subtext
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Letter Spacing
                </label>
                <span className="text-[11px] font-mono text-cyan-500">{letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED CREATIVE STRIP */}
      <section className="py-10 border-y border-gray-200 dark:border-[#181F33] bg-gray-50/50 dark:bg-[#0A0D16]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
            Empowering independent designers, creative studios, and fast-growing brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-65 grayscale hover:grayscale-0 transition-all font-bold text-sm tracking-wide text-gray-600 dark:text-gray-400">
            <span>DRIBBBLE</span>
            <span>BEHANCE</span>
            <span>PRODUCT HUNT</span>
            <span>VERCEL</span>
            <span>FIGMA COMMUNITY</span>
            <span>STRIPE PRESS</span>
          </div>
        </div>
      </section>

      {/* 4. CORE DESIGN CAPABILITIES (The Kittl-Tier Features) */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-2 font-bold">
            CRAFTED FOR CREATIVE EXCELLENCE
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Everything You Need to Build High-Impact Brand Visuals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vector Typography */}
          <div className="md:col-span-2 rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 group hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Type className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Vector Typography &amp; Curved Paths
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-6 leading-relaxed">
              Design curved circular text, retro drop-shadows, 3D extruded lettering, and custom font tracking without losing crispness on 4K displays.
            </p>
            <div className="h-32 bg-white dark:bg-[#0A0D15] rounded-2xl border border-gray-200 dark:border-[#181F33] p-4 flex items-center justify-center shadow-sm">
              <span className="text-3xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-500">
                VECTOR_PURITY_100%
              </span>
            </div>
          </div>

          {/* Card 2: Mesh Gradients */}
          <div className="rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 group hover:border-orange-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
              <Palette className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Generative Mesh Gradients
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              Generate atmospheric multi-point color meshes with real-time film grain overlays and studio lighting flares.
            </p>
            <div className="h-28 rounded-xl bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-cyan-500/30 border border-white/10" />
          </div>

          {/* Card 3: Brand Kit Hub */}
          <div className="rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Centralized Brand Kits
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              Store your official hex palettes, typography pairings, and watermarks to apply across projects with 1 click.
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-cyan-400 shadow-sm" />
              <div className="w-8 h-8 rounded-full bg-orange-500 shadow-sm" />
              <div className="w-8 h-8 rounded-full bg-emerald-400 shadow-sm" />
              <div className="w-8 h-8 rounded-full bg-purple-500 shadow-sm" />
            </div>
          </div>

          {/* Card 4: Lossless 4K Export */}
          <div className="md:col-span-2 rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 group hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
              <Download className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Lossless 4K Multi-Format Exports &amp; Dynamic OpenGraph
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">
              Export pure vector SVGs for print, 2x Retina PNGs for digital headers, or use our dynamic edge URL to auto-generate branded social preview cards.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 bg-white dark:bg-[#0A0D15] rounded-xl border border-gray-200 dark:border-[#1A2238]">
                <div className="text-lg font-bold font-mono text-cyan-500">SVG</div>
                <div className="text-[10px] text-gray-400 font-mono">LOSSLESS VECTOR</div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#0A0D15] rounded-xl border border-gray-200 dark:border-[#1A2238]">
                <div className="text-lg font-bold font-mono text-orange-500">PNG 2X</div>
                <div className="text-[10px] text-gray-400 font-mono">RETINA MASTER</div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#0A0D15] rounded-xl border border-gray-200 dark:border-[#1A2238]">
                <div className="text-lg font-bold font-mono text-emerald-500">WEBP</div>
                <div className="text-[10px] text-gray-400 font-mono">ULTRA LIGHT</div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#0A0D15] rounded-xl border border-gray-200 dark:border-[#1A2238]">
                <div className="text-lg font-bold font-mono text-purple-500">API URL</div>
                <div className="text-[10px] text-gray-400 font-mono">DYNAMIC CDN</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BLUEPRINT TEMPLATES CAROUSEL */}
      <section id="templates" className="py-20 bg-gray-50 dark:bg-[#0A0D16] border-y border-gray-200 dark:border-[#181F33]">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 font-bold">
            CURATED BLUEPRINTS
          </h3>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Start with Studio-Grade Foundations
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'YouTube Cover & Channel Art', size: '2560x1440', theme: 'from-orange-950 to-neutral-900', tag: 'YOUTUBE' },
            { title: 'X / Twitter Banner', size: '1500x500', theme: 'from-blue-950 to-neutral-900', tag: 'TWITTER' },
            { title: 'OpenGraph Social Card', size: '1200x630', theme: 'from-cyan-950 to-neutral-900', tag: 'OG CARD' },
            { title: 'App Store / Product Hunt Card', size: '1280x800', theme: 'from-purple-950 to-neutral-900', tag: 'PRODUCT' }
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={onLaunchStudio}
              className={`rounded-2xl bg-gradient-to-br ${card.theme} border border-gray-200 dark:border-[#20273D] p-6 flex flex-col justify-between h-52 cursor-pointer hover:scale-105 transition-all shadow-lg group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-white font-bold">
                  {card.tag}
                </span>
                <span className="text-[10px] font-mono text-gray-400">{card.size}</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                  <span>Open in studio</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 font-bold mb-2">
            SIMPLE, TRANSPARENT PRICING
          </h3>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Choose the Perfect Plan for Your Creative Workflow
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-6 inline-flex items-center bg-gray-100 dark:bg-[#121626] p-1 rounded-xl border border-gray-200 dark:border-[#20273D]">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !annualBilling
                  ? 'bg-white dark:bg-[#20273D] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                annualBilling
                  ? 'bg-white dark:bg-[#20273D] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 text-[10px] font-bold">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Starter</h4>
              <p className="text-xs text-gray-500 mt-1">For independent creators</p>
              <div className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">$0</div>
              <p className="text-xs text-gray-400">Free forever</p>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Full Studio Canvas Access</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Lossless SVG &amp; PNG Exports</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>10 Saved Cloud Projects</span></li>
              </ul>
            </div>
            <button onClick={onLaunchStudio} className="mt-8 w-full py-3 rounded-xl bg-gray-200 dark:bg-[#181D2E] text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#20273E] transition-colors">
              Start Creating Free
            </button>
          </div>

          {/* Pro Creator */}
          <div className="rounded-3xl bg-gradient-to-b from-white to-gray-50 dark:from-[#131728] dark:to-[#0E121E] border-2 border-cyan-500 p-8 relative flex flex-col justify-between shadow-2xl shadow-cyan-500/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-white font-mono text-[10px] font-bold tracking-wider">
              MOST POPULAR
            </span>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Pro Creator</h4>
              <p className="text-xs text-gray-500 mt-1">For professional designers &amp; builders</p>
              <div className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$12' : '$15'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <p className="text-xs text-gray-400">{annualBilling ? 'Billed annually ($144)' : 'Billed monthly'}</p>
              <ul className="mt-6 space-y-3 text-xs text-gray-700 dark:text-gray-200">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Unlimited 4K Lossless Exports</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Unlimited Cloud Saved Projects</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Custom Brand Kit &amp; Palette Manager</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Dynamic OpenGraph Edge API</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('signup')} className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all">
              Upgrade to Pro
            </button>
          </div>

          {/* Team Studio */}
          <div className="rounded-3xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Team Studio</h4>
              <p className="text-xs text-gray-500 mt-1">For creative agencies &amp; teams</p>
              <div className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$39' : '$49'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <p className="text-xs text-gray-400">Collaborative workspace</p>
              <ul className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Up to 10 Team Members</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Shared Brand Assets &amp; Palettes</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-cyan-500" /><span>Priority Edge CDN Rendering</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('signup')} className="mt-8 w-full py-3 rounded-xl bg-gray-200 dark:bg-[#181D2E] text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#20273E] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500 font-bold mb-2">
            HELP &amp; FAQ
          </h3>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Common Questions About SnapBrand
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1E2538] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:text-cyan-500 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-[#181F33] pt-3.5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM STUDIO CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-orange-900/40 border border-cyan-500/30 p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to create iconic brand assets?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Start building high-converting banners, typography artwork, and dynamic previews today.
            </p>
            <div className="pt-2">
              <button
                onClick={onLaunchStudio}
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 text-white font-bold text-base shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
              >
                Launch Studio Free Now &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MEGA FOOTER */}
      <footer className="border-t border-gray-200 dark:border-[#181F33] bg-gray-50 dark:bg-[#07080C] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              SnapBrand is the next-generation creative studio for vector typography, generative mesh backgrounds, and instant dynamic social previews.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Studio Engine Operational</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-200 uppercase mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><button onClick={onLaunchStudio} className="hover:text-cyan-500">Studio Canvas</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-cyan-500">Curved Typography</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-cyan-500">Mesh Gradients</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-cyan-500">Dynamic Edge API</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-200 uppercase mb-4">Templates</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><a href="#templates" className="hover:text-cyan-500">YouTube Covers</a></li>
              <li><a href="#templates" className="hover:text-cyan-500">Twitter Headers</a></li>
              <li><a href="#templates" className="hover:text-cyan-500">OpenGraph Cards</a></li>
              <li><a href="#templates" className="hover:text-cyan-500">Brand Badges</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-200 uppercase mb-4">Account</h4>
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li><button onClick={() => onOpenAuth('signup')} className="hover:text-cyan-500">Sign Up</button></li>
              <li><button onClick={() => onOpenAuth('signin')} className="hover:text-cyan-500">Sign In</button></li>
              <li><a href="#pricing" className="hover:text-cyan-500">Plans &amp; Pricing</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-[#151B2C] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 snapbrand.io. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-mono">Crafted for modern creators worldwide.</p>
        </div>
      </footer>
    </div>
  );
};
