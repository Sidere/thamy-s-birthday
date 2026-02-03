import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SliderInteractionProps {
  prompt: string;
  onComplete: () => void;
}

export const SliderInteraction = ({ prompt, onComplete }: SliderInteractionProps) => {
  const [value, setValue] = useState([30]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Complete when slider is moved to high enough value
    if (value[0] >= 85 && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 800);
    }
  }, [value, completed, onComplete]);

  const blur = Math.max(0, 10 - (value[0] / 10));
  const opacity = 0.3 + (value[0] / 100) * 0.7;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-sans text-muted-foreground text-center"
      >
        {prompt}
      </motion.p>

      {/* Visual focus indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-48 h-48 flex items-center justify-center"
      >
        {/* Background blur layers */}
        <motion.div
          style={{ 
            filter: `blur(${blur * 2}px)`,
            opacity: opacity * 0.5
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-rose/40 to-gold/40"
        />
        
        {/* Main circle */}
        <motion.div
          style={{ 
            filter: `blur(${blur}px)`,
            opacity: opacity
          }}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/40
                     flex items-center justify-center border border-primary/20"
        >
          <Sparkles 
            className="w-12 h-12 text-primary transition-opacity duration-300"
            style={{ opacity: opacity }}
          />
        </motion.div>

        {/* Focus rings */}
        {value[0] > 70 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            className="absolute inset-4 rounded-full border-2 border-gold/30"
          />
        )}
        
        {completed && (
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 rounded-full border-2 border-gold animate-pulse-soft"
          />
        )}
      </motion.div>

      {/* Slider */}
      <div className="w-full px-4">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          disabled={completed}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-xs font-sans text-muted-foreground">
          <span>Desfocado</span>
          <span>Nítido</span>
        </div>
      </div>

      {completed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-sm text-gold text-center"
        >
          Perfeito. Agora você vê com clareza.
        </motion.p>
      )}
    </div>
  );
};
