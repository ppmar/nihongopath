"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getLevelTitle } from "@/lib/gamification/xp";
import { ConfettiExplosion } from "@/components/common/ConfettiExplosion";

type LevelUpModalProps = {
  open: boolean;
  onClose: () => void;
  level: number;
};

export function LevelUpModal({ open, onClose, level }: LevelUpModalProps) {
  return (
    <>
      <ConfettiExplosion trigger={open} />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md text-center border-violet-500/20 bg-card/95 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="py-6 space-y-4"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight">
              Niveau {level} !
            </h2>
            <p className="text-lg font-medium bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {getLevelTitle(level)}
            </p>
            <p className="text-sm text-muted-foreground">
              Continue comme ça, tu progresses vite !
            </p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              Continuer
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
