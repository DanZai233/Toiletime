import React, { useEffect, useState } from 'react';
import { Theme } from '../types';
import ProgressBar from './ProgressBar';
import { X, Maximize, Minimize } from 'lucide-react';

interface DisplayViewProps {
  theme: Theme;
  message: string;
  returnTime: Date | null;
  startTime: Date | null;
  onExit: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
}

const DisplayView: React.FC<DisplayViewProps> = ({
  theme,
  message,
  returnTime,
  startTime,
  onExit,
  toggleFullScreen,
  isFullScreen
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed inset-0 w-full h-full flex flex-col ${theme.bg} ${theme.text} theme-transition`}>
      {/* Controls (Hidden in corner, visible on hover) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity z-50">
        <button 
          onClick={toggleFullScreen} 
          className="p-3 bg-black/10 hover:bg-black/20 rounded-full backdrop-blur-md text-current"
        >
          {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
        <button 
          onClick={onExit} 
          className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        
        {/* Status Message */}
        <div className="mb-16 animate-fade-in-down">
          <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold uppercase tracking-widest mb-6 ${theme.secondary} ${theme.accent}`}>
            Current Status
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-tight max-w-5xl mx-auto break-words">
            {message || "Busy"}
          </h1>
        </div>

        {/* Big Time Display */}
        <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12 mb-20 animate-fade-in-up">
          <div className="flex flex-col items-center">
             <span className={`text-xl font-bold uppercase tracking-wider mb-2 ${theme.accent}`}>I'll be back at</span>
             <span className="text-7xl md:text-9xl font-black tracking-tighter">
               {formatTime(returnTime)}
             </span>
          </div>
        </div>

      </main>

      {/* Footer / Progress */}
      <footer className="w-full pb-8">
         <ProgressBar startTime={startTime} returnTime={returnTime} theme={theme} />
         <div className={`text-center font-bold text-xl opacity-60 ${theme.accent}`}>
            Current Time: {formatTime(currentTime)}
         </div>
      </footer>
    </div>
  );
};

export default DisplayView;