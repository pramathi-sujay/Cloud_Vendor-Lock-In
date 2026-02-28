import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const s = localStorage.getItem('ccp-theme');
        return s ? s === 'dark' : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('light-mode');
        } else {
            root.classList.add('light-mode');
        }
        localStorage.setItem('ccp-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(v => !v) }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
