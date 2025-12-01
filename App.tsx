import React, { useState, useCallback, useEffect } from 'react';
import SetupView from './components/SetupView';
import DisplayView from './components/DisplayView';
import { THEMES } from './constants';
import { AppState, Theme } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isFullScreen: false,
    minutesAway: 10,
    returnTime: null,
    startTime: null,
    message: '',
    themeId: 'minimal',
    mode: 'setup'
  });

  const currentTheme = THEMES.find(t => t.id === state.themeId) || THEMES[0];

  const handleStart = useCallback(() => {
    const now = new Date();
    const returnTime = new Date(now.getTime() + state.minutesAway * 60000);
    
    setState(prev => ({
      ...prev,
      startTime: now,
      returnTime: returnTime,
      mode: 'display'
    }));
    
    // Auto enter full screen if possible
    enterFullScreen();
  }, [state.minutesAway]);

  const handleExit = useCallback(() => {
    setState(prev => ({
      ...prev,
      mode: 'setup',
      startTime: null,
      returnTime: null
    }));
    exitFullScreen();
  }, []);

  const enterFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setState(prev => ({ ...prev, isFullScreen: true }));
      }
    } catch (e) {
      console.error("Fullscreen denied or failed", e);
    }
  };

  const exitFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setState(prev => ({ ...prev, isFullScreen: false }));
      }
    } catch (e) {
      console.error("Exit Fullscreen failed", e);
    }
  };

  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  }, []);

  // Listen for fullscreen changes (e.g. user presses ESC)
  useEffect(() => {
    const handleFsChange = () => {
      setState(prev => ({ ...prev, isFullScreen: !!document.fullscreenElement }));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <>
      {state.mode === 'setup' ? (
        <SetupView
          currentTheme={currentTheme}
          message={state.message}
          setMessage={(msg) => setState(prev => ({ ...prev, message: msg }))}
          minutes={state.minutesAway}
          setMinutes={(min) => setState(prev => ({ ...prev, minutesAway: min }))}
          setThemeId={(id) => setState(prev => ({ ...prev, themeId: id }))}
          onStart={handleStart}
        />
      ) : (
        <DisplayView
          theme={currentTheme}
          message={state.message}
          returnTime={state.returnTime}
          startTime={state.startTime}
          onExit={handleExit}
          toggleFullScreen={toggleFullScreen}
          isFullScreen={state.isFullScreen}
        />
      )}
    </>
  );
};

export default App;