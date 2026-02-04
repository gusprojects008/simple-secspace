import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState('dark');
  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div data-theme={theme} className='main-wrapper'>{children}</div>
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
};
