interface TodoIconProps {
  className?: string
  size?: number
}

export function TodoIcon({ className = "", size = 28 }: TodoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagon with rounded corners */}
      <path
        d="M30 20L50 10L70 20L80 40L70 60L50 70L30 60L20 40Z"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeLinejoin="round"
        rx="4"
      />
      
      {/* Blue pencil inside */}
      <g transform="translate(35, 25)">
        {/* Pencil body */}
        <rect
          x="8"
          y="15"
          width="6"
          height="25"
          rx="3"
          fill="#3b82f6"
        />
        
        {/* Pencil tip */}
        <path
          d="M8 15L11 8L14 15Z"
          fill="#1e40af"
        />
        
        {/* Pencil eraser */}
        <rect
          x="9"
          y="40"
          width="4"
          height="6"
          rx="2"
          fill="#ef4444"
        />
        
        {/* Pencil ferrule (metal band) */}
        <rect
          x="8.5"
          y="37"
          width="5"
          height="3"
          rx="0.5"
          fill="#6b7280"
        />
      </g>
    </svg>
  )
}