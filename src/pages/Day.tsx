import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { days } from '@/data/days';
import { isDayUnlocked, markDayComplete, isDayComplete } from '@/utils/gameProgress';
import { TextBox, PoeticText, HintText } from '@/components/game/TextBox';
import {
  ClickInteraction,
  QuizInteraction,
  SliderInteraction,
  CountdownInteraction,
  RevealInteraction
} from '@/components/game/interactions';

const Day = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'intro' | 'interaction' | 'success'>('intro');
  const [showHint, setShowHint] = useState(false);

  const dayId = parseInt(id || '1', 10);
  const day = days.find(d => d.id === dayId);

  useEffect(() => {
    if (day && !isDayUnlocked(day.date)) {
      navigate('/');
    }
  }, [day, navigate]);

  useEffect(() => {
    // Show hint after 3 seconds on intro
    if (stage === 'intro') {
      const timer = setTimeout(() => setShowHint(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  if (!day) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Dia não encontrado</p>
      </div>
    );
  }

  const handleComplete = () => {
    setStage('success');
    markDayComplete(day.id);
  };

  const renderInteraction = () => {
    switch (day.interactionType) {
      case 'click':
        return <ClickInteraction prompt={day.interactionPrompt} onComplete={handleComplete} />;
      case 'quiz':
        return <QuizInteraction prompt={day.interactionPrompt} onComplete={handleComplete} />;
      case 'slider':
        return <SliderInteraction prompt={day.interactionPrompt} onComplete={handleComplete} />;
      case 'countdown':
        return <CountdownInteraction prompt={day.interactionPrompt} onComplete={handleComplete} />;
      case 'reveal':
        return <RevealInteraction prompt={day.interactionPrompt} onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  const alreadyComplete = isDayComplete(day.id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4"
      >
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <span className="font-sans text-sm text-muted-foreground">
          {day.subtitle}
        </span>
        
        <div className="w-9" /> {/* Spacer for centering */}
      </motion.header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {stage === 'intro' && !alreadyComplete && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center max-w-md"
            >
              {/* Theme title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                  {day.title}
                </h1>
                <div className="w-12 h-px bg-primary/40 mx-auto" />
              </motion.div>

              {/* Poetic text */}
              <TextBox delay={0.6}>
                <PoeticText text={day.text} delay={0.8} />
                
                {showHint && (
                  <HintText text={day.hint} delay={0} />
                )}
              </TextBox>

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStage('interaction')}
                className="btn-intimate mt-8"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {(stage === 'interaction' || alreadyComplete) && !alreadyComplete && (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-2xl text-foreground text-center mb-8"
              >
                {day.title}
              </motion.h2>
              
              {renderInteraction()}
            </motion.div>
          )}

          {(stage === 'success' || alreadyComplete) && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center max-w-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-primary/20 
                           flex items-center justify-center mb-6"
              >
                <Check className="w-8 h-8 text-gold" />
              </motion.div>

              <h2 className="font-serif text-2xl text-foreground mb-3">
                {day.title}
              </h2>
              
              <p className="font-serif italic text-lg text-foreground/80 mb-2">
                "{day.successMessage}"
              </p>

              <p className="font-sans text-sm text-muted-foreground mb-8">
                {day.hint}
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="btn-subtle"
              >
                Voltar ao mapa
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Progress indicator */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-6"
      >
        <div className="flex justify-center gap-2">
          {days.map((d) => (
            <div
              key={d.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                d.id === dayId
                  ? 'bg-primary'
                  : isDayComplete(d.id)
                    ? 'bg-gold'
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </motion.footer>
    </div>
  );
};

export default Day;
