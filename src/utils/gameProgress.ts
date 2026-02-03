import { gameConfig, days } from '@/data/days';

const STORAGE_KEY = 'birthday-game-progress';

interface GameProgress {
  completedDays: number[];
  lastVisit: string;
}

export const getProgress = (): GameProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading progress:', e);
  }
  return { completedDays: [], lastVisit: new Date().toISOString() };
};

export const saveProgress = (progress: GameProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

export const markDayComplete = (dayId: number): void => {
  const progress = getProgress();
  if (!progress.completedDays.includes(dayId)) {
    progress.completedDays.push(dayId);
    progress.lastVisit = new Date().toISOString();
    saveProgress(progress);
  }
};

export const isDayComplete = (dayId: number): boolean => {
  const progress = getProgress();
  return progress.completedDays.includes(dayId);
};

export const getCurrentDate = (): { day: number; month: number; year: number } => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
  };
};

export const isDayUnlocked = (dayDate: number): boolean => {
  const { day } = getCurrentDate();
  // A day is unlocked if today's date is >= the day's date
  return day >= dayDate;
};

export const getUnlockedDays = (): number[] => {
  const { day } = getCurrentDate();
  return days
    .filter(d => d.date <= day)
    .map(d => d.id);
};

export const getAllDaysCompleted = (): boolean => {
  const progress = getProgress();
  return days.every(d => progress.completedDays.includes(d.id));
};

export const getNextUnlockDate = (): number | null => {
  const { day } = getCurrentDate();
  const nextDay = days.find(d => d.date > day);
  return nextDay ? nextDay.date : null;
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
