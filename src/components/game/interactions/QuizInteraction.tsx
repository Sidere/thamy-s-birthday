import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Coffee, Cigarette, Music, X } from 'lucide-react';

interface QuizInteractionProps {
  prompt: string;
  onComplete: () => void;
}

// Opções com resposta correta marcada
const quizOptions = [
  {
    id: 1,
    text: "Um café no Eight",
    icon: Coffee,
    isCorrect: false, 
  },
  {
    id: 2,
    text: "Um baseado suspeito",
    icon: Cigarette,
    isCorrect: false,
  },
  {
    id: 3,
    text: "Festa do fim do mundo",
    icon: Music,
    isCorrect: true,
  },
];

export const QuizInteraction = ({ prompt, onComplete }: QuizInteractionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (optionId: number) => {
    const option = quizOptions.find((o) => o.id === optionId);
    if (!option) return;

    setSelected(optionId);
    setIsCorrect(option.isCorrect);
    setShowFeedback(true);

    if (option.isCorrect) {
      // acertou → completa depois de um tempo
      setTimeout(() => {
        setCompleted(true);
        setTimeout(onComplete, 1200);
      }, 800);
    } else {
      // errou → volta depois de mostrar feedback
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4">
      {/* Prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif italic text-lg text-foreground/90 text-center mb-2"
      >
        {prompt}
      </motion.p>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
          >
            {quizOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selected === option.id;
              const isWrong = isSelected && !isCorrect && showFeedback;
              const isRight = isSelected && isCorrect && showFeedback;

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  whileHover={!showFeedback ? { y: -4, scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => !showFeedback && handleSelect(option.id)}
                  disabled={showFeedback}
                  className={`
                    group relative overflow-hidden
                    rounded-3xl p-6 min-h-[180px]
                    flex flex-col items-center justify-center gap-4
                    border-2 transition-all duration-300
                    ${
                      isRight
                        ? 'bg-gradient-to-br from-rose/20 to-primary/10 border-rose/50 shadow-glow'
                        : isWrong
                          ? 'bg-gradient-to-br from-muted/40 to-muted/20 border-muted-foreground/30'
                          : 'bg-gradient-to-br from-card to-secondary/30 border-border/50 hover:border-primary/40 hover:shadow-card'
                    }
                  `}
                >
                  {/* Ícone */}
                  <div
                    className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-all duration-300
                    ${
                      isRight
                        ? 'bg-rose/20'
                        : isWrong
                          ? 'bg-muted'
                          : 'bg-primary/10 group-hover:bg-primary/20'
                    }
                  `}
                  >
                    {isRight ? (
                      <Heart className="w-8 h-8 text-rose fill-rose/40" />
                    ) : isWrong ? (
                      <X className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <Icon
                        className={`w-8 h-8 ${
                          isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                        }`}
                      />
                    )}
                  </div>

                  {/* Texto */}
                  <p
                    className={`
                    font-sans text-center leading-snug
                    transition-colors duration-300
                    ${
                      isRight
                        ? 'text-foreground font-medium'
                        : isWrong
                          ? 'text-muted-foreground'
                          : 'text-foreground/80 group-hover:text-foreground'
                    }
                  `}
                  >
                    {option.text}
                  </p>

                  {/* Ripple de fundo (hover) */}
                  {!showFeedback && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          // Success state
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-rose/30 to-primary/20 
                         flex items-center justify-center shadow-glow"
            >
              <Heart className="w-10 h-10 text-rose fill-rose/50" />
            </motion.div>
            <p className="font-serif italic text-foreground/70 text-center px-4">
              Você guardou esse momento.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback inline (aparece abaixo dos cards quando erra) */}
      <AnimatePresence>
        {showFeedback && !isCorrect && (
          <motion.p
            key="feedback"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="font-sans text-sm text-muted-foreground text-center italic"
          >
            Tenta de novo, amor. Você sabe qual é.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};