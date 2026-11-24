import React, { useState } from "react";
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
} from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { BrandLogo } from "../common/BrandLogo";

interface StudioViewProps {
  onBackToDashboard?: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  onBackToDashboard,
}) => {
  const { token } = useAuth();

  const [projectName, setProjectName] = useState("Vintage Heritage Crest");
  const [headline, setHeadline] = useState("HERITAGE CRAFT");
  const [subtitle, setSubtitle] = useState(
    "Authentic Handcrafted Vector Assets • Est. 2026",
  );
  const [badgeText, setBadgeText] = useState("ORIGINAL BRAND");
  const [paletteMood, setPaletteMood] = useState<
    "graphite" | "terracotta" | "forest" | "cream"
  >("graphite");
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
    label: string;
  }>({
    width: 1200,
    height: 630,
    label: "OpenGraph Card (1200x630)",
  });
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<
    "palette" | "typography" | "tags" | "export"
  >("palette");
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "HERITAGE",
    "VECTOR SVG",
    "HANDCRAFTED",
  ]);

  // Tactile, non-neon designer moods
  const palettes = {
    graphite: {
      bg: "bg-[#18191E] text-white",
      border: "border-[#2D303B]",
      accent: "#38BDF8",
      tagColor: "bg-white/10 text-gray-200",
    },
    terracotta: {
      bg: "bg-[#2A1810] text-[#FED7AA]",
      border: "border-[#4A2D1F]",
      accent: "#FB923C",
      tagColor: "bg-amber-500/20 text-amber-200",
    },
    forest: {
      bg: "bg-[#101F18] text-[#BBF7D0]",
      border: "border-[#1E3B2E]",
      accent: "#34D399",
      tagColor: "bg-emerald-500/20 text-emerald-200",
    },
    cream: {
      bg: "bg-[#F4EFE6] text-[#2D2823]",
      border: "border-[#DCD3C4]",
      accent: "#C2410C",
      tagColor: "bg-black/10 text-gray-800",
    },
  };

  const currentMood = palettes[paletteMood];

  const presetSizes = [
    { width: 1200, height: 630, label: "OpenGraph Card (1200x630)" },
    { width: 1280, height: 640, label: "GitHub Header (1280x640)" },
    { width: 1500, height: 500, label: "Twitter/X Cover (1500x500)" },
    { width: 1080, height: 1080, label: "Square Post (1080x1080)" },
    { width: 1080, height: 1920, label: "Vertical Story (1080x1920)" },
    { width: 2400, height: 1260, label: "Retina 4K Banner (2400x1260)" },
  ];

  const availableTags = [
    "HERITAGE",
    "VECTOR SVG",
    "HANDCRAFTED",
    "EDITORIAL",
    "SWISS TYPE",
    "MINIMALIST",
    "VINTAGE BADGE",
    "4K RETINA",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const generateSvgMarkup = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 ${dimensions.width} ${dimensions.height}">
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="#18191E"/>
  <rect x="40" y="40" width="${dimensions.width - 80}" height="${dimensions.height - 80}" rx="16" fill="none" stroke="#2D303B" stroke-width="2"/>
  
  <g transform="translate(80, 90)">
    <rect width="180" height="34" rx="17" fill="#252834"/>
    <text x="32" y="22" font-family="sans-serif" font-size="12" font-weight="bold" fill="#38BDF8">${badgeText.toUpperCase()}</text>
  </g>

  <text x="80" y="240" font-family="sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="2">
    ${headline}
  </text>
  <text x="80" y="300" font-family="sans-serif" font-size="22" font-weight="400" fill="#9CA3AF">
    ${subtitle}
  </text>
</svg>`;
  };

  const handleDownloadSvg = () => {
    const markup = generateSvgMarkup();
    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveToCloud = async () => {
    if (!token) {
      alert("Please sign in to save your artwork to your personal library.");
      return;
    }

    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          width: dimensions.width,
          height: dimensions.height,
          theme: paletteMood,
          headline,
          subtitle,
          badgeText,
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const dynamicApiUrl = `http://localhost:5000/api/v1/render/og?title=${encodeURIComponent(headline)}&subtitle=${encodeURIComponent(subtitle)}&theme=${paletteMood}&badge=${encodeURIComponent(badgeText)}`;

  const copyApiSnippet = () => {
    navigator.clipboard.writeText(
      `<meta property="og:image" content="${dynamicApiUrl}" />`,
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAF9F6] dark:bg-[#0B0D12] text-gray-900 dark:text-gray-100 overflow-hidden select-none transition-colors">
      {/* 1. TOP STUDIO WORKBENCH BAR */}
      <header className="h-14 border-b border-gray-200 dark:border-[#1E212A] bg-white dark:bg-[#12141A] px-4 flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1B1E26] transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <BrandLogo size="sm" showTagline={false} />

          <span className="text-gray-300 dark:text-gray-700">|</span>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#1B1E26] focus:bg-gray-100 dark:focus:bg-[#1B1E26] focus:outline-none transition-colors max-w-xs"
          />

          {/* Canvas Dimension Selector */}
          <select
            value={dimensions.label}
            onChange={(e) => {
              const selected = presetSizes.find(
                (s) => s.label === e.target.value,
              );
              if (selected) setDimensions(selected);
            }}
            className="bg-gray-100 dark:bg-[#181B22] border border-gray-200 dark:border-[#262A35] text-xs text-gray-700 dark:text-gray-300 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            {presetSizes.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Center Viewport Zoom */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-gray-400 w-12 text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1.5 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveToCloud}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#262A35] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1B1E26] flex items-center space-x-1.5 transition-colors"
          >
            {savedSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{savedSuccess ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={copyApiSnippet}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#262A35] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1B1E26] flex items-center space-x-1.5 transition-colors"
          >
            {copiedCode ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedCode ? "Copied" : "Embed URL"}</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="px-4 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold text-xs shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SVG</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Inspector Drawer */}
        <aside className="w-72 bg-white dark:bg-[#12141A] border-r border-gray-200 dark:border-[#1E212A] flex flex-col z-10">
          <div className="flex border-b border-gray-200 dark:border-[#1E212A] bg-gray-50 dark:bg-[#0E1015]">
            {[
              { id: "palette", label: "Color Mood", icon: Palette },
              { id: "typography", label: "Typography", icon: Type },
              { id: "tags", label: "Tags", icon: Tag },
              { id: "export", label: "Embed", icon: Code },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 text-xs font-semibold flex flex-col items-center space-y-1 transition-colors ${
                    activeTab === tab.id
                      ? "text-sky-600 dark:text-sky-400 border-b-2 border-sky-500 bg-white dark:bg-[#15171F]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 space-y-5 flex-1 overflow-y-auto">
            {activeTab === "palette" && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tactile Palettes
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(palettes) as Array<keyof typeof palettes>).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPaletteMood(p)}
                        className={`p-3 rounded-xl border text-left text-xs capitalize transition-all ${
                          paletteMood === p
                            ? "border-sky-500 bg-sky-50 dark:bg-[#181C26] text-gray-900 dark:text-white font-bold ring-1 ring-sky-500"
                            : "border-gray-200 dark:border-[#222530] bg-white dark:bg-[#15171E] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full mb-2"
                          style={{ backgroundColor: palettes[p].accent }}
                        />
                        <span>{p}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {activeTab === "typography" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Headline Text
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#161820] border border-gray-200 dark:border-[#252834] rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Subtitle / Est.
                  </label>
                  <textarea
                    rows={3}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#161820] border border-gray-200 dark:border-[#252834] rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Brand Badge
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#161820] border border-gray-200 dark:border-[#252834] rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "tags" && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stamp Decorative Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleTag(item)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                        selectedTags.includes(item)
                          ? "bg-sky-500/10 border border-sky-500/40 text-sky-600 dark:text-sky-400 font-bold"
                          : "bg-gray-100 dark:bg-[#181B22] border border-gray-200 dark:border-[#242733] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "export" && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dynamic OpenGraph URL
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Embed this URL directly into your HTML headers or React
                  OpenGraph cards:
                </p>
                <div className="bg-gray-100 dark:bg-[#0E1015] border border-gray-200 dark:border-[#222530] rounded-lg p-2.5 font-mono text-[11px] text-gray-700 dark:text-gray-300 break-all select-all">
                  {dynamicApiUrl}
                </div>
                <button
                  onClick={copyApiSnippet}
                  className="w-full py-2 rounded-lg bg-gray-100 dark:bg-[#1C1F28] hover:bg-gray-200 dark:hover:bg-[#232733] text-xs font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-[#282C3A] flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Meta Tag</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Center Canvas Viewport */}
        <main className="flex-1 overflow-auto p-8 flex items-center justify-center canvas-grid-pattern relative bg-gray-100 dark:bg-[#0B0D12]">
          <div
            style={{
              width: `${dimensions.width * 0.65}px`,
              height: `${dimensions.height * 0.65}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
            className={`rounded-xl ${currentMood.bg} border ${currentMood.border} p-8 sm:p-12 relative shadow-lg flex flex-col justify-between transition-all duration-300 overflow-hidden shrink-0`}
          >
            {/* Top Badge */}
            <div className="relative z-10">
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold tracking-wider ${currentMood.tagColor}`}
              >
                ● {badgeText.toUpperCase()}
              </span>
            </div>

            {/* Headline and Subtitle */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {headline}
              </h2>
              <p className="text-xs sm:text-sm opacity-80 max-w-lg font-normal">
                {subtitle}
              </p>
            </div>

            {/* Bottom Meta & Tags */}
            <div className="relative z-10 pt-4 border-t border-current border-opacity-15 flex items-center justify-between text-xs opacity-75 font-mono">
              <div className="flex items-center space-x-1.5">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-black/30 text-gray-200 text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] tracking-widest uppercase">
                ORIGINAL VECTOR ASSET
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
