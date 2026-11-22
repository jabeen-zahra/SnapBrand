import React, { useState } from "react";
import {
  User,
  Sun,
  Moon,
  Key,
  HardDrive,
  Check,
  Copy,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useTheme } from "../../lib/ThemeContext";

export const SettingsView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<
    "profile" | "appearance" | "api" | "storage"
  >("profile");
  const [fullName, setFullName] = useState(user?.fullName || "Creator");
  const [copiedKey, setCopiedKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ fullName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("sb_live_4k_vector_engine_98127391");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="flex-1 bg-white dark:bg-[#08090E] text-gray-900 dark:text-gray-100 p-6 sm:p-8 overflow-y-auto space-y-8 transition-colors">
      <div className="pb-6 border-b border-gray-200 dark:border-[#181F33]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Account &amp; Studio Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your profile, studio appearance, API keys, and cloud storage
          allocation.
        </p>

        {/* Tab Switcher */}
        <div className="flex space-x-6 mt-6 border-b border-gray-200 dark:border-[#181F33]">
          {[
            { id: "profile", label: "Profile & Account", icon: User },
            { id: "appearance", label: "Theme & Appearance", icon: Sun },
            { id: "api", label: "Dynamic API Keys", icon: Key },
            { id: "storage", label: "Cloud Storage", icon: HardDrive },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-semibold flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="max-w-xl space-y-6">
          <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
            <h3 className="text-sm font-bold">Personal Information</h3>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white dark:bg-[#141826] border border-gray-200 dark:border-[#222A40] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || "creator@snapbrand.io"}
                className="w-full bg-gray-100 dark:bg-[#111422] border border-gray-200 dark:border-[#1E2538] rounded-xl px-3.5 py-2.5 text-xs text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Membership Plan
              </label>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{user?.plan || "Pro Creator Plan"}</span>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{saved ? "Profile Updated!" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Theme & Appearance */}
      {activeTab === "appearance" && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
            <h3 className="text-sm font-bold">Studio Color Scheme</h3>
            <p className="text-xs text-gray-500">
              Select your preferred visual environment for the creative canvas
              and dashboard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Dark Theme Card */}
              <div
                onClick={() => setTheme("dark")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  theme === "dark"
                    ? "border-cyan-500 bg-[#101424] shadow-md ring-2 ring-cyan-500/30"
                    : "border-gray-200 dark:border-[#1E2538] bg-white dark:bg-[#0A0D16]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-cyan-400" />
                    <span>Dark Obsidian</span>
                  </span>
                  {theme === "dark" && (
                    <Check className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  High-contrast dark mode engineered for focused visual
                  creation.
                </p>
              </div>

              {/* Light Theme Card */}
              <div
                onClick={() => setTheme("light")}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  theme === "light"
                    ? "border-cyan-500 bg-cyan-50/40 shadow-md ring-2 ring-cyan-500/30"
                    : "border-gray-200 dark:border-[#1E2538] bg-white dark:bg-[#0A0D16]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Pure Light</span>
                  </span>
                  {theme === "light" && (
                    <Check className="w-4 h-4 text-cyan-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Clean, crisp daylight palette ideal for daytime editing and
                  print review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API Keys */}
      {activeTab === "api" && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
            <h3 className="text-sm font-bold">
              Dynamic OpenGraph API Credentials
            </h3>
            <p className="text-xs text-gray-500">
              Use this key to authenticate headless vector asset generation in
              your React/Next.js websites or blog templates.
            </p>
            <div className="flex items-center space-x-3 bg-white dark:bg-[#08090E] p-3 rounded-xl border border-gray-200 dark:border-[#1C2337]">
              <span className="font-mono text-xs text-gray-700 dark:text-gray-300 flex-1 truncate">
                sb_live_4k_vector_engine_98127391
              </span>
              <button
                onClick={copyApiKey}
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#181D2E] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center space-x-1"
              >
                {copiedKey ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Cloud Storage */}
      {activeTab === "storage" && (
        <div className="max-w-2xl space-y-6">
          <div className="rounded-2xl bg-gray-50 dark:bg-[#0E121E] border border-gray-200 dark:border-[#1C2337] p-6 space-y-4">
            <h3 className="text-sm font-bold">
              Cloud Asset Storage Allocation
            </h3>
            <p className="text-xs text-gray-500">
              Includes saved 4K vector masters, custom font uploads, and color
              palettes.
            </p>
            <div className="w-full bg-gray-200 dark:bg-[#181D2E] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-orange-500 h-2.5 rounded-full"
                style={{ width: "28%" }}
              />
            </div>
            <p className="text-xs font-mono text-gray-500">
              280 MB of 1,000 MB Used (28%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
