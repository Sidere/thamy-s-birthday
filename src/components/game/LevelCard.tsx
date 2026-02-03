import { motion } from 'framer-motion';
import { Eye, Heart, Sparkles, Clock, Camera, Lock } from 'lucide-react';
import { DayData } from '@/data/days';
import { isDayComplete, isDayUnlocked } from '@/utils/gameProgress';

interface LevelCardProps {
  day: DayData;
  index: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  eye: Eye,
  heart: Heart,
  sparkles: Sparkles,
  clock: Clock,
  camera: Camera,
};

export const LevelCard = ({ day, index, onClick }: LevelCardProps) => {
  const isUnlocked = isDayUnlocked(day.date);
  const isCompleted = isDayComplete(day.id);
  const Icon = iconMap[day.icon] || Eye;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={isUnlocked ? { scale: 1.02, y: -4 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
      className={`
        relative w-full p-6 rounded-3xl text-left transition-all duration-500
        ${isUnlocked 
          ? 'card-game cursor-pointer hover:shadow-glow' 
          : 'bg-muted/50 border border-border/30 cursor-not-allowed opacity-60'
        }
        ${isCompleted ? 'ring-2 ring-primary/30' : ''}
      `}
    >
      {/* Decorative corner accent */}
      {isUnlocked && (
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl">
          <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl" />
        </div>
      )}

      <div className="relative flex items-start gap-4">
        {/* Icon container */}
        <div className={`
          flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${isUnlocked 
            ? 'bg-gradient-to-br from-primary/20 to-accent/20' 
            : 'bg-muted'
          }
          ${isCompleted ? 'bg-gradient-to-br from-gold/30 to-primary/20' : ''}
        `}>
          {isUnlocked ? (
            <Icon className={`w-6 h-6 ${isCompleted ? 'text-gold' : 'text-primary'}`} />
          ) : (
            <Lock className="w-5 h-5 text-locked" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-sans font-medium tracking-wider uppercase text-muted-foreground">
              {day.subtitle}
            </span>
            {isCompleted && (
              <span className="text-xs font-sans text-gold">✓ completo</span>
            )}
          </div>
          
          <h3 className={`
            font-serif text-xl font-medium mb-2
            ${isUnlocked ? 'text-foreground' : 'text-locked'}
          `}>
            {day.title}
          </h3>
          
          <p className={`
            font-sans text-sm leading-relaxed
            ${isUnlocked ? 'text-muted-foreground' : 'text-locked/70'}
          `}>
            {isUnlocked ? day.text : 'Desbloqueado em breve...'}
          </p>
        </div>

        {/* Day number badge */}
        <div className={`
          absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center
          font-serif text-sm font-medium
          ${isUnlocked 
            ? 'bg-primary text-primary-foreground shadow-soft' 
            : 'bg-muted text-locked'
          }
        `}>
          {day.date}
        </div>
      </div>

      {/* Unlock date hint for locked cards */}
      {!isUnlocked && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border/30"
        >
          <p className="text-xs font-sans text-locked text-center">
            Disponível dia {day.date}
          </p>
        </motion.div>
      )}
    </motion.button>
  );
};
