import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check } from 'lucide-react';

interface QuizInteractionProps {
  prompt: string;
  onComplete: () => void;
}

// Simple options - all lead to success (no failure state)
const options = [
  "Um café com eight",
  "Um baseado suspeito",
  "Festa do fim do mundo"
];

export const QuizInteraction = ({ prompt, onComplete }: QuizInteractionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      setCompleted(true);
      setTimeout(onComplete, 1000);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif italic text-lg text-foreground/90 text-center"
      >
        {prompt}
      </motion.p>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-3"
          >
            {options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
                className={`
                  w-full p-4 rounded-2xl text-left font-sans
                  border border-border/50 transition-all duration-300
                  ${selected === index 
                    ? 'bg-primary/20 border-primary/50' 
                    : 'bg-card hover:bg-secondary/50'
                  }
                  ${selected !== null && selected !== index ? 'opacity-50' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-colors duration-300
                    ${selected === index ? 'bg-primary' : 'bg-muted'}
                  `}>
                    {selected === index ? (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <span className="text-sm text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <span className={`
                    ${selected === index ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {option}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-rose/30 to-primary/20 
                         flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-rose fill-rose/50" />
            </motion.div>
            <p className="font-sans text-sm text-muted-foreground">
              Todas as respostas são certas quando é sobre nós.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
