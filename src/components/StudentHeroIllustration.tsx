import React from 'react';

export const StudentHeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Soft Glow & Geometry */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#F2B544]/25 to-[#EAF0F7] blur-2xl -z-10" />

      {/* Main SVG Vector Graphic */}
      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[500px] h-auto drop-shadow-md"
      >
        {/* Background Golden Halo / Sun disk */}
        <circle cx="270" cy="220" r="160" fill="#F8E5BD" fillOpacity="0.65" />
        <circle cx="270" cy="220" r="130" fill="#F5D591" fillOpacity="0.4" />

        {/* Winding Career Pathway leading into the horizon behind student */}
        <path
          d="M 120 400 C 180 340, 240 310, 310 240 C 370 180, 420 170, 470 150"
          stroke="#FFFFFF"
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 140 395 C 190 345, 250 315, 315 245 C 375 185, 415 175, 460 155"
          stroke="#F2B544"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
          fill="none"
        />

        {/* Paper Plane taking flight to career */}
        <g transform="translate(460, 130) rotate(-15)">
          <polygon points="0,0 28,-10 12,18" fill="#F2B544" />
          <polygon points="28,-10 12,18 14,5" fill="#DF9F27" />
        </g>

        {/* Books Stack on Left */}
        <g transform="translate(90, 310)">
          {/* Bottom Book (Navy) */}
          <rect x="0" y="45" width="80" height="16" rx="3" fill="#14264A" />
          <rect x="10" y="48" width="65" height="10" fill="#F8F5EE" />
          {/* Middle Book (Gold) */}
          <rect x="5" y="27" width="70" height="16" rx="3" fill="#F2B544" />
          <rect x="15" y="30" width="55" height="10" fill="#FFFFFF" />
          {/* Top Book (Teal/Slate) */}
          <rect x="12" y="10" width="60" height="15" rx="3" fill="#2E4A7D" />
          {/* Coffee Mug beside books */}
          <rect x="75" y="35" width="22" height="26" rx="5" fill="#FFFFFF" stroke="#14264A" strokeWidth="2.5" />
          <path d="M 97 42 C 103 42, 103 52, 97 52" stroke="#14264A" strokeWidth="2.5" fill="none" />
          <path d="M 82 28 Q 85 24 82 20" stroke="#F2B544" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 88 28 Q 91 24 88 20" stroke="#F2B544" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Floating Mortarboard / Graduation Cap above */}
        <g transform="translate(360, 75) rotate(12)">
          <polygon points="40,5 5,22 40,38 75,22" fill="#14264A" />
          <path d="M 22 26 Q 40 33 58 26 L 58 32 Q 40 39 22 32 Z" fill="#0B1B36" />
          <circle cx="40" cy="21" r="2.5" fill="#F2B544" />
          <path d="M 40 21 C 30 21, 15 28, 15 38 L 15 48" stroke="#14264A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="15" cy="50" rx="2.5" ry="4" fill="#14264A" />
        </g>

        {/* Student Character sitting cross-legged with laptop */}
        <g id="StudentCharacter">
          {/* Shadow beneath student */}
          <ellipse cx="270" cy="405" rx="140" ry="18" fill="#14264A" fillOpacity="0.12" />

          {/* Legs sitting cross-legged */}
          {/* Left leg folded */}
          <path
            d="M 190 350 C 180 375, 210 395, 270 395 C 290 395, 310 385, 320 375 L 290 345 Z"
            fill="#1E386D"
          />
          {/* Right leg folded */}
          <path
            d="M 350 350 C 360 375, 330 395, 270 395 C 250 395, 230 385, 220 375 L 250 345 Z"
            fill="#14264A"
          />
          {/* Sneakers / Shoes */}
          <ellipse cx="180" cy="385" rx="16" ry="8" fill="#FFFFFF" stroke="#14264A" strokeWidth="2" />
          <ellipse cx="360" cy="385" rx="16" ry="8" fill="#FFFFFF" stroke="#14264A" strokeWidth="2" />

          {/* Torso / Dark Navy Hoodie */}
          <path
            d="M 225 250 C 220 280, 220 330, 225 355 L 315 355 C 320 330, 320 280, 315 250 C 300 238, 240 238, 225 250 Z"
            fill="#14264A"
          />

          {/* Hoodie strings / pocket */}
          <path d="M 255 240 L 255 275" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 285 240 L 285 275" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 245 320 Q 270 330 295 320 L 290 345 Q 270 350 250 345 Z" fill="#0B1B36" />

          {/* Shoulders & Arms typing on laptop */}
          {/* Left arm */}
          <path
            d="M 230 252 C 210 270, 205 295, 240 315 L 255 305 C 235 290, 235 275, 245 260 Z"
            fill="#1E386D"
          />
          {/* Right arm */}
          <path
            d="M 310 252 C 330 270, 335 295, 300 315 L 285 305 C 305 290, 305 275, 295 260 Z"
            fill="#14264A"
          />

          {/* Hands */}
          <ellipse cx="255" cy="310" rx="8" ry="6" fill="#F4BA8E" />
          <ellipse cx="285" cy="310" rx="8" ry="6" fill="#F4BA8E" />

          {/* Modern Laptop on Lap */}
          {/* Screen opened angled back */}
          <polygon points="235,310 305,310 312,270 242,270" fill="#E2E8F0" stroke="#14264A" strokeWidth="2.5" />
          <polygon points="240,306 300,306 306,274 246,274" fill="#0B1B36" />
          {/* Glowing screen content / RAAH letter */}
          <text x="270" y="294" fill="#F2B544" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            RAAH
          </text>
          {/* Laptop keyboard base */}
          <polygon points="228,312 312,312 322,324 218,324" fill="#CBD5E1" stroke="#14264A" strokeWidth="2" />
          <rect x="255" y="316" width="30" height="5" rx="1.5" fill="#94A3B8" />

          {/* Neck */}
          <rect x="262" y="215" width="16" height="24" fill="#E9A87C" rx="4" />

          {/* Head & Face */}
          <ellipse cx="270" cy="195" rx="26" ry="30" fill="#F4BA8E" />

          {/* Hair (Modern clean CSE student style) */}
          <path
            d="M 244 190 C 242 165, 255 155, 270 155 C 288 155, 298 165, 296 190 C 290 180, 280 178, 270 178 C 258 178, 250 182, 244 190 Z"
            fill="#14264A"
          />
          {/* Sideburns and ears */}
          <ellipse cx="243" cy="195" rx="4.5" ry="7" fill="#F4BA8E" />
          <ellipse cx="297" cy="195" rx="4.5" ry="7" fill="#F4BA8E" />

          {/* Modern Glasses */}
          <rect x="251" y="190" width="15" height="12" rx="3" fill="none" stroke="#14264A" strokeWidth="2" />
          <rect x="274" y="190" width="15" height="12" rx="3" fill="none" stroke="#14264A" strokeWidth="2" />
          <line x1="266" y1="195" x2="274" y2="195" stroke="#14264A" strokeWidth="2" />

          {/* Friendly Smile */}
          <path d="M 264 212 Q 270 217 276 212" stroke="#14264A" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Floating Badges as seen in reference image ("Learn", "Build", "Grow") */}
        {/* Learn Pill Badge */}
        <g transform="translate(370, 190)">
          <rect x="0" y="0" width="85" height="32" rx="16" fill="#FFFFFF" stroke="#EAF0F7" strokeWidth="2" />
          <circle cx="16" cy="16" r="6" fill="#F2B544" />
          <text x="32" y="21" fill="#14264A" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            Learn
          </text>
        </g>

        {/* Build Pill Badge */}
        <g transform="translate(385, 232)">
          <rect x="0" y="0" width="85" height="32" rx="16" fill="#14264A" />
          <circle cx="16" cy="16" r="6" fill="#F2B544" />
          <text x="32" y="21" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            Build
          </text>
        </g>

        {/* Grow Pill Badge */}
        <g transform="translate(370, 274)">
          <rect x="0" y="0" width="85" height="32" rx="16" fill="#FFFFFF" stroke="#EAF0F7" strokeWidth="2" />
          <circle cx="16" cy="16" r="6" fill="#10B981" />
          <text x="32" y="21" fill="#14264A" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
            Grow
          </text>
        </g>

        {/* Left Floating Stat Badge: "72% Job Ready" */}
        <g transform="translate(75, 180)">
          <rect x="0" y="0" width="110" height="42" rx="14" fill="#FFFFFF" stroke="#EAF0F7" strokeWidth="2" />
          <circle cx="22" cy="21" r="12" fill="#EAF0F7" />
          <path d="M 18 21 L 21 24 L 26 18" stroke="#14264A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <text x="42" y="19" fill="#14264A" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            72% Score
          </text>
          <text x="42" y="32" fill="#6B7280" fontSize="10" fontFamily="sans-serif">
            Job Ready
          </text>
        </g>
      </svg>
    </div>
  );
};
