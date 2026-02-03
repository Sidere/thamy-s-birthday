import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';

interface CountdownInteractionProps {
  prompt: string;
  onComplete: () => void;
}

export const CountdownInteraction = ({ prompt, onComplete }: CountdownInteractionProps) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCompleted(true);
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, onComplete]);

  const progress = ((10 - timeLeft) / 10) * 100;

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
        {!started ? (
          <motion.button
            key="start"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStarted(true)}
            className="btn-intimate flex items-center gap-2"
          >
            <Clock className="w-5 h-5" />
            <span>Começar</span>
          </motion.button>
        ) : !completed ? (
          <motion.div
            key="timer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Circular progress */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              
              {/* Center number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={timeLeft}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-serif text-5xl text-foreground"
                >
                  {timeLeft}
                </motion.span>
              </div>
            </div>

            <p className="font-sans text-sm text-muted-foreground italic">
              Respire... e sinta o momento.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-rose/30 to-gold/30 
                         flex items-center justify-center"
            >
              <Heart className="w-10 h-10 text-rose fill-rose/30" />
            </motion.div>
            <p className="font-serif italic text-lg text-foreground/90">
              10 segundos com você valem a eternidade.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
