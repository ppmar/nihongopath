"use client";

import { motion, AnimatePresence } from "framer-motion";

type XPGainAnimationProps = {
  amount: number;
  show: boolean;
  onComplete?: () => void;
};

export function XPGainAnimation({ amount, show, onComplete }: XPGainAnimationProps) {
  if (amount <= 0) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -40, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={onComplete}
          className="fixed top-20 right-8 z-50 pointer-events-none"
        >
          <span className="text-lg font-bold text-amber-400">
            +{amount} XP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
