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
}

export interface AppTheme {
  lightTheme: ThemeConfig;
  darkTheme: ThemeConfig;
  currentMode: 'light' | 'dark';
}

const defaultLightTheme: ThemeConfig = {
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
};

const defaultDarkTheme: ThemeConfig = {
  primaryColor: '#3b82f6',
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',
  
  secondaryColor: '#94a3b8',
  secondaryLight: '#cbd5e1',
  secondaryDark: '#64748b',
  
  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  
  backgroundColor: '#0f172a',
  surfaceColor: '#1e293b',
  surfaceHover: '#334155',
  
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textDisabled: '#64748b',
  
  borderColor: '#334155',
  borderFocus: '#60a5fa',
  
  borderRadius: '0.375rem',
  borderRadiusLg: '0.5rem',
  
  fontSize: '1rem',
  fontWeight: '400',
};

const defaultAppTheme: AppTheme = {
  lightTheme: defaultLightTheme,
  darkTheme: defaultDarkTheme,
  currentMode: 'light'
};

interface ThemeContextType {
  appTheme: AppTheme;
  currentTheme: ThemeConfig;
  updateLightTheme: (newTheme: Partial<ThemeConfig>) => void;
  updateDarkTheme: (newTheme: Partial<ThemeConfig>) => void;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  resetThemes: () => void;
  resetCurrentTheme: () => void;
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
  const [appTheme, setAppTheme] = useState<AppTheme>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        // Проверяем, что у нас есть необходимые поля
        if (parsed.lightTheme && parsed.darkTheme && parsed.currentMode) {
          return parsed;
        }
      } catch {
        // Если ошибка парсинга, используем дефолтную тему
      }
    }
    return defaultAppTheme;
  });

  const currentTheme = appTheme.currentMode === 'light' ? appTheme.lightTheme : appTheme.darkTheme;

  // Применение CSS переменных
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', currentTheme.primaryColor);
    root.style.setProperty('--primary-light', currentTheme.primaryLight);
    root.style.setProperty('--primary-dark', currentTheme.primaryDark);
    
    root.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    root.style.setProperty('--secondary-light', currentTheme.secondaryLight);
    root.style.setProperty('--secondary-dark', currentTheme.secondaryDark);
    
    root.style.setProperty('--success-color', currentTheme.successColor);
    root.style.setProperty('--warning-color', currentTheme.warningColor);
    root.style.setProperty('--error-color', currentTheme.errorColor);
    
    root.style.setProperty('--background-color', currentTheme.backgroundColor);
    root.style.setProperty('--surface-color', currentTheme.surfaceColor);
    root.style.setProperty('--surface-hover', currentTheme.surfaceHover);
    
    root.style.setProperty('--text-primary', currentTheme.textPrimary);
    root.style.setProperty('--text-secondary', currentTheme.textSecondary);
    root.style.setProperty('--text-disabled', currentTheme.textDisabled);
    
    root.style.setProperty('--border-color', currentTheme.borderColor);
    root.style.setProperty('--border-focus', currentTheme.borderFocus);
    
    root.style.setProperty('--border-radius', currentTheme.borderRadius);
    root.style.setProperty('--border-radius-lg', currentTheme.borderRadiusLg);
    
    root.style.setProperty('--font-size-base', currentTheme.fontSize);
    root.style.setProperty('--font-weight-normal', currentTheme.fontWeight);
    
    // Устанавливаем data-theme атрибут
    document.documentElement.setAttribute('data-theme', appTheme.currentMode);
  }, [currentTheme, appTheme.currentMode]);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(appTheme));
  }, [appTheme]);

  const updateLightTheme = (newTheme: Partial<ThemeConfig>) => {
    setAppTheme(prev => ({
      ...prev,
      lightTheme: { ...prev.lightTheme, ...newTheme }
    }));
  };

  const updateDarkTheme = (newTheme: Partial<ThemeConfig>) => {
    setAppTheme(prev => ({
      ...prev,
      darkTheme: { ...prev.darkTheme, ...newTheme }
    }));
  };

  const setMode = (mode: 'light' | 'dark') => {
    setAppTheme(prev => ({
      ...prev,
      currentMode: mode
    }));
  };

  const toggleMode = () => {
    setAppTheme(prev => ({
      ...prev,
      currentMode: prev.currentMode === 'light' ? 'dark' : 'light'
    }));
  };

  const resetThemes = () => {
    setAppTheme(defaultAppTheme);
  };

  const resetCurrentTheme = () => {
    if (appTheme.currentMode === 'light') {
      updateLightTheme(defaultLightTheme);
    } else {
      updateDarkTheme(defaultDarkTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{
      appTheme,
      currentTheme,
      updateLightTheme,
      updateDarkTheme,
      setMode,
      toggleMode,
      resetThemes,
      resetCurrentTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};