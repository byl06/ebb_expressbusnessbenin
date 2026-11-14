import type { ReactNode } from 'react'

export type VisualVariant = 'villa' | 'apartment' | 'tower' | 'land' | 'office' | 'plan' | 'map'

const NAVY = '#10243A'
const NAVY2 = '#183D5B'
const GOLD = '#C7A66A'
const SKY = '#E4EBF2'
const SKY2 = '#D3DEE9'

function grid(x: number, y: number, cols: number, rows: number, w: number, h: number, gx: number, gy: number, fill: string, lit = 3) {
  const out: ReactNode[] = []
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      out.push(
        <rect key={`${r}-${c}`} x={x + c * gx} y={y + r * gy} width={w} height={h} rx={2}
          fill={(r * 3 + c * 5) % lit === 0 ? GOLD : fill} opacity={(r * 3 + c * 5) % lit === 0 ? 0.9 : 0.55} />,
      )
  return out
}

function Scene({ variant }: { variant: VisualVariant }) {
  switch (variant) {
    case 'villa':
      return (
        <>
          <circle cx="620" cy="130" r="46" fill={GOLD} opacity=".85" />
          <rect x="0" y="470" width="800" height="130" fill={NAVY2} />
          <rect x="120" y="300" width="360" height="170" fill="#FFFFFF" />
          <rect x="100" y="285" width="400" height="22" fill={NAVY} />
          <rect x="360" y="230" width="240" height="240" fill="#F5F7FA" />
          <rect x="340" y="214" width="280" height="22" fill={NAVY} />
          <rect x="150" y="335" width="150" height="95" fill={NAVY2} opacity=".85" />
          <rect x="150" y="335" width="150" height="95" fill="none" stroke={GOLD} strokeWidth="3" />
          <rect x="400" y="270" width="160" height="70" fill={NAVY2} opacity=".85" />
          <rect x="410" y="380" width="60" height="90" fill={NAVY} />
          <rect x="500" y="380" width="70" height="50" fill={NAVY2} opacity=".85" />
          <rect x="650" y="400" width="12" height="70" fill={NAVY} />
          <circle cx="656" cy="390" r="38" fill={NAVY2} />
          <circle cx="700" cy="420" r="28" fill={NAVY} opacity=".8" />
          <rect x="60" y="500" width="680" height="3" fill={GOLD} />
        </>
      )
    case 'apartment':
      return (
        <>
          <circle cx="170" cy="120" r="40" fill={GOLD} opacity=".85" />
          <rect x="0" y="480" width="800" height="120" fill={NAVY2} />
          <rect x="230" y="110" width="340" height="370" fill="#FFFFFF" />
          <rect x="214" y="96" width="372" height="20" fill={NAVY} />
          {grid(256, 140, 4, 6, 52, 40, 76, 54, NAVY2)}
          <rect x="370" y="430" width="60" height="50" fill={NAVY} />
          <rect x="120" y="260" width="110" height="220" fill="#F5F7FA" />
          <rect x="570" y="300" width="110" height="180" fill="#F5F7FA" />
          {grid(136, 280, 2, 4, 34, 28, 48, 50, NAVY2)}
          {grid(586, 320, 2, 3, 34, 28, 48, 50, NAVY2)}
          <rect x="60" y="500" width="680" height="3" fill={GOLD} />
        </>
      )
    case 'tower':
      return (
        <>
          <circle cx="640" cy="150" r="42" fill={GOLD} opacity=".85" />
          <rect x="0" y="480" width="800" height="120" fill={NAVY2} />
          <rect x="130" y="260" width="130" height="220" fill="#F5F7FA" />
          <rect x="540" y="230" width="140" height="250" fill="#F5F7FA" />
          <rect x="300" y="70" width="220" height="410" fill="#FFFFFF" />
          <rect x="300" y="70" width="220" height="14" fill={NAVY} />
          <rect x="300" y="70" width="6" height="410" fill={GOLD} />
          {grid(330, 108, 4, 8, 34, 26, 46, 44, NAVY2, 4)}
          {grid(148, 282, 3, 4, 26, 24, 38, 44, NAVY2)}
          {grid(560, 252, 3, 4, 28, 24, 40, 44, NAVY2)}
          <rect x="385" y="430" width="50" height="50" fill={NAVY} />
          <rect x="60" y="500" width="680" height="3" fill={GOLD} />
        </>
      )
    case 'land':
      return (
        <>
          <circle cx="600" cy="140" r="48" fill={GOLD} opacity=".85" />
          <path d="M0 400 Q 200 360 400 390 T 800 380 V600 H0Z" fill={NAVY2} opacity=".35" />
          <path d="M0 450 L800 450 V600 H0Z" fill={NAVY2} />
          <path d="M150 520 L640 520 L600 440 L190 440Z" fill="none" stroke={GOLD} strokeWidth="4" strokeDasharray="14 10" />
          {[[150, 520], [640, 520], [600, 440], [190, 440]].map(([x, y]) => (
            <rect key={`${x}${y}`} x={x - 8} y={y - 8} width="16" height="16" fill={GOLD} />
          ))}
          <rect x="90" y="360" width="10" height="90" fill={NAVY} />
          <circle cx="95" cy="350" r="34" fill={NAVY2} />
          <rect x="700" y="380" width="10" height="70" fill={NAVY} />
          <circle cx="705" cy="372" r="28" fill={NAVY2} />
        </>
      )
    case 'office':
      return (
        <>
          <rect x="0" y="0" width="800" height="600" fill={SKY2} />
          <rect x="70" y="90" width="300" height="420" rx="6" fill="#FFFFFF" />
          {grid(100, 120, 4, 7, 40, 30, 64, 52, NAVY2, 5)}
          <rect x="420" y="130" width="300" height="120" rx="10" fill="#FFFFFF" />
          <circle cx="480" cy="190" r="30" fill={NAVY2} />
          <rect x="530" y="168" width="150" height="12" rx="6" fill={NAVY} />
          <rect x="530" y="196" width="100" height="10" rx="5" fill={SKY2} />
          <rect x="420" y="280" width="300" height="120" rx="10" fill="#FFFFFF" />
          <circle cx="480" cy="340" r="30" fill={GOLD} />
          <rect x="530" y="318" width="150" height="12" rx="6" fill={NAVY} />
          <rect x="530" y="346" width="100" height="10" rx="5" fill={SKY2} />
          <rect x="420" y="430" width="300" height="80" rx="10" fill={NAVY} />
          <rect x="450" y="462" width="120" height="14" rx="7" fill={GOLD} />
        </>
      )
    case 'plan':
      return (
        <>
          <rect x="0" y="0" width="800" height="600" fill="#FFFFFF" />
          <g fill="none" stroke={NAVY} strokeWidth="6">
            <rect x="140" y="110" width="520" height="380" />
            <path d="M140 300 H380 M380 110 V300 M380 300 V490 M520 300 H660 M520 300 V490" />
          </g>
          <path d="M300 300 h50" stroke="#FFFFFF" strokeWidth="9" />
          <path d="M380 220 v40" stroke="#FFFFFF" strokeWidth="9" />
          <path d="M440 300 h40" stroke="#FFFFFF" strokeWidth="9" />
          <rect x="260" y="486" width="70" height="8" fill={GOLD} />
          <text x="230" y="215" fontSize="22" fill={NAVY2} fontFamily="Inter,sans-serif">Séjour</text>
          <text x="470" y="215" fontSize="22" fill={NAVY2} fontFamily="Inter,sans-serif">Chambre</text>
          <text x="200" y="405" fontSize="22" fill={NAVY2} fontFamily="Inter,sans-serif">Cuisine</text>
          <text x="420" y="405" fontSize="22" fill={NAVY2} fontFamily="Inter,sans-serif">Chambre</text>
          <text x="548" y="405" fontSize="22" fill={NAVY2} fontFamily="Inter,sans-serif">SdB</text>
        </>
      )
    case 'map':
      return (
        <>
          <rect x="0" y="0" width="800" height="600" fill={SKY} />
          <g stroke="#FFFFFF" strokeWidth="18" fill="none" strokeLinecap="round">
            <path d="M-20 420 C 200 360 360 380 820 250" />
            <path d="M250 -20 C 300 200 420 360 440 620" />
            <path d="M560 -20 C 540 140 640 260 820 330" strokeWidth="12" />
          </g>
          <g fill={NAVY2} opacity=".18">
            <rect x="80" y="90" width="120" height="80" rx="8" />
            <rect x="520" y="400" width="150" height="100" rx="8" />
            <rect x="90" y="460" width="110" height="80" rx="8" />
          </g>
          <circle cx="400" cy="300" r="64" fill={GOLD} opacity=".25" />
          <path d="M400 330 C 360 270 360 240 400 240 C 440 240 440 270 400 330Z" fill={NAVY} transform="translate(0 -10)" />
          <circle cx="400" cy="262" r="9" fill={GOLD} />
        </>
      )
  }
}

interface VisualProps {
  variant: VisualVariant
  className?: string
  label?: string
}

/**
 * Illustration vectorielle utilisée comme visuel provisoire.
 * Remplaçable par de vraies photographies (voir `photos` dans data/properties.ts).
 */
export function Visual({ variant, className = '', label }: VisualProps) {
  const bg = variant === 'office' || variant === 'plan' || variant === 'map' ? undefined : SKY
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ?? `Illustration : ${variant}`}
      className={className}
    >
      {bg && <rect width="800" height="600" fill={bg} />}
      <Scene variant={variant} />
    </svg>
  )
}
