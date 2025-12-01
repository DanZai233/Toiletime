export interface Theme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
  barBg: string;
  barFill: string;
  icon: string; // Emoji or visual identifier
}

export interface AppState {
  isFullScreen: boolean;
  minutesAway: number;
  returnTime: Date | null;
  startTime: Date | null;
  message: string;
  themeId: string;
  mode: 'setup' | 'display';
}