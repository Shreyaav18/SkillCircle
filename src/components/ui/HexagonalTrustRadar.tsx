'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HexagonalTrustRadarProps {
  trustScore: {
    quality: number;
    speed: number;
    barterHistory: number;
    overall: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { width: 200, height: 200, labelSize: 'text-xs' },
  md: { width: 280, height: 280, labelSize: 'text-sm' },
  lg: { width: 360, height: 360, labelSize: 'text-base' }
};

export const HexagonalTrustRadar: React.FC<HexagonalTrustRadarProps> = ({
  trustScore,
  size = 'md',
  showLabels = true,
  className = ''
}) => {
  const dimensions = sizeClasses[size];
  const center = dimensions.width / 2;
  const radius = dimensions.width * 0.35;

  // Calculate hexagon vertices
  const getHexagonPoints = (radius: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push({ x, y });
    }
    return points;
  };

  // Calculate data point positions
  const getDataPoint = (value: number, index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
      value
    };
  };

  const hexagonPoints = getHexagonPoints(radius);
  const qualityPoint = getDataPoint(trustScore.quality, 0);
  const speedPoint = getDataPoint(trustScore.speed, 1);
  const barterPoint = getDataPoint(trustScore.barterHistory, 2);

  // Labels for each dimension
  const labels = [
    { x: center, y: center - radius - 20, text: 'Quality' },
    { x: center + radius + 20, y: center, text: 'Speed' },
    { x: center, y: center + radius + 20, text: 'Barter' }
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="drop-shadow-sm"
      >
        {/* Background hexagon */}
        <polygon
          points={hexagonPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level) => {
          const levelRadius = radius * level;
          const points = getHexagonPoints(levelRadius);
          return (
            <polygon
              key={level}
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={0.1}
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={[
            `${qualityPoint.x},${qualityPoint.y}`,
            `${speedPoint.x},${speedPoint.y}`,
            `${barterPoint.x},${barterPoint.y}`
          ].join(' ')}
          fill="url(#trustGradient)"
          stroke="url(#trustStroke)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Data points */}
        <motion.circle
          cx={qualityPoint.x}
          cy={qualityPoint.y}
          r="6"
          fill="currentColor"
          className="text-action"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />
        <motion.circle
          cx={speedPoint.x}
          cy={speedPoint.y}
          r="6"
          fill="currentColor"
          className="text-barter"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />
        <motion.circle
          cx={barterPoint.x}
          cy={barterPoint.y}
          r="6"
          fill="currentColor"
          className="text-text/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />

        {/* Labels */}
        {showLabels && labels.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`font-medium ${dimensions.labelSize} fill-current`}
          >
            {label.text}
          </text>
        ))}

        {/* Value labels */}
        {showLabels && (
          <>
            <text
              x={qualityPoint.x}
              y={qualityPoint.y - 15}
              textAnchor="middle"
              className={`${dimensions.labelSize} fill-current font-semibold text-action`}
            >
              {trustScore.quality}
            </text>
            <text
              x={speedPoint.x + 15}
              y={speedPoint.y}
              textAnchor="start"
              className={`${dimensions.labelSize} fill-current font-semibold text-barter`}
            >
              {trustScore.speed}
            </text>
            <text
              x={barterPoint.x}
              y={barterPoint.y + 15}
              textAnchor="middle"
              className={`${dimensions.labelSize} fill-current font-semibold text-text/50`}
            >
              {trustScore.barterHistory}
            </text>
          </>
        )}

        {/* Center text */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-heading font-bold fill-current"
        >
          {trustScore.overall}
        </text>
        <text
          x={center}
          y={center + 25}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`${dimensions.labelSize} fill-current opacity-70`}
        >
          Trust Score
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC9B9B" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#C0E1D2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2D3436" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trustStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC9B9B" />
            <stop offset="50%" stopColor="#C0E1D2" />
            <stop offset="100%" stopColor="#2D3436" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};