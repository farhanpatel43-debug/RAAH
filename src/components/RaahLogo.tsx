import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface RaahLogoProps {
  variant?: 'full' | 'horizontal' | 'icon-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  dark?: boolean;
}

export const RaahLogo: React.FC<RaahLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  onClick,
  dark: explicitDark,
}) => {
  const { theme } = useTheme();
  const isDark = explicitDark !== undefined ? explicitDark : theme === 'dark';

  // Dimensions based on size
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 52,
    xl: 72,
  };

  const currentIconSize = iconSizes[size];

  // Colors from the brand identity
  const navyColor = isDark ? '#F1F5F9' : '#14264A';
  const iconNavy = isDark ? '#264275' : '#14264A';

  const renderIcon = () => (
    <svg
      width={currentIconSize}
      height={currentIconSize}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm select-none"
    >
      {/* Golden Sun / Horizon in the upper bowl */}
      <circle cx="88" cy="62" r="32" fill="#F7C66B" />

      {/* Main R Body Shape */}
      {/* Left vertical stem with straight edge */}
      <path
        d="M 40 46 L 68 46 L 68 132 L 40 132 Z"
        fill={isDark ? '#1C3563' : '#14264A'}
      />

      {/* Top right outer bowl arc */}
      <path
        d="M 68 46 Q 120 46 120 78 Q 120 102 88 102 L 68 102 Z"
        fill={isDark ? '#1C3563' : '#14264A'}
      />

      {/* Bottom right leg of the R */}
      <path
        d="M 78 94 L 114 132 L 138 132 L 96 88 Z"
        fill={isDark ? '#1C3563' : '#14264A'}
      />

      {/* Mortarboard / Graduation Cap on top of left stem */}
      <polygon
        points="54,16 26,30 54,42 82,30"
        fill={isDark ? '#0F1D38' : '#14264A'}
      />
      {/* Under cap band */}
      <path
        d="M 38 33 Q 54 39 70 33 L 70 38 Q 54 44 38 38 Z"
        fill={isDark ? '#08101F' : '#0B1B36'}
      />
      {/* Cap button */}
      <circle cx="54" cy="29" r="2.5" fill="#F2B544" />
      {/* Cap tassel */}
      <path
        d="M 54 29 C 46 29, 30 35, 30 45 L 30 54"
        stroke={isDark ? '#F2B544' : '#14264A'}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="30" cy="56" rx="2.8" ry="4.5" fill={isDark ? '#F2B544' : '#14264A'} />

      {/* The White Highway / Road curving gracefully into the distance */}
      <path
        d="M 46 104 C 54 78, 80 72, 108 68 C 122 66, 128 66, 134 65 C 126 72, 104 80, 84 84 C 62 88, 54 98, 54 116 Z"
        fill="#FFFFFF"
      />

      {/* Highway lane center markings */}
      <path
        d="M 58 102 C 68 86, 88 80, 116 71"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* Golden Paper Airplane soaring up-right into the sky */}
      <g transform="translate(122, 52) rotate(15)">
        <polygon
          points="0,0 24,-8 10,14"
          fill="#F2B544"
        />
        <polygon
          points="24,-8 10,14 11,4"
          fill="#DFA02B"
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {renderIcon()}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div 
        onClick={onClick} 
        className={`flex flex-col items-center text-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className={`p-3 rounded-2xl shadow-sm border mb-3 transition-colors ${
          isDark ? 'bg-[#0F1D38] border-[#1C2E52]' : 'bg-white border-[#EAF0F7]'
        }`}>
          {renderIcon()}
        </div>
        <div className="tracking-[0.2em] font-extrabold text-2xl font-sans" style={{ color: navyColor }}>
          RAAH
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-4 h-[1px] bg-[#F2B544]" />
          <span className={`text-[11px] tracking-wider uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Your Path to Career
          </span>
          <div className="w-4 h-[1px] bg-[#F2B544]" />
        </div>
      </div>
    );
  }

  // Horizontal variant (default for Navbar & Sidebar)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {renderIcon()}
      <div className="flex flex-col leading-tight">
        <span
          className="font-extrabold tracking-[0.14em] text-xl font-sans transition-colors"
          style={{ color: navyColor }}
        >
          RAAH
        </span>
        <span className={`text-[10px] tracking-wide font-medium flex items-center gap-1 transition-colors ${
          isDark ? 'text-gray-400' : 'text-[#6B7280]'
        }`}>
          <span className="w-2 h-[1px] bg-[#F2B544] inline-block" />
          Your Path to Career
          <span className="w-2 h-[1px] bg-[#F2B544] inline-block" />
        </span>
      </div>
    </div>
  );
};
