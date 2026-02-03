export interface DayData {
  id: number;
  date: number; // Day of the month (12-16)
  theme: string;
  title: string;
  subtitle: string;
  text: string;
  hint: string;
  interactionType: 'click' | 'quiz' | 'slider' | 'countdown' | 'reveal';
  interactionPrompt: string;
  successMessage: string;
  icon: string;
}

export const days: DayData[] = [
  {
    id: 1,
    date: 12,
    theme: "gaze",
    title: "O olhar",
    subtitle: "Dia 1 de 5",
    text: "Algumas pessoas veem. Outras realmente percebem.",
    hint: "Prestar atenção muda tudo.",
    interactionType: "click",
    interactionPrompt: "Toque para focar",
    successMessage: "Você viu além da superfície.",
    icon: "eye"
  },
  {
    id: 2,
    date: 13,
    theme: "memory",
    title: "A memória",
    subtitle: "Dia 2 de 5",
    text: "O que lembramos diz quem somos.",
    hint: "Alguns momentos merecem ser guardados para sempre.",
    interactionType: "quiz",
    interactionPrompt: "Qual foi nosso primeiro encontro?",
    successMessage: "Você guarda o que importa.",
    icon: "heart"
  },
  {
    id: 3,
    date: 14,
    theme: "detail",
    title: "O detalhe",
    subtitle: "Dia 3 de 5",
    text: "A beleza mora nos pequenos gestos.",
    hint: "Ajuste o foco e veja o que estava escondido.",
    interactionType: "slider",
    interactionPrompt: "Ajuste a nitidez",
    successMessage: "Tem coisas que só fazem sentido quando a gente presta atenção nos detalhes.",
    icon: "sparkles"
  },
  {
    id: 4,
    date: 15,
    theme: "time",
    title: "O tempo",
    subtitle: "Dia 4 de 5",
    text: "O tempo passa, mas o que sentimos permanece.",
    hint: "Cada segundo conta quando é com você.",
    interactionType: "countdown",
    interactionPrompt: "Observe o tempo passar",
    successMessage: "O tempo com você nunca é perdido.",
    icon: "clock"
  },
  {
    id: 5,
    date: 16,
    theme: "record",
    title: "O registro",
    subtitle: "O dia chegou",
    text: "E tem foto que só tu sabe tirar",
    hint: "Para que você capture o mundo do seu jeito.",
    interactionType: "reveal",
    interactionPrompt: "E se tu pudesse capturar tudo isso?",
    successMessage: "Feliz aniversário, meu amor.",
    icon: "camera"
  }
];

export const gameConfig = {
  startDate: 12, // Day of month when game starts
  endDate: 16, // Birthday
  birthdayMonth: 1, // February (0-indexed would be 1)
  giftName: "Kodak Film F8",
  giftDescription: "Tô ansiosa pra ver as fotos lindas que tu vai tirar, te amo",
};
