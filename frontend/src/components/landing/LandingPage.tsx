import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Palette, 
  Download, 
  Cpu, 
  CheckCircle2, 
  ChevronDown,
  ExternalLink,
  Code2
} from 'lucide-react';

interface LandingPageProps {
  onLaunchStudio: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchStudio, onOpenAuth }) => {
  // Interactive Hero Sandbox State
  const [heroTitle, setHeroTitle] = useState('DevSecOps Cloud Architecture');
  const [heroSubtitle, setHeroSubtitle] = useState('Zero-downtime ASG with 12-Stage CI/CD pipeline on AWS');
  const [heroTheme, setHeroTheme] = useState<'cyber' | 'sunset' | 'obsidian' | 'emerald'>('cyber');
  const [heroBadge, setHeroBadge] = useState('AWS CLOUD');

  // Billing Toggle State
  const [isAnnual, setIsAnnual] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const themeColors = {
    cyber: { bg: 'from-[#0b0c16] via-[#12182d] to-[#08203d]', accent: '#00f2fe', border: 'border-cyan-500/30' },
    sunset: { bg: 'from-[#140b0d] via-[#2c0e1b] to-[#401815]', accent: '#ff7a18', border: 'border-orange-500/30' },
    obsidian: { bg: 'from-[#090a0f] via-[#131520] to-[#1a1c2b]', accent: '#ffffff', border: 'border-gray-500/30' },
    emerald: { bg: 'from-[#08120e] via-[#0f291e] to-[#063826]', accent: '#00e676', border: 'border-emerald-500/30' }
  };

  const faqs = [
    {
      q: 'How does the dynamic edge OpenGraph rendering work?',
      a: 'SnapBrand exposes a headless microservice at /api/v1/render/og that synthesizes pure SVG and PNG assets on the fly from query parameters. Assets are cached in Redis with sub-25ms response times, ideal for GitHub social cards and meta crawlers.'
    },
    {
      q: 'How is this project architected for High Availability on AWS?',
      a: 'The application runs in an AWS VPC spanning two Availability Zones (us-east-1a and us-east-1b). Instances run in private subnets behind an Application Load Balancer with CPU target-tracking Auto Scaling Groups, ensuring zero downtime even during instance termination.'
    },
    {
      q: 'What DevSecOps gates are enforced in the 12-stage pipeline?',
      a: 'Every pull request passes through Gitleaks (secret detection), ESLint, Prettier, Hadolint (Dockerfile linting), unit test coverage, SonarCloud, Snyk (dependency CVEs), and Trivy (container scan). Merges to main trigger rolling ECR deployment and synthetic smoke tests with auto-rollback.'
    },
    {
      q: 'Can I export lossless vector SVGs for 4K display and print?',
      a: 'Yes! Unlike raster-based design tools that blur when stretched, SnapBrand exports pure mathematical SVG masters alongside 2x Retina PNGs and WebPs for ultra-sharp rendering at any screen resolution.'
    }
  ];

  return (
    <div className="min-h-screen text-gray-100 overflow-hidden">
      {/* 1. TOP ANNOUNCEMENT PILL */}
      <div className="bg-gradient-to-r from-orange-500/20 via-cyan-500/20 to-purple-500/20 border-b border-[#1f2438] py-2 px-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-medium text-gray-300">
          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-mono text-[10px] font-bold">NEW</span>
          <span>⚡ SnapBrand v2.4 is live: Dynamic Edge CDN &amp; Generative Mesh Gradients</span>
          <button onClick={onLaunchStudio} className="text-orange-400 hover:text-orange-300 underline font-semibold ml-1">
            Explore Studio &rarr;
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION WITH LIVE INTERACTIVE SANDBOX */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#141724] border border-[#23283d] text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>STUDIO-GRADE VISUAL ENGINE &amp; DEVSECOPS AUTOMATION</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Craft Studio-Grade Assets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-cyan-400">
              at Terminal Speed.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            The developer-first brand canvas and dynamic edge image generator. Design vector banners, OpenGraph previews, and tech badges with sub-25ms headless rendering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onLaunchStudio}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-cyan-500 text-white font-semibold text-base shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
            >
              <span>Launch Studio Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#131622] border border-[#24293f] text-gray-200 font-semibold text-base hover:bg-[#1a1e30] transition-all"
            >
              Demo Access &rarr;
            </button>
          </div>
        </div>

        {/* INTERACTIVE HERO SANDBOX */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-[#22273c] bg-[#10121d]/90 backdrop-blur-xl p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#1c2033] gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-gray-400 ml-2">live-sandbox: studio-viewport</span>
            </div>
            
            {/* Theme & Controls Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">Theme:</span>
              {(['cyber', 'sunset', 'obsidian', 'emerald'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setHeroTheme(t)}
                  className={`px-2.5 py-1 rounded text-xs font-mono capitalize transition-all ${
                    heroTheme === t
                      ? 'bg-orange-500 text-white font-bold'
                      : 'bg-[#181b29] text-gray-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Artwork Preview Box */}
          <div className={`mt-6 rounded-xl bg-gradient-to-br ${themeColors[heroTheme].bg} border ${themeColors[heroTheme].border} p-8 sm:p-12 relative overflow-hidden transition-all duration-300 min-h-[300px] flex flex-col justify-between`}>
            {/* Subtle dot overlay inside canvas */}
            <div className="absolute inset-0 canvas-dot-grid pointer-events-none opacity-40" />

            {/* Badge */}
            <div className="relative z-10">
              <span 
                style={{ borderColor: themeColors[heroTheme].accent, color: themeColors[heroTheme].accent }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#0d0f1a]/80 border"
              >
                ● {heroBadge}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="relative z-10 my-6 space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {heroTitle}
              </h3>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl">
                {heroSubtitle}
              </p>
            </div>

            {/* Bottom Footer bar inside art */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>SNAPBRAND ENGINE v2.4</span>
              <span className="text-emerald-400">P95 LATENCY: 14ms</span>
            </div>
          </div>

          {/* Live Tweaker Inputs */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Headline Text</label>
              <input 
                type="text" 
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#161825] border border-[#23283c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Subtitle Description</label>
              <input 
                type="text" 
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full bg-[#161825] border border-[#23283c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Badge Tag</label>
              <input 
                type="text" 
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value.toUpperCase())}
                className="w-full bg-[#161825] border border-[#23283c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF & TRUSTED LOGO STRIP */}
      <section className="py-12 border-y border-[#181b29] bg-[#0c0d14]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
            Engineered for high-velocity teams, open-source maintainers, and cloud platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-lg text-gray-300">GitHub</span>
            <span className="font-bold text-lg text-gray-300">Amazon Web Services</span>
            <span className="font-bold text-lg text-gray-300">Docker</span>
            <span className="font-bold text-lg text-gray-300">PostgreSQL</span>
            <span className="font-bold text-lg text-gray-300">Redis</span>
            <span className="font-bold text-lg text-gray-300">SonarCloud</span>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE BENTO GRID (The Core Engine Showcase) */}
      <section id="bento" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
            ARCHITECTURE &amp; CORE ENGINES
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything Required for High-Impact Visuals and Rock-Solid DevOps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Vector Typography */}
          <div className="md:col-span-2 rounded-2xl bg-[#11131e] border border-[#202538] p-8 relative overflow-hidden group hover:border-orange-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
              <Palette className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Vector Typography &amp; Warp Engine</h3>
            <p className="text-gray-400 text-sm max-w-md mb-6">
              Natively rendered mathematical paths. Curvature, retro 3D extrusions, glow filters, and letter-spacing without loss of fidelity on 4K retina displays.
            </p>
            <div className="h-32 bg-[#0a0b12] rounded-xl border border-[#1b1e2e] p-4 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400 font-mono">
                VECTOR_PURITY_100%
              </span>
            </div>
          </div>

          {/* Bento Card 2: Edge Dynamic API */}
          <div className="rounded-2xl bg-[#11131e] border border-[#202538] p-8 group hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Edge Dynamic API</h3>
            <p className="text-gray-400 text-sm mb-4">
              Headless microservice rendering dynamic OpenGraph cards directly from URL queries with Redis sub-25ms response cache.
            </p>
            <div className="bg-[#0a0b12] p-3 rounded-lg border border-[#1c1f30] font-mono text-[11px] text-gray-400 overflow-x-auto">
              <code>GET /api/v1/render/og?title=DevOps&amp;theme=cyber</code>
            </div>
          </div>

          {/* Bento Card 3: DevSecOps 12-Stage */}
          <div className="rounded-2xl bg-[#11131e] border border-[#202538] p-8 group hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">12-Stage Zero-Trust Pipeline</h3>
            <p className="text-gray-400 text-sm mb-4">
              Gitleaks, ESLint, Hadolint, Snyk, and Trivy CVE scans strictly block high vulnerabilities before reaching AWS.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>0 High/Critical CVEs</span>
            </div>
          </div>

          {/* Bento Card 4: Multi-AZ AWS Infrastructure */}
          <div className="md:col-span-2 rounded-2xl bg-[#11131e] border border-[#202538] p-8 group hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Multi-AZ High Availability &amp; ASG</h3>
            <p className="text-gray-400 text-sm max-w-lg mb-4">
              Private EC2 instances deployed across 2 Availability Zones behind an Application Load Balancer with CPU target-tracking Auto Scaling and automated rollbacks.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#0a0b12] rounded-lg border border-[#1b1f30]">
                <div className="text-lg font-bold text-white font-mono">2</div>
                <div className="text-[10px] text-gray-500 font-mono">AVAILABILITY ZONES</div>
              </div>
              <div className="p-3 bg-[#0a0b12] rounded-lg border border-[#1b1f30]">
                <div className="text-lg font-bold text-emerald-400 font-mono">99.99%</div>
                <div className="text-[10px] text-gray-500 font-mono">MEASURED UPTIME</div>
              </div>
              <div className="p-3 bg-[#0a0b12] rounded-lg border border-[#1b1f30]">
                <div className="text-lg font-bold text-cyan-400 font-mono">60%</div>
                <div className="text-[10px] text-gray-500 font-mono">CPU ASG TRIGGER</div>
              </div>
              <div className="p-3 bg-[#0a0b12] rounded-lg border border-[#1b1f30]">
                <div className="text-lg font-bold text-orange-400 font-mono">&lt; 25ms</div>
                <div className="text-[10px] text-gray-500 font-mono">P95 LATENCY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATE MARQUEE (Infinite Carousel) */}
      <section id="marquee" className="py-16 bg-[#0a0b12] border-y border-[#181b29] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            BLUEPRINT GALLERY
          </h3>
          <p className="text-2xl font-bold text-white mt-1">Ready-to-Deploy Canvas Templates</p>
        </div>

        <div className="animate-marquee space-x-6">
          {[
            { title: 'GitHub Repo Social Preview', category: '1280x640', theme: 'from-orange-950 to-neutral-900', tag: 'GITHUB' },
            { title: 'Twitter/X Tech Header', category: '1500x500', theme: 'from-blue-950 to-neutral-900', tag: 'TWITTER' },
            { title: 'Dynamic OpenGraph Card', category: '1200x630', theme: 'from-purple-950 to-neutral-900', tag: 'OG CARD' },
            { title: 'Product Hunt Badge', category: '240x240', theme: 'from-emerald-950 to-neutral-900', tag: 'BADGE' },
            { title: 'SaaS Architecture Poster', category: '1920x1080', theme: 'from-rose-950 to-neutral-900', tag: 'POSTER' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`w-72 sm:w-80 h-44 rounded-xl bg-gradient-to-br ${item.theme} border border-[#22273c] p-5 shrink-0 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer`}
              onClick={onLaunchStudio}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-gray-300">
                  {item.tag}
                </span>
                <span className="text-[10px] font-mono text-gray-400">{item.category}</span>
              </div>
              <div>
                <p className="font-bold text-white text-base">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">One-click clone into studio &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. COMPARISON MATRIX: SnapBrand vs Canva vs Figma */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">WHY SNAPBRAND</h3>
          <p className="text-3xl font-extrabold text-white">Engineered for Code-Aware Teams</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#202538] text-xs font-mono text-gray-400">
                <th className="py-4 px-4">CAPABILITY</th>
                <th className="py-4 px-4 text-orange-400 font-bold">SNAPBRAND</th>
                <th className="py-4 px-4 text-gray-500">CANVA</th>
                <th className="py-4 px-4 text-gray-500">FIGMA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181c2b] text-gray-300">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Dynamic Edge API (`/v1/render/og`)</td>
                <td className="py-4 px-4 text-emerald-400 font-bold">Yes (Sub-25ms)</td>
                <td className="py-4 px-4 text-gray-500">No</td>
                <td className="py-4 px-4 text-gray-500">Plugin required</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Lossless Vector SVG Master</td>
                <td className="py-4 px-4 text-emerald-400 font-bold">Native SVG</td>
                <td className="py-4 px-4 text-gray-500">Raster/PNG</td>
                <td className="py-4 px-4 text-gray-300">Yes</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">12-Stage DevSecOps Pipeline</td>
                <td className="py-4 px-4 text-emerald-400 font-bold">Built-in (Zero-Trust)</td>
                <td className="py-4 px-4 text-gray-500">N/A</td>
                <td className="py-4 px-4 text-gray-500">N/A</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Self-Hosted Docker Stack</td>
                <td className="py-4 px-4 text-emerald-400 font-bold">1-Command Compose</td>
                <td className="py-4 px-4 text-gray-500">Proprietary</td>
                <td className="py-4 px-4 text-gray-500">Proprietary</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. PRICING ARCHITECTURE */}
      <section id="pricing" className="py-24 bg-[#0a0b12] border-t border-[#181b29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">TRANSPARENT PLANS</h3>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">Built for Open Source &amp; Scale</p>
            
            {/* Annual Billing Toggle */}
            <div className="mt-6 inline-flex items-center bg-[#131624] p-1 rounded-xl border border-[#22273c]">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !isAnnual ? 'bg-orange-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
                  isAnnual ? 'bg-orange-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Community Plan */}
            <div className="rounded-2xl bg-[#11131e] border border-[#202538] p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Community</h4>
                <p className="text-xs text-gray-400 mt-1">For hobbyists and open-source</p>
                <div className="mt-6 text-3xl font-extrabold text-white">$0</div>
                <p className="text-xs text-gray-500">Free forever</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Full Studio Canvas Access</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Lossless SVG &amp; PNG Exports</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>50 Dynamic API Calls / Day</span></li>
                </ul>
              </div>
              <button onClick={onLaunchStudio} className="mt-8 w-full py-2.5 rounded-xl bg-[#181c2d] border border-[#242b45] text-xs font-semibold text-white hover:bg-[#20253c] transition-colors">
                Start Free
              </button>
            </div>

            {/* Pro Creator Plan */}
            <div className="rounded-2xl bg-gradient-to-b from-[#181524] to-[#11131e] border-2 border-orange-500/60 p-8 relative flex flex-col justify-between shadow-2xl shadow-orange-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold tracking-wider">
                RECOMMENDED
              </span>
              <div>
                <h4 className="text-lg font-bold text-white">Pro Creator</h4>
                <p className="text-xs text-gray-400 mt-1">For independent builders &amp; creators</p>
                <div className="mt-6 text-3xl font-extrabold text-white">
                  {isAnnual ? '$12' : '$15'}
                  <span className="text-xs font-normal text-gray-400"> / month</span>
                </div>
                <p className="text-xs text-gray-500">{isAnnual ? 'Billed annually ($144)' : 'Billed monthly'}</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-200">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Unlimited 4K High-Res Exports</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>10,000 Dynamic Edge API Calls</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Custom Brand Kits &amp; Palettes</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Priority Redis Caching Engine</span></li>
                </ul>
              </div>
              <button onClick={onOpenAuth} className="mt-8 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-xs font-semibold text-white shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all">
                Try Pro Demo
              </button>
            </div>

            {/* Enterprise Self-Hosted */}
            <div className="rounded-2xl bg-[#11131e] border border-[#202538] p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Self-Hosted</h4>
                <p className="text-xs text-gray-400 mt-1">For high-traffic platforms</p>
                <div className="mt-6 text-3xl font-extrabold text-white">Custom</div>
                <p className="text-xs text-gray-500">Dedicated AWS Multi-AZ Cluster</p>
                <ul className="mt-6 space-y-3 text-xs text-gray-300">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Full AWS Launch Template &amp; ASG</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>12-Stage DevSecOps Pipeline</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /><span>Zero-Trust IAM OIDC Integration</span></li>
                </ul>
              </div>
              <button onClick={onOpenAuth} className="mt-8 w-full py-2.5 rounded-xl bg-[#181c2d] border border-[#242b45] text-xs font-semibold text-white hover:bg-[#20253c] transition-colors">
                Contact DevOps
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">QUESTIONS</h3>
          <p className="text-3xl font-extrabold text-white">Frequently Answered Queries</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-xl bg-[#11131e] border border-[#1f2438] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between font-medium text-white hover:text-orange-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed border-t border-[#181c2d] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. BOTTOM GLOWING OBSIDIAN CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-orange-950/40 via-[#10121d] to-cyan-950/40 border border-orange-500/30 p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to elevate your project's brand identity?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Join thousands of developers crafting ultra-clean OpenGraph cards, banners, and badges backed by production-grade DevSecOps.
            </p>
            <div className="pt-2">
              <button
                onClick={onLaunchStudio}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-cyan-500 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:scale-105 transition-all"
              >
                Start Creating Free Now &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. MEGA FOOTER */}
      <footer className="border-t border-[#181b29] bg-[#090a0f] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500 p-1 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Snap<span className="text-orange-500">Brand</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Studio-grade brand assets, generative mesh gradients, and edge dynamic rendering engine. Built with zero-trust DevSecOps and AWS Multi-AZ reliability.
            </p>
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#12141f] border border-[#222738] text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={onLaunchStudio} className="hover:text-white">Studio Canvas</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-white">Typography Engine</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-white">Generative Mesh</button></li>
              <li><button onClick={onLaunchStudio} className="hover:text-white">Edge Dynamic API</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-4">DevOps &amp; Cloud</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#bento" className="hover:text-white">12-Stage CI/CD</a></li>
              <li><a href="#bento" className="hover:text-white">Multi-AZ VPC</a></li>
              <li><a href="#bento" className="hover:text-white">Gitleaks &amp; Snyk</a></li>
              <li><a href="#bento" className="hover:text-white">CloudWatch Metrics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#faq" className="hover:text-white">Documentation</a></li>
              <li><a href="#marquee" className="hover:text-white">Blueprints</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><button onClick={onOpenAuth} className="hover:text-white">Demo Credentials</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#161825] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono">
          <p>© 2026 SnapBrand Cloud. DevOps Final Showcase Project.</p>
          <p className="mt-2 sm:mt-0">Node.js • React 19 • Docker • AWS ASG • PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
};
