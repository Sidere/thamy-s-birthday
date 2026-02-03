import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -30, 0]
            }}
            transition={{ 
              delay: i * 0.5,
              duration: 5 + i,
              repeat: Infinity
            }}
            className="absolute"
            style={{
              left: `${15 + (i * 18)}%`,
              top: `${25 + (i % 3) * 20}%`
            }}
          >
            <Sparkles className="w-3 h-3 text-gold/30" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="text-center relative z-10"
      >
        {/* Heart icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                     bg-gradient-to-br from-rose/20 to-primary/20 mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-9 h-9 text-primary fill-primary/20" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-4xl md:text-5xl text-foreground mb-4"
        >
          Soube que tu gosta de
          <br />
          presentes lindinha?
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-16 h-px bg-primary/40 mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-sans text-lg text-muted-foreground max-w-xs mx-auto mb-12 leading-relaxed"
        >
          Bora jogar um game e descobrir teu presente de aniversário?
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/map')}
          className="btn-intimate text-lg px-10 py-4"
        >
          Começar
        </motion.button>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-xs text-muted-foreground/60 mt-8"
        >
          Todos os dias a gente descobre algo ✨
        </motion.p>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="w-1 h-1 rounded-full bg-primary/30" />
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
