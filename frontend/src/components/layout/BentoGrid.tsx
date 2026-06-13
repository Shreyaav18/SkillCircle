'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 ${className}`}>
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    rows?: number;
    cols?: number;
  };
  delay?: number;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  children,
  className = '',
  span,
  delay = 0
}) => {
  const gridSpan = span ? {
    gridRow: span.rows ? `span ${span.rows}` : 'auto',
    gridColumn: span.cols ? `span ${span.cols}` : 'auto'
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-card rounded-2xl p-6 shadow-soft hover:shadow-soft-rose transition-all duration-300 ${className}`}
      style={gridSpan}
    >
      {children}
    </motion.div>
  );
};