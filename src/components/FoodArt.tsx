import type { Category } from "@/lib/types";

const BG: Record<Category, [string, string]> = {
  non: ["#fdebc8", "#f3c77a"],
  qandolat: ["#fde4e1", "#f5b8b0"],
  samsa: ["#fbe9d2", "#eab27a"],
  sendvich: ["#e6f3dc", "#b9dd9b"],
  salat: ["#dff2e4", "#9fd4ae"],
  quti: ["#efe7d6", "#d8c7a0"],
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function FoodArt({ category, seed = "x", className = "" }: { category: Category; seed?: string; className?: string }) {
  const h = hash(seed);
  const [c1, c2] = BG[category] ?? BG.non;
  const rot = (h % 9) - 4;
  const gid = `g${h}${category}`;
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`${category} illustratsiyasi`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${gid}b`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f7c46a" />
          <stop offset="1" stopColor="#c27a28" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <circle cx={70 + (h % 40)} cy="60" r="46" fill="#fff" opacity="0.22" />
      <circle cx="340" cy={230 - (h % 30)} r="70" fill="#fff" opacity="0.16" />
      <ellipse cx="200" cy="248" rx="130" ry="18" fill="#000" opacity="0.12" />
      <g transform={`rotate(${rot} 200 160)`}>
        {category === "non" && (
          <g>
            <ellipse cx="200" cy="170" rx="120" ry="72" fill={`url(#${gid}b)`} />
            <path d="M130 135 L175 112 M170 150 L225 118 M215 165 L270 130" stroke="#8a4d12" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
            <ellipse cx="170" cy="140" rx="46" ry="14" fill="#fff" opacity="0.2" />
          </g>
        )}
        {category === "qandolat" && (
          <g>
            <path d="M80 190 C90 100 310 100 320 190 C290 170 270 175 250 190 C230 165 170 165 150 190 C130 175 110 170 80 190Z" fill={`url(#${gid}b)`} />
            <path d="M150 190 C160 130 240 130 250 190" stroke="#8a4d12" strokeWidth="6" fill="none" opacity="0.4" />
            <path d="M118 150 C150 115 250 115 282 150" stroke="#fff" strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
            <circle cx="200" cy="205" r="9" fill="#d94b5a" />
          </g>
        )}
        {category === "samsa" && (
          <g>
            <path d="M200 90 L310 230 L90 230 Z" fill={`url(#${gid}b)`} stroke="#b0661c" strokeWidth="6" strokeLinejoin="round" />
            <path d="M200 120 L270 215 L130 215 Z" fill="#fff" opacity="0.12" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ellipse key={i} cx={165 + (i % 3) * 36} cy={190 + Math.floor(i / 3) * 22 - (i % 3 === 1 ? 20 : 0)} rx="5" ry="3" fill="#fff6dc" transform={`rotate(${i * 30} ${165 + (i % 3) * 36} ${190})`} />
            ))}
          </g>
        )}
        {category === "sendvich" && (
          <g>
            <path d="M95 120 Q200 50 305 120 L305 140 L95 140Z" fill={`url(#${gid}b)`} />
            <path d="M85 148 Q110 134 135 148 T185 148 T235 148 T285 148 T315 148 L315 166 L85 166Z" fill="#4da34a" />
            <rect x="92" y="164" width="216" height="22" rx="10" fill="#d94b3c" />
            <rect x="88" y="184" width="224" height="20" rx="8" fill="#8a5a3a" />
            <path d="M95 204 L305 204 L300 226 Q200 240 100 226Z" fill={`url(#${gid}b)`} />
          </g>
        )}
        {category === "salat" && (
          <g>
            <path d="M85 170 H315 C315 235 270 255 200 255 C130 255 85 235 85 170Z" fill="#fff" stroke="#cfd8d1" strokeWidth="4" />
            {[[130, 150], [175, 138], [225, 140], [270, 152], [200, 118], [155, 165], [250, 168]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="34" ry="20" fill={i % 2 ? "#4da34a" : "#79c06f"} transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`} />
            ))}
            <circle cx="175" cy="150" r="13" fill="#d94b3c" />
            <circle cx="240" cy="140" r="11" fill="#d94b3c" />
            <circle cx="210" cy="165" r="9" fill="#f3d36a" />
          </g>
        )}
        {category === "quti" && (
          <g>
            <ellipse cx="160" cy="130" rx="46" ry="30" fill={`url(#${gid}b)`} />
            <ellipse cx="245" cy="122" rx="40" ry="26" fill="#d9923b" />
            <rect x="85" y="140" width="230" height="100" rx="14" fill="#c9a26b" />
            <rect x="85" y="140" width="230" height="26" rx="10" fill="#b58a52" />
            <rect x="188" y="140" width="24" height="100" fill="#3d9665" />
            <path d="M200 140 q-28 -28 -44 -8 q16 22 44 8 q28 14 44 -8 q-16 -20 -44 8" fill="#3d9665" />
          </g>
        )}
      </g>
    </svg>
  );
}
