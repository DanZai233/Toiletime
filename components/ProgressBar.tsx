import React, { useEffect, useState } from 'react';
import { Theme } from '../types';
import { Plane, Cat, Rocket, Coffee, Clock } from 'lucide-react';

interface ProgressBarProps {
  startTime: Date | null;
  returnTime: Date | null;
  theme: Theme;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ startTime, returnTime, theme }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!startTime || !returnTime) return;

    const updateProgress = () => {
      const now = new Date().getTime();
      const start = startTime.getTime();
      const end = returnTime.getTime();
      const totalDuration = end - start;
      const elapsed = now - start;

      let percentage = (elapsed / totalDuration) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      setProgress(percentage);
    };

    const interval = setInterval(updateProgress, 1000);
    updateProgress(); // Initial call

    return () => clearInterval(interval);
  }, [startTime, returnTime]);

  const getIcon = () => {
    if (theme.id === 'midnight' || theme.id === 'ocean') return <Rocket size={24} className="text-white transform rotate-45" />;
    if (theme.id === 'bubblegum') return <Cat size={24} className="text-white" />;
    if (theme.id === 'matcha') return <Coffee size={24} className="text-white" />;
    return <Clock size={24} className="text-white" />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 mb-12">
      <div className={`h-4 w-full rounded-full ${theme.barBg} relative overflow-visible`}>
        {/* Background Track */}
        
        {/* Fill */}
        <div 
          className={`h-full rounded-full ${theme.barFill} transition-all duration-1000 ease-linear relative`}
          style={{ width: `${progress}%` }}
        >
          {/* Moving Indicator Bubble */}
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 ${theme.barFill} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}>
            {getIcon()}
          </div>
        </div>

        {/* Time Labels */}
        <div className={`flex justify-between mt-4 text-lg font-bold ${theme.accent} opacity-80`}>
          <span>Start</span>
          <span>Almost Back!</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;