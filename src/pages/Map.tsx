import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { days } from '@/data/days';
import { LevelCard } from '@/components/game/LevelCard';
import { Heart } from 'lucide-react';

const Map = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-12 pb-8 px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full 
                     bg-gradient-to-br from-rose/20 to-primary/20 mb-4"
        >
          <Heart className="w-6 h-6 text-primary fill-primary/20" />
        </motion.div>
        
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
          5 dicas para você
        </h1>
        <p className="font-sans text-muted-foreground max-w-xs mx-auto">
          Uma jornada de descobertas até o seu aniversário
        </p>
      </motion.header>

      {/* Timeline decoration */}
      <div className="relative max-w-md mx-auto px-6">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/30 to-border origin-top"
        />

        {/* Day cards */}
        <div className="relative space-y-4 pb-12">
          {days.map((day, index) => (
            <div key={day.id} className="relative pl-8">
              {/* Connection dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="absolute left-[1px] top-8 w-3 h-3 rounded-full bg-primary/50 border-2 border-background"
              />
              
              <LevelCard
                day={day}
                index={index}
                onClick={() => navigate(`/day/${day.id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="py-8 text-center"
      >
        <p className="font-sans text-xs text-muted-foreground/60">
          Feito com amor, para tu linda ✨
        </p>
      </motion.footer>
    </div>
  );
};

export default Map;
