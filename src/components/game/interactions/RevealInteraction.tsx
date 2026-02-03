import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Gift, Sparkles } from 'lucide-react';
import { gameConfig } from '@/data/days';

interface RevealInteractionProps {
  prompt: string;
  onComplete: () => void;
}

export const RevealInteraction = ({ prompt, onComplete }: RevealInteractionProps) => {
  const [stage, setStage] = useState<'wrapped' | 'unwrapping' | 'revealed'>('wrapped');

  const handleUnwrap = () => {
    setStage('unwrapping');
    setTimeout(() => {
      setStage('revealed');
      setTimeout(onComplete, 1500);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <AnimatePresence mode="wait">
        {stage === 'wrapped' && (
          <motion.div
            key="wrapped"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-muted-foreground text-center"
            >
              {prompt}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnwrap}
              className="relative"
            >
              {/* Gift box */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [-1, 1, -1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-40 h-40 rounded-3xl bg-gradient-to-br from-rose/30 to-gold/30 
                           flex items-center justify-center border-2 border-gold/30
                           shadow-glow cursor-pointer"
              >
                <Gift className="w-16 h-16 text-gold" />
              </motion.div>
              
              {/* Sparkles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-gold" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-2"
              >
                <Sparkles className="w-5 h-5 text-rose" />
              </motion.div>
            </motion.button>

            <p className="font-sans text-sm text-muted-foreground">
              Toque para abrir
            </p>
          </motion.div>
        )}

        {stage === 'unwrapping' && (
          <motion.div
            key="unwrapping"
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.2, 0.8, 1.3],
              rotate: [0, -5, 5, 0],
              opacity: [1, 1, 1, 0]
            }}
            transition={{ duration: 1.5 }}
            className="w-40 h-40 rounded-3xl bg-gradient-to-br from-rose/40 to-gold/40 
                       flex items-center justify-center"
          >
            <Gift className="w-16 h-16 text-gold" />
          </motion.div>
        )}

        {stage === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            {/* Camera reveal */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(var(--gold), 0.4)',
                    '0 0 0 20px rgba(var(--gold), 0)',
                    '0 0 0 0 rgba(var(--gold), 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-cream to-gold-soft
                           flex items-center justify-center border-4 border-gold/30"
              >
                <Camera className="w-20 h-20 text-terracotta" />
              </motion.div>
              
              {/* Celebration sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 10)],
                    y: [0, -20 - i * 15]
                  }}
                  transition={{ 
                    delay: 0.3 + i * 0.1,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute top-1/2 left-1/2"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                </motion.div>
              ))}
            </motion.div>

            {/* Gift name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium">
                {gameConfig.giftName}
              </h2>
              <p className="font-sans text-muted-foreground max-w-xs leading-relaxed">
                {gameConfig.giftDescription}
              </p>
            </motion.div>

            {/* Birthday message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-4 border-t border-border/50"
            >
              <p className="font-serif italic text-xl text-primary">
                Feliz aniversário, meu amor. 💕
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
