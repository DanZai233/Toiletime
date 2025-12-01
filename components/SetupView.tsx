import React from 'react';
import { Theme } from '../types';
import { THEMES, PRESET_TIMES } from '../constants';
import { Timer, Check, Palmtree } from 'lucide-react';

interface SetupViewProps {
  currentTheme: Theme;
  message: string;
  setMessage: (msg: string) => void;
  minutes: number;
  setMinutes: (min: number) => void;
  setThemeId: (id: string) => void;
  onStart: () => void;
}

const SetupView: React.FC<SetupViewProps> = ({
  currentTheme,
  message,
  setMessage,
  minutes,
  setMinutes,
  setThemeId,
  onStart
}) => {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 ${currentTheme.bg}`}>
      
      <div className="w-full max-w-2xl animate-fade-in-up">
        <header className="mb-10 text-center">
          <h1 className={`text-5xl font-extrabold mb-2 ${currentTheme.text} flex items-center justify-center gap-3`}>
            <Palmtree size={48} />
            卫生间Time
          </h1>
          <p className={`text-xl ${currentTheme.accent}`}>Prepare your away status</p>
        </header>

        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          
          {/* Reason Input */}
          <div className="mb-8">
            <label className={`block text-sm font-bold uppercase tracking-wider mb-2 ${currentTheme.accent}`}>
              I'm going to...
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Grab a coffee..."
              className={`w-full text-2xl p-4 rounded-xl border-2 bg-white/80 focus:outline-none transition-colors ${currentTheme.text}`}
              style={{ borderColor: 'transparent' }}
            />
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <label className={`block text-sm font-bold uppercase tracking-wider mb-2 ${currentTheme.accent}`}>
              Returning in...
            </label>
            <div className="flex flex-wrap gap-3">
              {PRESET_TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setMinutes(time)}
                  className={`px-6 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                    minutes === time
                      ? `${currentTheme.barFill} text-white shadow-lg scale-105`
                      : 'bg-white text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {time}m
                </button>
              ))}
              <div className="relative flex-1 min-w-[120px]">
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full h-full px-6 py-3 rounded-xl font-bold text-lg bg-white text-center text-slate-700 focus:outline-none"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">m</span>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="mb-10">
            <label className={`block text-sm font-bold uppercase tracking-wider mb-3 ${currentTheme.accent}`}>
              Vibe
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setThemeId(theme.id)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-4 ${
                    currentTheme.id === theme.id ? `border-black/20 scale-110 shadow-md` : 'border-transparent hover:scale-105'
                  } ${theme.bg}`}
                >
                  <span className="text-2xl">{theme.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className={`w-full py-5 rounded-2xl text-2xl font-black text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 ${currentTheme.barFill}`}
          >
            <Timer size={28} strokeWidth={3} />
            Start Timer
          </button>

        </div>
      </div>
    </div>
  );
};

export default SetupView;