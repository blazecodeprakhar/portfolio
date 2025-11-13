'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react';

const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: 'self' | 'parent' | 'global';
  springOptions?: SpringOptions;
};

export function Magnetic({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = 'self',
  springOptions = SPRING_CONFIG,
}: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const abs = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (isHovered && abs <= range) {
          const scale = 1 - abs / range;
          x.set(distanceX * intensity * scale);
          y.set(distanceY * intensity * scale);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    document.addEventListener('mousemove', calculateDistance);
    return () => document.removeEventListener('mousemove', calculateDistance);
  }, [ref, isHovered, intensity, range]);

  useEffect(() => {
    if (actionArea === 'parent' && ref.current?.parentElement) {
      const parent = ref.current.parentElement;

      const enter = () => setIsHovered(true);
      const leave = () => setIsHovered(false);

      parent.addEventListener('mouseenter', enter);
      parent.addEventListener('mouseleave', leave);

      return () => {
        parent.removeEventListener('mouseenter', enter);
        parent.removeEventListener('mouseleave', leave);
      };
    } else if (actionArea === 'global') {
      setIsHovered(true);
    }
  }, [actionArea]);

  const handleEnter = () => {
    if (actionArea === 'self') setIsHovered(true);
  };

  const handleLeave = () => {
    if (actionArea === 'self') {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={actionArea === 'self' ? handleEnter : undefined}
      onMouseLeave={actionArea === 'self' ? handleLeave : undefined}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
