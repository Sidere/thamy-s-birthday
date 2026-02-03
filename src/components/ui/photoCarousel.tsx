import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import photo1 from '@/assets/photo1.png';
import photo2 from '@/assets/photo2.png';
import photo3 from '@/assets/photo3.png';

export const carouselPhotos = [
    {
        id: 1,
        src: photo1,
        alt: 'Foto 1',
        caption: 'Alguns momentos só existem quando você para para olhar.',
    },
    {
        id: 2,
        src: photo2,
        alt: 'Foto 2',
        caption: 'É nos detalhes que a gente encontra o que importa.',
    },
    {
        id: 3,
        src: photo3,
        alt: 'Foto 3',
        caption: 'O mundo fica mais bonito quando é visto junto.',
    },
];

// ─── Placeholder visual (quando src está vazio) ───────────────────
const PhotoPlaceholder = ({ index }: { index: number }) => {
    const gradients = [
        'from-rose-soft/60 to-primary/20',
        'from-gold-soft/60 to-accent/20',
        'from-primary/20 to-cream/60',
    ];

    return (
        <div
            className={`w-full h-full rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]}
                  flex items-center justify-center`}
        >
            <div className="text-center opacity-40">
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="mx-auto mb-2 text-muted-foreground"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="font-sans text-xs text-muted-foreground">sua foto aqui</p>
            </div>
        </div>
    );
};

// ─── Props ──────────────────────────────────────────────────────────
interface PhotoCarouselProps {
    onFinish: () => void; // chamado quando a usuária passa pela última foto
}

// ─── Componente ─────────────────────────────────────────────────────
export const PhotoCarousel = ({ onFinish }: PhotoCarouselProps) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState<number>(1);
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const MIN_SWIPE = 40; // px mínimos para considerar swipe

    const total = carouselPhotos.length;
    const isLast = current === total - 1;

    // ── navegação ──
    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    const prev = () => { if (current > 0) goTo(current - 1); };

    const next = () => {
        if (isLast) {
            onFinish();
        } else {
            goTo(current + 1);
        }
    };

    // ── swipe (mobile) ──
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.touches[0].clientX;
        touchEnd.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStart.current === null || touchEnd.current === null) return;

        const diff = touchStart.current - touchEnd.current;

        if (Math.abs(diff) >= MIN_SWIPE) {
            if (diff > 0) {
                next();
            } else {
                prev();
            }
        }

        touchStart.current = null;
        touchEnd.current = null;
    };

    // ── slide variants ──
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: '0%',
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-100%' : '100%',
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
            {/* ── contador ── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-xs text-muted-foreground mb-3 tracking-widest uppercase"
            >
                {current + 1} / {total}
            </motion.p>

            {/* ── frame da foto ── */}
            <div
                className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-card bg-muted"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0"
                    >
                        {carouselPhotos[current].src ? (
                            <img
                                src={carouselPhotos[current].src}
                                alt={carouselPhotos[current].alt}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        ) : (
                            <PhotoPlaceholder index={current} />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── setas (desktop) ── */}
                {current > 0 && (
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm
                       flex items-center justify-center
                       hover:bg-background/90 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                )}

                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                     w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm
                     flex items-center justify-center
                     hover:bg-background/90 transition-colors"
                >
                    <ChevronRight className={`w-4 h-4 ${isLast ? 'text-gold' : 'text-foreground'}`} />
                </button>
            </div>

            {/* ── caption poética ── */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={current}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif italic text-sm text-foreground/70 text-center mt-4 px-2 leading-relaxed"
                >
                    {carouselPhotos[current].caption}
                </motion.p>
            </AnimatePresence>

            {/* ── dots ── */}
            <div className="flex gap-2 mt-4">
                {carouselPhotos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="transition-all duration-300"
                    >
                        <div
                            className={`rounded-full transition-all duration-300 ${i === current
                                ? 'w-6 h-2 bg-primary'
                                : 'w-2 h-2 bg-muted hover:bg-muted-foreground'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* ── botão no último slide ── */}
            {isLast && (
                <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onFinish}
                    className="btn-intimate mt-5"
                >
                    Continuar
                </motion.button>
            )}
        </div>
    );
};