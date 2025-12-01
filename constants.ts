import { Theme } from './types';

export const THEMES: Theme[] = [
  {
    id: 'minimal',
    name: 'Simple White',
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'text-slate-500',
    secondary: 'bg-slate-200',
    barBg: 'bg-slate-200',
    barFill: 'bg-slate-800',
    icon: '🤍'
  },
  {
    id: 'midnight',
    name: 'Deep Space',
    bg: 'bg-slate-900',
    text: 'text-white',
    accent: 'text-slate-400',
    secondary: 'bg-slate-800',
    barBg: 'bg-slate-800',
    barFill: 'bg-blue-500',
    icon: '🌌'
  },
  {
    id: 'matcha',
    name: 'Matcha Latte',
    bg: 'bg-stone-100',
    text: 'text-stone-800',
    accent: 'text-green-700',
    secondary: 'bg-stone-200',
    barBg: 'bg-stone-300',
    barFill: 'bg-green-600',
    icon: '🍵'
  },
  {
    id: 'bubblegum',
    name: 'Candy Pop',
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    accent: 'text-pink-500',
    secondary: 'bg-pink-100',
    barBg: 'bg-pink-200',
    barFill: 'bg-pink-500',
    icon: '🍬'
  },
  {
    id: 'ocean',
    name: 'Electric Blue',
    bg: 'bg-blue-950',
    text: 'text-cyan-50',
    accent: 'text-cyan-400',
    secondary: 'bg-blue-900',
    barBg: 'bg-blue-900',
    barFill: 'bg-cyan-400',
    icon: '⚡'
  },
  {
    id: 'sunset',
    name: 'Golden Hour',
    bg: 'bg-orange-50',
    text: 'text-orange-950',
    accent: 'text-orange-600',
    secondary: 'bg-orange-100',
    barBg: 'bg-orange-200',
    barFill: 'bg-orange-500',
    icon: '🌅'
  }
];

export const PRESET_TIMES = [5, 10, 15, 30, 60];