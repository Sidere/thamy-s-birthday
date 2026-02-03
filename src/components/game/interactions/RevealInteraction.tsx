import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Gift, Sparkles, Film } from 'lucide-react';
import { gameConfig } from '@/data/days';

interface RevealInteractionProps {
  prompt: string;
  onComplete: () => void;
}

// Frames do filme — mensagens que aparecem sequencialmente
const filmFrames = [
  {
    id: 1,
    text: 'Cada clique',
    subtext: 'congela o tempo',
  },
  {
    id: 2,
    text: 'Cada foto',
    subtext: 'guarda um pedaço de nós',
  },
  {
    id: 3,
    text: 'E agora',
    subtext: 'você tem o poder de capturar...',
  },
  {
    id: 4,
    text: 'Todos os momentos',
    subtext: 'que ainda vamos viver juntas',
  },
];

export const RevealInteraction = ({ prompt, onComplete }: RevealInteractionProps) => {
  const [stage, setStage] = useState<'wrapped' | 'unwrapping' | 'filmstrip' | 'revealed'>('wrapped');
  const [visibleFrames, setVisibleFrames] = useState<number[]>([]);

  const handleUnwrap = () => {
    setStage('unwrapping');
    setTimeout(() => {
      setStage('filmstrip');
      // Revela frames um por um
      filmFrames.forEach((frame, index) => {
        setTimeout(() => {
          setVisibleFrames((prev) => [...prev, frame.id]);
        }, index * 1200);
      });
      // Vai pro reveal final
      setTimeout(() => {
        setStage('revealed');
        setTimeout(onComplete, 8000);
      }, filmFrames.length * 1200 + 1500);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-4 w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* ── EMBRULHADO ────────────────────────────────────── */}
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
              className="font-serif italic text-lg text-foreground/90 text-center"
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
                  rotate: [-1, 1, -1],
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
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-gold" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-2 -left-2"
              >
                <Sparkles className="w-5 h-5 text-rose" />
              </motion.div>
            </motion.button>

            <p className="font-sans text-sm text-muted-foreground">Toque para abrir</p>
          </motion.div>
        )}

        {/* ── DESEMBRULHANDO ────────────────────────────────── */}
        {stage === 'unwrapping' && (
          <motion.div
            key="unwrapping"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.2, 0.8, 1.3],
              rotate: [0, -5, 5, 0],
              opacity: [1, 1, 1, 0],
            }}
            transition={{ duration: 1.2 }}
            className="w-40 h-40 rounded-3xl bg-gradient-to-br from-rose/40 to-gold/40
                       flex items-center justify-center"
          >
            <Gift className="w-16 h-16 text-gold" />
          </motion.div>
        )}

        {/* ── FILMSTRIP ─────────────────────────────────────── */}
        {stage === 'filmstrip' && (
          <motion.div
            key="filmstrip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full max-w-md"
          >
            {/* Ícone de filme no topo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-center mb-6"
            >
              <Film className="w-10 h-10 text-terracotta" />
            </motion.div>

            {/* Filmstrip container */}
            <div className="relative bg-gradient-to-b from-warm-gray/20 to-muted/30 rounded-2xl p-6 shadow-card">
              {/* Perfurações do filme (esquerda e direita) */}
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4">
                {[...Array(8)].map((_, i) => (
                  <div key={`left-${i}`} className="w-2 h-2 rounded-sm bg-muted" />
                ))}
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-around py-4">
                {[...Array(8)].map((_, i) => (
                  <div key={`right-${i}`} className="w-2 h-2 rounded-sm bg-muted" />
                ))}
              </div>

              {/* Frames */}
              <div className="space-y-6 px-6">
                {filmFrames.map((frame, index) => {
                  const isVisible = visibleFrames.includes(frame.id);
                  return (
                    <AnimatePresence key={frame.id}>
                      {isVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scaleY: 0.8 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="relative"
                        >
                          {/* Frame do filme */}
                          <div
                            className="bg-background/80 backdrop-blur-sm rounded-xl p-6
                                       border border-border/50 shadow-soft"
                          >
                            <h3 className="font-serif text-2xl text-foreground mb-2 text-center">
                              {frame.text}
                            </h3>
                            <p className="font-sans text-sm text-muted-foreground text-center italic">
                              {frame.subtext}
                            </p>
                          </div>

                          {/* Número do frame (canto) */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-terracotta/80 flex items-center justify-center">
                            <span className="text-xs font-mono text-cream">{index + 1}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── REVELAÇÃO FINAL ───────────────────────────────── */}
        {stage === 'revealed' && (
          <motion.div
            key="revealed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="flex flex-col items-center gap-8 text-center w-full max-w-lg"
          >
            {/* Câmera com brilho */}
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(212, 175, 55, 0.4)',
                    '0 0 0 30px rgba(212, 175, 55, 0)',
                    '0 0 0 0 rgba(212, 175, 55, 0)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-56 h-56 rounded-full bg-gradient-to-br from-cream via-gold-soft to-terracotta/30
                           flex items-center justify-center border-4 border-gold/40 shadow-glow"
              >
                <Camera className="w-24 h-24 text-terracotta drop-shadow-lg" />
              </motion.div>

              {/* Sparkles celebrando */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.cos((i * Math.PI) / 4) * 70],
                    y: [0, Math.sin((i * Math.PI) / 4) * 70],
                  }}
                  transition={{
                    delay: 0.3 + (i % 2) * 0.15,
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                  }}
                  className="absolute top-1/2 left-1/2"
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                </motion.div>
              ))}
            </motion.div>

            {/* Nome do presente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-5 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/30"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground font-medium tracking-tight">
                {gameConfig.giftName}
              </h2>
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                {gameConfig.giftDescription}
              </p>

              {/* Mensagem de aniversário */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pt-6 mt-6 border-t border-border/50"
              >
                <p className="font-serif italic text-2xl text-rose leading-relaxed">
                  Feliz aniversário, meu amor.
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring' }}
                  className="mt-3"
                >
                  <span className="text-3xl">💕</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};