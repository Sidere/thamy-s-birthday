import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Heart, ArrowLeft, Sparkles } from 'lucide-react';
import { gameConfig } from '@/data/days';
import { getAllDaysCompleted } from '@/utils/gameProgress';

const Final = () => {
  const navigate = useNavigate();
  const allComplete = getAllDaysCompleted();

  if (!allComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-3">
            Ainda não chegou a hora
          </h1>
          <p className="font-sans text-muted-foreground mb-8">
            Complete todos os dias para ver o final.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-subtle"
          >
            Voltar ao mapa
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-secondary transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
      </motion.button>

      {/* Main content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Floating sparkles background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0]
              }}
              transition={{ 
                delay: i * 0.3,
                duration: 4 + i,
                repeat: Infinity
              }}
              className="absolute"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 4) * 20}%`
              }}
            >
              <Sparkles className="w-4 h-4 text-gold/40" />
            </motion.div>
          ))}
        </div>

        {/* Camera reveal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          {/* Glow ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gold/20 blur-xl"
          />
          
          <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-cream via-gold-soft to-rose-soft
                         flex items-center justify-center border-4 border-gold/30 shadow-glow">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Camera className="w-24 h-24 text-terracotta" />
            </motion.div>
          </div>
        </motion.div>

        {/* Gift info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-md"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            {gameConfig.giftName}
          </h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
            className="w-16 h-px bg-primary/40 mx-auto mb-6"
          />
          
          <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
            {gameConfig.giftDescription}
          </p>
        </motion.div>

        {/* Birthday message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-rose fill-rose/50" />
            </motion.div>
          </div>
          
          <p className="font-serif italic text-2xl text-primary">
            Feliz aniversário, meu amor.
          </p>
          
          <p className="font-sans text-sm text-muted-foreground mt-4">
            Que você capture o mundo do seu jeito.
          </p>
        </motion.div>

        {/* Decorative bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <p className="font-sans text-xs text-muted-foreground/50">
            Com todo meu amor ✨
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Final;
