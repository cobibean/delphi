// context/ThemeContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Mode = 'professional' | 'degen';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  mode: Mode;
  toggleMode: () => void;
  isDegenMode: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark', // default theme
  toggleTheme: () => {},
  mode: 'professional', // default mode
  toggleMode: () => {},
  isDegenMode: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark'); // Initialize with dark
  const [mode, setMode] = useState<Mode>('professional'); // Initialize with professional mode

  // On mount, check for saved theme and mode in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedMode = localStorage.getItem('mode') as Mode;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark'); // default to dark mode
    }
    
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode('professional'); // default to professional mode
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Update localStorage and document class when mode changes
  useEffect(() => {
    localStorage.setItem('mode', mode);
    if (mode === 'degen') {
      document.documentElement.classList.add('degen-mode');
    } else {
      document.documentElement.classList.remove('degen-mode');
    }
  }, [mode]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'professional' ? 'degen' : 'professional'));
  };

  const isDegenMode = mode === 'degen';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode, toggleMode, isDegenMode }}>
      {children}
    </ThemeContext.Provider>
  );
};