/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SoundWaveProps {
  isActive: boolean;
}

export const SoundWave: React.FC<SoundWaveProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [10, 40, 15, 60, 20, 40, 10],
          } : {
            height: 4,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5 + Math.random() * 0.5,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
          className="w-1.5 bg-gb-accent rounded-full opacity-80"
        />
      ))}
    </div>
  );
};

export const Blackboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full bg-[#1B2B2B] border-[12px] border-[#3E2723] rounded-lg shadow-2xl relative overflow-hidden flex flex-col p-6 font-handwriting">
        {/* Wood Texture / Grains */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Chalk Dust Effect */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle, transparent 60%, rgba(255,255,255,0.05))" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white/90 text-xl leading-relaxed whitespace-pre-wrap"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={children?.toString()}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Chalk holder bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#2D1B13] border-t border-white/10" />
    </div>
  );
};
