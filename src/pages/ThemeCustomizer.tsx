import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Typography, Card, Input } from '../components';
import { ColorPicker } from '../components/ColorPicker/ColorPicker';
import '../styles/global.scss';

const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme, toggleMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing'>('colors');

  const colorGroups = [
    {
      title: 'Основные цвета',
      colors: [
        { key: 'primaryColor', label: 'Основной цвет', value: theme.primaryColor },
        { key: 'primaryLight', label: 'Основной светлый', value: theme.primaryLight },
        { key: 'primaryDark', label: 'Основной темный', value: theme.primaryDark },
      ]
    },
    {
      title: 'Вторичные цвета',
      colors: [
        { key: 'secondaryColor', label: 'Вторичный цвет', value: theme.secondaryColor },
        { key: 'secondaryLight', label: 'Вторичный светлый', value: theme.secondaryLight },
        { key: 'secondaryDark', label: 'Вторичный темный', value: theme.secondaryDark },
      ]
    },
    {
      title: 'Статусные цвета',
      colors: [
        { key: 'successColor', label: 'Успех', value: theme.successColor },
        { key: 'warningColor', label: 'Предупреждение', value: theme.warningColor },
        { key: 'errorColor', label: 'Ошибка', value: theme.errorColor },
      ]
    },
    {
      title: 'Фон и поверхности',
      colors: [
        { key: 'backgroundColor', label: 'Фон', value: theme.backgroundColor },
        { key: 'surfaceColor', label: 'Поверхность', value: theme.surfaceColor },
        { key: 'surfaceHover', label: 'Поверхность при наведении', value: theme.surfaceHover },
      ]
    },
    {
      title: 'Текст',
      colors: [
        { key: 'textPrimary', label: 'Основной текст', value: theme.textPrimary },
        { key: 'textSecondary', label: 'Вторичный текст', value: theme.textSecondary },
        { key: 'textDisabled', label: 'Отключенный текст', value: theme.textDisabled },
      ]
    },
    {
      title: 'Границы',
      colors: [
        { key: 'borderColor', label: 'Граница', value: theme.borderColor },
        { key: 'borderFocus', label: 'Граница в фокусе', value: theme.borderFocus },
      ]
    }
  ];

  const handleColorChange = (key: string, value: string) => {
    updateTheme({ [key]: value });
  };

  const handleInputChange = (key: string, value: string) => {
    updateTheme({ [key]: value });
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Typography variant="h1" align="center">
          Настройка темы приложения
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          Измените цвета, типографику и размеры для создания уникальной темы
        </Typography>
      </div>

      {/* Переключатель режима и действия */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div className="flex gap-md">
          <Button 
            variant={theme.mode === 'light' ? 'primary' : 'secondary'} 
            onClick={toggleMode}
          >
            {theme.mode === 'light' ? '🌙 Темная тема' : '☀️ Светлая тема'}
          </Button>
        </div>
        <Button variant="ghost" onClick={resetTheme}>
          Сбросить настройки
        </Button>
      </div>

      {/* Демонстрационная область */}
      <Card spacing="spacious" style={{ marginBottom: '2rem' }}>
        <Typography variant="h3" gutterBottom>Демонстрация компонентов</Typography>
        
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
                value={theme.fontSize}
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
                value={theme.fontWeight}
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
                value={theme.borderRadius}
                onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                placeholder="0.375rem"
              />
              <Input
                label="Большое скругление"
                value={theme.borderRadiusLg}
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