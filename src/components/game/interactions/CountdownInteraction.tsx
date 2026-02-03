import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Home, Cat, Infinity as InfinityIcon } from 'lucide-react';

interface CountdownInteractionProps {
  prompt: string;
  onComplete: () => void;
}

const timelineMoments = [
  {
    id: 1,
    icon: Sparkles,
    text: 'O começo de tudo',
    detail: '8 anos atrás',
    triggerAt: 8,
  },
  {
    id: 2,
    icon: Heart,
    text: 'Primeiro beijo',
    detail: 'Festa do fim do mundo, 22 de dezembro',
    triggerAt: 6,
  },
  {
    id: 3,
    icon: Home,
    text: 'Construindo um lar',
    detail: 'Onde a gente é nós',
    triggerAt: 4,
  },
  {
    id: 4,
    icon: Cat,
    text: 'Nossa família felina',
    detail: 'Orion, Sirius e Isabelah',
    triggerAt: 2,
  },
  {
    id: 5,
    icon: InfinityIcon,
    text: 'Cada segundo com você',
    detail: 'Vale a eternidade',
    triggerAt: 0,
  },
];

export const CountdownInteraction = ({ prompt, onComplete }: CountdownInteractionProps) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [visibleMoments, setVisibleMoments] = useState<number[]>([]);

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;

        // Revela momentos conforme o tempo
        timelineMoments.forEach((moment) => {
          if (next === moment.triggerAt && !visibleMoments.includes(moment.id)) {
            setVisibleMoments((v) => [...v, moment.id]);
          }
        });

        if (next <= 0) {
          setCompleted(true);
          clearInterval(timer);
          setTimeout(onComplete, 2000);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, completed, onComplete, visibleMoments]);

  const progress = ((10 - timeLeft) / 10) * 100;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif italic text-lg text-foreground/90 text-center"
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
            className="btn-intimate flex items-center gap-2 mt-4"
          >
            <Heart className="w-5 h-5" />
            <span>Começar</span>
          </motion.button>
        ) : (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {/* Timer circular (topo) */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="3"
                    opacity="0.3"
                  />
                  {/* Progress */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--gold))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * progress) / 100}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>

                {/* Número central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    key={timeLeft}
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="font-serif text-3xl text-gold"
                  >
                    {timeLeft}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Timeline vertical */}
            <div className="relative">
              {/* Linha central */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

              {/* Momentos */}
              <div className="space-y-6">
                {timelineMoments.map((moment, index) => {
                  const isVisible = visibleMoments.includes(moment.id);
                  const Icon = moment.icon;

                  return (
                    <AnimatePresence key={moment.id}>
                      {isVisible && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="relative flex items-start gap-4 pl-1"
                        >
                          {/* Ícone */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full
                                       bg-gradient-to-br from-primary/20 to-gold/10
                                       border-2 border-primary/30
                                       flex items-center justify-center"
                          >
                            <Icon className="w-5 h-5 text-primary" />
                          </motion.div>

                          {/* Conteúdo */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex-1 pt-1"
                          >
                            <h4 className="font-serif text-base text-foreground mb-1">
                              {moment.text}
                            </h4>
                            <p className="font-sans text-sm text-muted-foreground italic">
                              {moment.detail}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            </div>

            {/* Mensagem final (aparece quando completa) */}
            <AnimatePresence>
              {completed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <p className="font-serif italic text-foreground/80 text-lg leading-relaxed">
                    10 segundos.
                    <br />
                    8 anos.
                    <br />
                    Infinitas memórias.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};