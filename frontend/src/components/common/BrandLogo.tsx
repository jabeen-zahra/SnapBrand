import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showDomain?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  showDomain = false,
  className = '' 
}) => {
  const sizeMap = {
    sm: { icon: 26, text: 'text-base', spacing: 'space-x-2' },
    md: { icon: 34, text: 'text-xl', spacing: 'space-x-2.5' },
    lg: { icon: 42, text: 'text-2xl', spacing: 'space-x-3' },
    xl: { icon: 54, text: 'text-3xl', spacing: 'space-x-3.5' }
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${current.spacing} select-none cursor-pointer ${className}`}>
      {/* Official Snap Cube Geometric Mark from User Sheet */}
      <svg 
        width={current.icon} 
        height={current.icon} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient id="cubeTop" x1="16" y1="12" x2="48" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="100%" stop-color="#0284C7"/>
          </linearGradient>
          <linearGradient id="cubeRight" x1="32" y1="30" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#8B5CF6"/>
            <stop offset="100%" stop-color="#6D28D9"/>
          </linearGradient>
          <linearGradient id="cubeLeft" x1="12" y1="30" x2="32" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#1E293B"/>
          </linearGradient>
          <linearGradient id="innerTop" x1="24" y1="21" x2="40" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#E0F2FE"/>
            <stop offset="100%" stop-color="#7DD3FC"/>
          </linearGradient>
        </defs>

        {/* Outer Isometric Cube */}
        <path d="M32 8L54 20L32 32L10 20L32 8Z" fill="url(#cubeTop)" stroke="#0284C7" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M10 20L32 32V56L10 44V20Z" fill="url(#cubeLeft)" stroke="#475569" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M32 32L54 20V44L32 56V32Z" fill="url(#cubeRight)" stroke="#6D28D9" stroke-width="1.5" stroke-linejoin="round"/>

        {/* Inner Snap Facet */}
        <path d="M32 20L43 26L32 32L21 26L32 20Z" fill="url(#innerTop)" opacity="0.95"/>
        <path d="M21 26L32 32V42L21 36V26Z" fill="#0EA5E9" opacity="0.85"/>
        <path d="M32 32L43 26V36L32 42V32Z" fill="#A855F7" opacity="0.9"/>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-gray-900 dark:text-white ${current.text} leading-none`}>
          Snap<span className="text-sky-500 dark:text-sky-400">Brand</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-gray-400 tracking-wide mt-0.5">
            Design Studio
          </span>
        )}
      </div>
    </div>
  );
};
