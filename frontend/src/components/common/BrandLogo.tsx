import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDomain?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showDomain = true,
  className = '' 
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', spacing: 'space-x-2' },
    md: { icon: 32, text: 'text-xl', spacing: 'space-x-2.5' },
    lg: { icon: 40, text: 'text-2xl', spacing: 'space-x-3' },
    xl: { icon: 52, text: 'text-3xl', spacing: 'space-x-3.5' }
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${current.spacing} select-none cursor-pointer ${className}`}>
      {/* Signature SnapBrand Vector Glyph from Official Sheet (Lightning Bolt with Gradient Energy) */}
      <svg 
        width={current.icon} 
        height={current.icon} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient id="boltGrad" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#00F2FE"/>
            <stop offset="50%" stop-color="#3B82F6"/>
            <stop offset="100%" stop-color="#FF5722"/>
          </linearGradient>
          <filter id="boltGlow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Outer faceted shield ring */}
        <rect x="4" y="4" width="56" height="56" rx="16" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5"/>

        {/* Signature Lightning Bolt */}
        <path 
          d="M36 6L14 34H30L26 58L50 28H32L36 6Z" 
          fill="url(#boltGrad)" 
          stroke="#FFFFFF" 
          strokeWidth="1.75" 
          strokeLinejoin="round"
          filter="url(#boltGlow)"
        />
      </svg>

      {/* Typography: snapbrand.io */}
      <span className={`font-extrabold tracking-tight ${current.text} transition-colors`}>
        snap<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-500">brand</span>
        {showDomain && <span className="font-normal opacity-50 text-[0.85em]">.io</span>}
      </span>
    </div>
  );
};
