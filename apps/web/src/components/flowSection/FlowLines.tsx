type Props = {
  positions: number[];
};

export default function FlowLines({ positions }: Props) {
  const phoneCenterX = 377;
  const phoneCenterY = 332;

  const paths = [
    `M${positions[0] + 32} 0
      C${positions[0] + 32} 120
      180 205
      ${phoneCenterX - 10} ${phoneCenterY}`,

    `M${positions[1] + 32} 0
      C${positions[1] + 32} 135
      235 215
      ${phoneCenterX - 5} ${phoneCenterY}`,

    `M${positions[2] + 32} 0
      C${positions[2] + 32} 150
      345 235
      ${phoneCenterX} ${phoneCenterY}`,

    `M${positions[3] + 32} 0
      C${positions[3] + 32} 150
      410 235
      ${phoneCenterX} ${phoneCenterY}`,

    `M${positions[4] + 32} 0
      C${positions[4] + 32} 135
      520 215
      ${phoneCenterX + 5} ${phoneCenterY}`,

    `M${positions[5] + 32} 0
      C${positions[5] + 32} 110
      620 205
      ${phoneCenterX + 10} ${phoneCenterY}`,
  ];

  return (
    <svg
      viewBox="0 0 754 340"
      className="w-full h-[240px]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8e5d7" />
          <stop offset="100%" stopColor="#eef7ef" />
        </linearGradient>

        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />

          <stop offset="30%" stopColor="#8ff7b7" />

          <stop offset="50%" stopColor="#53df88" />

          <stop offset="70%" stopColor="var(--primary)" />

          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((d, index) => (
        <g key={index}>
          <path
            d={d}
            fill="none"
            stroke="url(#tubeGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d={d}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="tube-flow"
            filter="url(#glow)"
          />
        </g>
      ))}
    </svg>
  );
}
