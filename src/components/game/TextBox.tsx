import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextBoxProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const TextBox = ({ children, delay = 0, className = '' }: TextBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={`
        text-center px-6 py-8
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

interface PoeticTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const PoeticText = ({ text, delay = 0, className = '' }: PoeticTextProps) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.2 }}
      className={`
        font-serif italic text-xl md:text-2xl text-foreground/90 
        leading-relaxed tracking-wide
        ${className}
      `}
    >
      "{text}"
    </motion.p>
  );
};

interface HintTextProps {
  text: string;
  delay?: number;
}

export const HintText = ({ text, delay = 0 }: HintTextProps) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="font-sans text-sm text-muted-foreground mt-4"
    >
      {text}
    </motion.p>
  );
};
