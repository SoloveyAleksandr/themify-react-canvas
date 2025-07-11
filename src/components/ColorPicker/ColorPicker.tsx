import React, { useState, useRef } from 'react';
import styles from './ColorPicker.module.scss';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (newColor: string) => {
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor);
    // Проверяем, является ли значение валидным цветом
    if (/^#[0-9A-F]{6}$/i.test(newColor) || /^#[0-9A-F]{3}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  const handlePreviewClick = () => {
    colorInputRef.current?.click();
  };

  return (
    <div className={styles.colorPicker}>
      <label className={styles.label}>{label}</label>
      <div className={styles.colorInput}>
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: value }}
          onClick={handlePreviewClick}
        />
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={(e) => handleColorChange(e.target.value)}
          className={styles.hiddenInput}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.colorInputField}
          placeholder="#000000"
        />
      </div>
    </div>
  );
};