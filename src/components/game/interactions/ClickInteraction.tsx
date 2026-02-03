import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

interface ClickInteractionProps {
  prompt: string;
  onComplete: () => void;
}

export const ClickInteraction = ({ prompt, onComplete }: ClickInteractionProps) => {
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const requiredClicks = 3;

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= requiredClicks) {
      setClicked(true);
      setTimeout(onComplete, 800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-sans text-muted-foreground text-center"
      >
        {prompt}
      </motion.p>

      <AnimatePresence mode="wait">
        {!clicked ? (
          <motion.button
            key="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 
                       flex items-center justify-center cursor-pointer
                       transition-shadow duration-300 hover:shadow-glow"
          >
            {/* Ripple rings */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary/30"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 rounded-full border border-primary/20"
            />
            
            <Eye className="w-10 h-10 text-primary" />
            
            {/* Progress indicator */}
            <div className="absolute -bottom-8 flex gap-2">
              {Array.from({ length: requiredClicks }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: i < clickCount ? 1.2 : 1,
                    backgroundColor: i < clickCount ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
                  }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/30 to-primary/20 
                       flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Eye className="w-10 h-10 text-gold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
