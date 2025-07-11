import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Typography, Card, Input } from '../components';
import { ColorPicker } from '../components/ColorPicker/ColorPicker';
import '../styles/global.scss';

const ThemeCustomizer: React.FC = () => {
  const { 
    appTheme, 
    currentTheme, 
    updateLightTheme, 
    updateDarkTheme, 
    toggleMode, 
    resetThemes, 
    resetCurrentTheme 
  } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors');

  // Определяем, какую тему мы редактируем
  const isLightMode = appTheme.currentMode === 'light';
  const editingTheme = isLightMode ? appTheme.lightTheme : appTheme.darkTheme;
  const updateCurrentTheme = isLightMode ? updateLightTheme : updateDarkTheme;

  const colorGroups = [
    {
      title: 'Основные цвета',
      colors: [
        { key: 'primaryColor', label: 'Основной цвет', value: editingTheme.primaryColor },
        { key: 'primaryLight', label: 'Основной светлый', value: editingTheme.primaryLight },
        { key: 'primaryDark', label: 'Основной темный', value: editingTheme.primaryDark },
      ]
    },
    {
      title: 'Вторичные цвета',
      colors: [
        { key: 'secondaryColor', label: 'Вторичный цвет', value: editingTheme.secondaryColor },
        { key: 'secondaryLight', label: 'Вторичный светлый', value: editingTheme.secondaryLight },
        { key: 'secondaryDark', label: 'Вторичный темный', value: editingTheme.secondaryDark },
      ]
    },
    {
      title: 'Статусные цвета',
      colors: [
        { key: 'successColor', label: 'Успех', value: editingTheme.successColor },
        { key: 'warningColor', label: 'Предупреждение', value: editingTheme.warningColor },
        { key: 'errorColor', label: 'Ошибка', value: editingTheme.errorColor },
      ]
    },
    {
      title: 'Фон и поверхности',
      colors: [
        { key: 'backgroundColor', label: 'Фон', value: editingTheme.backgroundColor },
        { key: 'surfaceColor', label: 'Поверхность', value: editingTheme.surfaceColor },
        { key: 'surfaceHover', label: 'Поверхность при наведении', value: editingTheme.surfaceHover },
      ]
    },
    {
      title: 'Текст',
      colors: [
        { key: 'textPrimary', label: 'Основной текст', value: editingTheme.textPrimary },
        { key: 'textSecondary', label: 'Вторичный текст', value: editingTheme.textSecondary },
        { key: 'textDisabled', label: 'Отключенный текст', value: editingTheme.textDisabled },
      ]
    },
    {
      title: 'Границы',
      colors: [
        { key: 'borderColor', label: 'Граница', value: editingTheme.borderColor },
        { key: 'borderFocus', label: 'Граница в фокусе', value: editingTheme.borderFocus },
      ]
    }
  ];

  const handleColorChange = (key: string, value: string) => {
    updateCurrentTheme({ [key]: value });
  };

  const handleInputChange = (key: string, value: string) => {
    updateCurrentTheme({ [key]: value });
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h1" align="center">
          Настройка темы приложения
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          Настройте светлую и темную темы независимо друг от друга
        </Typography>
      </div>

      {/* Переключатель режима и действия */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div className="flex gap-md">
          <Button 
            variant={isLightMode ? 'primary' : 'secondary'} 
            onClick={toggleMode}
          >
            {isLightMode ? '🌙 Переключить на темную' : '☀️ Переключить на светлую'}
          </Button>
          <div style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: 'var(--surface-color)',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border-color)'
          }}>
            <Typography variant="body2" color="secondary">
              Редактируется: {isLightMode ? 'Светлая тема' : 'Темная тема'}
            </Typography>
          </div>
        </div>
        <div className="flex gap-sm">
          <Button variant="ghost" onClick={resetCurrentTheme}>
            Сбросить текущую тему
          </Button>
          <Button variant="ghost" onClick={resetThemes}>
            Сбросить все темы
          </Button>
        </div>
      </div>

      {/* Демонстрационная область */}
      <Card spacing="spacious" style={{ marginBottom: '2rem' }}>
        <Typography variant="h3" gutterBottom>
          Демонстрация компонентов ({isLightMode ? 'светлая тема' : 'темная тема'})
        </Typography>
        
        <div className="flex gap-md" style={{ marginBottom: '1rem' }}>
          <Button variant="primary">Основная кнопка</Button>
          <Button variant="secondary">Вторичная кнопка</Button>
          <Button variant="success">Успех</Button>
          <Button variant="warning">Предупреждение</Button>
          <Button variant="error">Ошибка</Button>
        </div>

        <div style={{ maxWidth: '300px', marginBottom: '1rem' }}>
          <Input 
            label="Пример поля ввода" 
            placeholder="Введите текст..." 
            helperText="Вспомогательный текст"
          />
        </div>

        <div>
          <Typography variant="h4">Заголовок H4</Typography>
          <Typography variant="body1">
            Это обычный текст с примером того, как выглядят различные элементы в выбранной теме.
          </Typography>
          <Typography variant="body2" color="secondary">
            Вторичный текст меньшего размера.
          </Typography>
        </div>

        {/* Показываем предпросмотр другой темы */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem',
          backgroundColor: isLightMode ? appTheme.darkTheme.backgroundColor : appTheme.lightTheme.backgroundColor,
          color: isLightMode ? appTheme.darkTheme.textPrimary : appTheme.lightTheme.textPrimary,
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <Typography variant="h5" style={{ marginBottom: '0.5rem' }}>
            Предпросмотр {isLightMode ? 'темной' : 'светлой'} темы
          </Typography>
          <Typography variant="body2">
            Так будет выглядеть другая тема при переключении
          </Typography>
        </div>
      </Card>

      {/* Вкладки настроек */}
      <div className="flex gap-sm" style={{ marginBottom: '1rem' }}>
        <Button 
          variant={activeTab === 'colors' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('colors')}
        >
          Цвета
        </Button>
        <Button 
          variant={activeTab === 'typography' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('typography')}
        >
          Типографика
        </Button>
        <Button 
          variant={activeTab === 'spacing' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('spacing')}
        >
          Размеры
        </Button>
      </div>

      {/* Содержимое вкладок */}
      {activeTab === 'colors' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {colorGroups.map((group) => (
            <Card key={group.title} spacing="normal">
              <Typography variant="h5" gutterBottom>{group.title}</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {group.colors.map((color) => (
                  <ColorPicker
                    key={color.key}
                    label={color.label}
                    value={color.value}
                    onChange={(value) => handleColorChange(color.key, value)}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'typography' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <Card spacing="normal">
            <Typography variant="h5" gutterBottom>Размеры шрифта</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Базовый размер шрифта"
                value={editingTheme.fontSize}
                onChange={(e) => handleInputChange('fontSize', e.target.value)}
                placeholder="1rem"
              />
            </div>
          </Card>
          
          <Card spacing="normal">
            <Typography variant="h5" gutterBottom>Вес шрифта</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Обычный вес шрифта"
                value={editingTheme.fontWeight}
                onChange={(e) => handleInputChange('fontWeight', e.target.value)}
                placeholder="400"
              />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'spacing' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <Card spacing="normal">
            <Typography variant="h5" gutterBottom>Скругления</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Базовое скругление"
                value={editingTheme.borderRadius}
                onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                placeholder="0.375rem"
              />
              <Input
                label="Большое скругление"
                value={editingTheme.borderRadiusLg}
                onChange={(e) => handleInputChange('borderRadiusLg', e.target.value)}
                placeholder="0.5rem"
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ThemeCustomizer;