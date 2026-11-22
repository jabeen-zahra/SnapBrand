import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Type, 
  Palette, 
  Sliders, 
  Download, 
  Check, 
  ChevronDown, 
  Layers, 
  Move,
  Shapes,
  Maximize2
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface LandingPageProps {
  onLaunchStudio: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchStudio, onOpenAuth }) => {
  // Thoughtful Hero Design Playground State
  const [headline, setHeadline] = useState('HERITAGE CRAFT');
  const [subheading, setSubheading] = useState('Est. 2026 • Original Vector Design');
  const [curveMode, setCurveMode] = useState<'straight' | 'arch' | 'wave' | 'badge'>('arch');
  const [paletteMood, setPaletteMood] = useState<'graphite' | 'terracotta' | 'forest' | 'cream'>('graphite');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'display'>('display');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [annualBilling, setAnnualBilling] = useState(true);

  // Thoughtful Color Moods (Matte, tactile, real design tones — NO neon glow)
  const colorMoods = {
    graphite: {
      canvas: 'bg-[#18191E] text-white',
      cardBorder: 'border-[#2C2E38]',
      accent: '#38BDF8',
      tagBg: 'bg-white/10 text-gray-200',
      ornament: '#64748B'
    },
    terracotta: {
      canvas: 'bg-[#2A1810] text-[#FED7AA]',
      cardBorder: 'border-[#4A2D1F]',
      accent: '#FB923C',
      tagBg: 'bg-amber-500/20 text-amber-200',
      ornament: '#F97316'
    },
    forest: {
      canvas: 'bg-[#101F18] text-[#BBF7D0]',
      cardBorder: 'border-[#1E3B2E]',
      accent: '#34D399',
      tagBg: 'bg-emerald-500/20 text-emerald-200',
      ornament: '#10B981'
    },
    cream: {
      canvas: 'bg-[#F4EFE6] text-[#2D2823]',
      cardBorder: 'border-[#DCD3C4]',
      accent: '#C2410C',
      tagBg: 'bg-black/10 text-gray-800',
      ornament: '#78350F'
    }
  };

  const currentMood = colorMoods[paletteMood];

  const faqs = [
    {
      q: 'What makes SnapBrand different from standard design apps?',
      a: 'SnapBrand is crafted specifically for creators who need custom lettering, curved typography, and vintage-to-modern badges without the steep learning curve of desktop software. Everything runs smoothly in your browser with mathematical vector precision.'
    },
    {
      q: 'Can I export clean vector files for commercial use and merchandise print?',
      a: 'Yes. Every artwork maintains pure mathematical SVG paths, so you can export infinitely scalable vectors for embroidery, screen printing, posters, or digital product cards.'
    },
    {
      q: 'How does the live curve and text distortion engine work?',
      a: 'Our typography engine dynamically maps glyph coordinates onto bezier curves in real time, giving you instant Arch, Wave, and Circle Badge transformations without rasterizing fonts.'
    },
    {
      q: 'Can I save custom brand palettes and typography pairings?',
      a: 'Yes, your Brand Kits are saved directly into your account library and can be applied to any canvas blueprint with a single click.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0F1014] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* 1. HERO SECTION (Warm, thoughtful, designer-oriented) */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

        {/* 2. THE INTERACTIVE DESIGN WORKBENCH (Kittl / Gamma Experience) */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-4 sm:p-6 shadow-xl">
          {/* Top Workbench Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-[#1E212A] gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Typography Studio</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">Live Curve Transformer</span>
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

          {/* The Artwork Canvas Area */}
          <div className={`mt-5 rounded-xl ${currentMood.canvas} border ${currentMood.cardBorder} p-8 sm:p-14 relative min-h-[320px] flex flex-col justify-between items-center text-center transition-all duration-300 shadow-inner overflow-hidden`}>
            {/* Top Ornamental Ribbon */}
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-12 bg-current opacity-30" />
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider ${currentMood.tagBg}`}>
                EST. 2026
              </span>
              <span className="h-[1px] w-12 bg-current opacity-30" />
            </div>

            {/* Central Curved Typography Output */}
            <div className="my-8 space-y-2">
              {/* Dynamic Simulated Curve or Straight Transform */}
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
            <div className="text-[11px] opacity-60 font-medium tracking-widest uppercase">
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

      {/* 3. THOUGHTFUL FEATURES SECTION (Inspired by Kittl & Gamma) */}
      <section className="py-20 border-t border-gray-200/80 dark:border-[#1E212A] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Built for visual craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1.5 tracking-tight">
            Design tools that work the way your mind does.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            Forget wrestling with pen tool bezier nodes or complicated layer trees. Everything in SnapBrand is built to produce striking brand aesthetics in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Advanced Lettering & Curves */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5">
                <Type className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Real-Time Curved &amp; Distorted Lettering
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Transform any word into an arched banner, circular heritage stamp, or retro wavy headline with one click. Adjust angle, tracking, and curvature seamlessly.
              </p>
            </div>
            <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1D2028] text-center">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-gray-700 dark:text-gray-200 uppercase">
                ★ ARCHED LETTERING ★
              </span>
            </div>
          </div>

          {/* Feature 2: Color Harmony Engine */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Curated Color Harmonies &amp; Brand Kits
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Never second-guess color balance again. Apply tested designer palettes — from Vintage Terracotta to High-Contrast Graphite — with instant full-artwork recoloring.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-3 p-6 rounded-xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1D2028]">
              <span className="w-8 h-8 rounded-full bg-[#18191E] border border-gray-300 dark:border-white/20 shadow-sm" />
              <span className="w-8 h-8 rounded-full bg-[#FB923C] shadow-sm" />
              <span className="w-8 h-8 rounded-full bg-[#10B981] shadow-sm" />
              <span className="w-8 h-8 rounded-full bg-[#F4EFE6] border border-gray-300 shadow-sm" />
            </div>
          </div>

          {/* Feature 3: Vector Asset Library */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Shapes className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Handcrafted Badges, Ornaments &amp; Frames
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Elevate your graphics with authentic decorative frames, ribbon banners, stars, and seal stamps created by professional vector illustrators.
              </p>
            </div>
            <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1D2028] flex items-center justify-around text-xs font-mono text-gray-600 dark:text-gray-300">
              <span>[ RIBBONS ]</span>
              <span>[ SEALS ]</span>
              <span>[ CRESTS ]</span>
              <span>[ FRAMES ]</span>
            </div>
          </div>

          {/* Feature 4: Lossless 4K Multi-Format Exports */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#232630] bg-white dark:bg-[#14161C] p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Lossless SVG &amp; Print-Ready High-Res Exports
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Export pure mathematical SVGs for razor-sharp rendering on any screen, high-DPI transparent PNGs for apparel print, or dynamic links for social cards.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 p-5 rounded-xl bg-gray-50 dark:bg-[#0E1015] border border-gray-100 dark:border-[#1D2028] text-xs font-semibold">
              <span className="text-sky-600 dark:text-sky-400">VECTOR SVG</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-emerald-600 dark:text-emerald-400">PNG RETINA</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-amber-600 dark:text-amber-400">DYNAMIC OPENGRAPH</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATE BLUEPRINTS */}
      <section className="py-20 border-t border-gray-200/80 dark:border-[#1E212A] bg-gray-50/50 dark:bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Ready-to-use blueprints
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Start from curated design layouts.
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'YouTube Header Artwork', dims: '2560 × 1440', bg: 'bg-[#18191E]', category: 'YOUTUBE' },
            { title: 'X / Twitter Banner', dims: '1500 × 500', bg: 'bg-[#2A1810]', category: 'TWITTER' },
            { title: 'OpenGraph Social Card', dims: '1200 × 630', bg: 'bg-[#101F18]', category: 'OG PREVIEW' },
            { title: 'Vintage Circular Seal', dims: '1000 × 1000', bg: 'bg-[#201A24]', category: 'MERCH EMBLEM' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={onLaunchStudio}
              className={`rounded-2xl ${item.bg} text-white p-6 h-52 flex flex-col justify-between border border-gray-200 dark:border-[#2A2E3B] cursor-pointer hover:scale-[1.02] transition-transform shadow-sm group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-gray-200">
                  {item.category}
                </span>
                <span className="text-[11px] text-gray-400">{item.dims}</span>
              </div>
              <div>
                <h4 className="text-base font-bold group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                  <span>Open in editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING ARCHITECTURE */}
      <section className="py-20 border-t border-gray-200/80 dark:border-[#1E212A] max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Simple, transparent pricing.
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Start for free, upgrade when you need commercial batch exports.
          </p>

          <div className="mt-5 inline-flex items-center bg-gray-100 dark:bg-[#15171F] p-1 rounded-xl border border-gray-200 dark:border-[#222530]">
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
          {/* Starter Free */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#14161C] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Starter</h3>
              <p className="text-xs text-gray-500 mt-0.5">Free for personal design</p>
              <div className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">$0</div>
              <ul className="mt-5 space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
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
          <div className="rounded-2xl border-2 border-sky-500 bg-white dark:bg-[#14161C] p-6 flex flex-col justify-between shadow-lg relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider">
              MOST POPULAR
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Pro Creator</h3>
              <p className="text-xs text-gray-500 mt-0.5">For professional creators &amp; designers</p>
              <div className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$12' : '$15'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-gray-700 dark:text-gray-200">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Unlimited 4K Retina Vector Exports</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Custom Brand Kits &amp; Palettes</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Dynamic OpenGraph Link Generation</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Commercial Use License</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('signup')} className="mt-8 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-bold text-white transition-colors">
              Get Started
            </button>
          </div>

          {/* Team Studio */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#222530] bg-white dark:bg-[#14161C] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Team Studio</h3>
              <p className="text-xs text-gray-500 mt-0.5">For agencies and creative teams</p>
              <div className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                {annualBilling ? '$39' : '$49'}
                <span className="text-xs font-normal text-gray-400"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-sky-500" /><span>Up to 10 Team Seats</span></li>
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
      <section className="py-16 border-t border-gray-200/80 dark:border-[#1E212A] max-w-3xl mx-auto px-4">
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

      {/* 7. BOTTOM CTA */}
      <section className="py-16 border-t border-gray-200/80 dark:border-[#1E212A] bg-gray-900 dark:bg-[#0A0C10] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to design your next iconic asset?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Join thousands of creators crafting vectors and brand graphics in a fast, lightweight browser studio.
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunchStudio}
              className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-md transition-all"
            >
              Launch Studio Free &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-gray-200 dark:border-[#1E212A] bg-white dark:bg-[#0E1015] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <BrandLogo size="sm" showTagline={false} />
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <span>Creative Design Studio for Modern Brands</span>
          </div>
          <div>
            © 2026 SnapBrand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
