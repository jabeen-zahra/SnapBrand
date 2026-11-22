import { Router, Request, Response } from 'express';

const router = Router();

// Theme definitions for SVG synthesis
const THEME_GRADIENTS: Record<string, { start: string; mid: string; end: string; accent: string }> = {
  cyber: { start: '#090a12', mid: '#12182d', end: '#062947', accent: '#00f2fe' },
  sunset: { start: '#120b0d', mid: '#2c0e1b', end: '#401815', accent: '#ff7a18' },
  obsidian: { start: '#090a0f', mid: '#14151f', end: '#1a1c2b', accent: '#ffffff' },
  emerald: { start: '#08120e', mid: '#0f291e', end: '#063826', accent: '#00e676' },
  minimal: { start: '#111216', mid: '#171922', end: '#1d202e', accent: '#9ca3af' }
};

router.get('/og', (req: Request, res: Response) => {
  const title = (req.query.title as string) || 'SnapBrand Dynamic Engine';
  const subtitle = (req.query.subtitle as string) || 'High-performance vector rendering microservice';
  const themeKey = (req.query.theme as string) || 'cyber';
  const badge = (req.query.badge as string) || 'STUDIO GRADE';
  const width = parseInt((req.query.width as string) || '1200', 10);
  const height = parseInt((req.query.height as string) || '630', 10);

  const theme = THEME_GRADIENTS[themeKey] || THEME_GRADIENTS.cyber;

  // Generative Vector SVG Synthesis with high-impact visual design
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.start}"/>
        <stop offset="50%" stop-color="${theme.mid}"/>
        <stop offset="100%" stop-color="${theme.end}"/>
      </linearGradient>
      <radialGradient id="meshGlow" cx="0.8" cy="0.2" r="0.7">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#ffffff" opacity="0.08"/>
      </pattern>
    </defs>
    
    <!-- Base Layer -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#dotGrid)"/>
    <rect width="${width}" height="${height}" fill="url(#meshGlow)"/>

    <!-- Decorative Edge Lighting -->
    <rect x="0" y="0" width="${width}" height="3" fill="${theme.accent}" opacity="0.8"/>

    <!-- Branded Pill Badge -->
    <g transform="translate(80, 80)">
      <rect width="180" height="36" rx="18" fill="#141824" stroke="${theme.accent}" stroke-width="1.5" opacity="0.9"/>
      <circle cx="22" cy="18" r="5" fill="${theme.accent}"/>
      <text x="38" y="23" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${theme.accent}" letter-spacing="1.5">${badge.toUpperCase()}</text>
    </g>

    <!-- Headline (Title) -->
    <text x="80" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">
      ${escapeXml(title)}
    </text>

    <!-- Subtitle -->
    <text x="80" y="280" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="24" font-weight="400" fill="#9ca3af">
      ${escapeXml(subtitle)}
    </text>

    <!-- Bottom Metadata Bar -->
    <g transform="translate(80, ${height - 90})">
      <line x1="0" y1="0" x2="${width - 160}" y2="0" stroke="#252a3f" stroke-width="1.5"/>
      <text x="0" y="45" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" fill="#6b7280" letter-spacing="2">
        POWERED BY SNAPBRAND ENGINE  |  LATENCY: 12ms  |  AWS MULTI-AZ
      </text>
    </g>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.status(200).send(svg);
});

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default router;
