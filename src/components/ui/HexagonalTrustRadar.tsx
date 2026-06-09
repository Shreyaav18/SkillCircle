'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface HexagonalTrustRadarProps {
  trustScore: {
    quality: number;
    speed: number;
    barterHistory: number;
    reliability: number;
    communication: number;
    cooperation: number;
    overall: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { width: 220, height: 220, labelOffset: 15, labelSize: 'text-[10px]', centerOffset: 12 },
  md: { width: 300, height: 300, labelOffset: 20, labelSize: 'text-xs', centerOffset: 16 },
  lg: { width: 380, height: 380, labelOffset: 24, labelSize: 'text-sm', centerOffset: 20 }
};

export const HexagonalTrustRadar: React.FC<HexagonalTrustRadarProps> = ({
  trustScore,
  size = 'md',
  showLabels = true,
  className = ''
}) => {
  const dimensions = sizeClasses[size];
  const center = dimensions.width / 2;
  const radius = dimensions.width * 0.32;

  // Calculate hexagon vertices (6 axes)
  const getHexagonPoints = (radiusValue: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = center + radiusValue * Math.cos(angle);
      const y = center + radiusValue * Math.sin(angle);
      points.push({ x, y });
    }
    return points;
  };

  // Calculate coordinate for a metric value (0-100) on a specific axis (0-5)
  const getMetricPoint = (value: number, index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  const backgroundHexPoints = getHexagonPoints(radius);

  // Data points for the 6 axes
  const dataPoints = [
    getMetricPoint(trustScore.quality, 0),
    getMetricPoint(trustScore.speed, 1),
    getMetricPoint(trustScore.barterHistory, 2),
    getMetricPoint(trustScore.reliability, 3),
    getMetricPoint(trustScore.communication, 4),
    getMetricPoint(trustScore.cooperation, 5)
  ];

  // Polygon string for data
  const dataPolygonString = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Labels around the hexagon
  const labelNames = [
    { name: 'Quality', val: trustScore.quality },
    { name: 'Speed', val: trustScore.speed },
    { name: 'Barter', val: trustScore.barterHistory },
    { name: 'Reliability', val: trustScore.reliability },
    { name: 'Communication', val: trustScore.communication },
    { name: 'Cooperation', val: trustScore.cooperation }
  ];

  // Get label position offset from vertex
  const getLabelPosition = (index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const offsetDistance = radius + dimensions.labelOffset;
    return {
      x: center + offsetDistance * Math.cos(angle),
      y: center + offsetDistance * Math.sin(angle),
      anchor: (index === 0 || index === 3 ? 'middle' : (index === 1 || index === 2 ? 'start' : 'end')) as 'middle' | 'start' | 'end',
      baseline: (index === 0 ? 'auto' : (index === 3 ? 'hanging' : 'middle')) as 'auto' | 'hanging' | 'middle'
    };
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible"
      >
        {/* Glow Filters */}
        <defs>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="radarAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC9B9B" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#C0E1D2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2D3436" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="radarStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC9B9B" />
            <stop offset="50%" stopColor="#C0E1D2" />
            <stop offset="100%" stopColor="#2D3436" />
          </linearGradient>
        </defs>

        {/* Outer Background Hexagon */}
        <polygon
          points={backgroundHexPoints.map(p => `${p.x},${p.y}`).join(' ')}
          className="stroke-[#2D3436]/15 fill-none"
          strokeWidth="1.5"
        />

        {/* Concentric Grid Lines (20%, 40%, 60%, 80%) */}
        {[0.2, 0.4, 0.6, 0.8].map((level) => {
          const levelPoints = getHexagonPoints(radius * level);
          return (
            <polygon
              key={level}
              points={levelPoints.map(p => `${p.x},${p.y}`).join(' ')}
              className="stroke-[#2D3436]/8 fill-none"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Spokes (axis lines from center to outer vertices) */}
        {backgroundHexPoints.map((vertex, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={vertex.x}
            y2={vertex.y}
            className="stroke-[#2D3436]/10"
            strokeWidth="1"
          />
        ))}

        {/* Animated Data Polygon */}
        <motion.polygon
          points={dataPolygonString}
          fill="url(#radarAreaGradient)"
          stroke="url(#radarStrokeGradient)"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points (glowing circles on vertices) */}
        {dataPoints.map((point, i) => {
          // Color coding for each node
          let color = '#2D3436';
          if (i === 0 || i === 3) color = '#DC9B9B'; // Quality & Reliability
          if (i === 1 || i === 4) color = '#73A591'; // Speed & Comm
          if (i === 2 || i === 5) color = '#8DA59E'; // Barter & Cooperation

          return (
            <g key={i}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="5.5"
                fill={color}
                stroke="#fff"
                strokeWidth="1.5"
                className="shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
              />
              {/* Inner pulsed dot for hover effects */}
              <circle
                cx={point.x}
                cy={point.y}
                r="9"
                fill={color}
                fillOpacity="0.15"
                className="animate-ping"
              />
            </g>
          );
        })}

        {/* Dynamic Labels and values */}
        {showLabels &&
          labelNames.map((lbl, i) => {
            const pos = getLabelPosition(i);
            // Label adjustment offsets to avoid text overlapping SVG limits
            let dy = 0;
            if (i === 0) dy = -5;
            if (i === 3) dy = 5;

            return (
              <g key={lbl.name} className="font-sans">
                {/* Metric Name */}
                <text
                  x={pos.x}
                  y={pos.y + dy}
                  textAnchor={pos.anchor}
                  dominantBaseline={pos.baseline}
                  className={`${dimensions.labelSize} fill-text/75 font-semibold uppercase tracking-wider`}
                >
                  {lbl.name}
                </text>
                {/* Metric Value */}
                <text
                  x={pos.x}
                  y={pos.y + dy + (i === 3 ? 15 : -14)}
                  textAnchor={pos.anchor}
                  dominantBaseline={pos.baseline}
                  className={`${dimensions.labelSize} fill-text font-bold text-[11px]`}
                >
                  {lbl.val}%
                </text>
              </g>
            );
          })}

        {/* Central Trust Score Display */}
        <circle
          cx={center}
          cy={center}
          r={dimensions.width * 0.12}
          className="fill-background stroke-card"
          strokeWidth="3"
        />
        <text
          x={center}
          y={center - 3}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-heading font-extrabold fill-text"
        >
          {trustScore.overall}
        </text>
        <text
          x={center}
          y={center + dimensions.centerOffset}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[9px] uppercase tracking-widest font-bold fill-text/40"
        >
          Trust
        </text>
      </svg>
    </div>
  );
};