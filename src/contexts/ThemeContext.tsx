import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeConfig {
  // Основные цвета
  primaryColor: string;
  primaryLight: string;
  primaryDark: string;
  
  secondaryColor: string;
  secondaryLight: string;
  secondaryDark: string;
  
  successColor: string;
  warningColor: string;
  errorColor: string;
  
  // Фон и поверхности
  backgroundColor: string;
  surfaceColor: string;
  surfaceHover: string;
  
  // Текст
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  
  // Границы
  borderColor: string;
  borderFocus: string;
  
  // Размеры
  borderRadius: string;
  borderRadiusLg: string;
  
  // Шрифты
  fontSize: string;
  fontWeight: string;
  
  // Тема (light/dark)
  mode: 'light' | 'dark';
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  
  secondaryColor: '#64748b',
  secondaryLight: '#94a3b8',
  secondaryDark: '#475569',
  
  successColor: '#059669',
  warningColor: '#d97706',
  errorColor: '#dc2626',
  
  backgroundColor: '#ffffff',
  surfaceColor: '#f8fafc',
  surfaceHover: '#f1f5f9',
  
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textDisabled: '#94a3b8',
  
  borderColor: '#e2e8f0',
  borderFocus: '#3b82f6',
  
  borderRadius: '0.375rem',
  borderRadiusLg: '0.5rem',
  
  fontSize: '1rem',
  fontWeight: '400',
  
  mode: 'light'
};

const darkTheme: ThemeConfig = {
  ...defaultTheme,
  backgroundColor: '#0f172a',
  surfaceColor: '#1e293b',
  surfaceHover: '#334155',
  
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textDisabled: '#64748b',
  
  borderColor: '#334155',
  borderFocus: '#60a5fa',
  
  mode: 'dark'
};

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  // Применение CSS переменных
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--secondary-light', theme.secondaryLight);
    root.style.setProperty('--secondary-dark', theme.secondaryDark);
    
    root.style.setProperty('--success-color', theme.successColor);
    root.style.setProperty('--warning-color', theme.warningColor);
    root.style.setProperty('--error-color', theme.errorColor);
    
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--surface-color', theme.surfaceColor);
    root.style.setProperty('--surface-hover', theme.surfaceHover);
    
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-disabled', theme.textDisabled);
    
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--border-focus', theme.borderFocus);
    
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--border-radius-lg', theme.borderRadiusLg);
    
    root.style.setProperty('--font-size-base', theme.fontSize);
    root.style.setProperty('--font-weight-normal', theme.fontWeight);
    
    // Устанавливаем data-theme атрибут
    document.documentElement.setAttribute('data-theme', theme.mode);
  }, [theme]);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const toggleMode = () => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light';
    const baseTheme = newMode === 'dark' ? darkTheme : defaultTheme;
    setTheme(prev => ({ ...baseTheme, ...prev, mode: newMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};