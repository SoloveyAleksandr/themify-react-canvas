import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Typography } from '../Typography/Typography';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode} form submitted:`, formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className={styles.modalHeader}>
          <Typography variant="h2" align="center">
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </Typography>
        </div>

        <div className={styles.modeToggle}>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === 'login' ? styles.active : ''}`}
            onClick={() => setMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === 'register' ? styles.active : ''}`}
            onClick={() => setMode('register')}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {mode === 'register' && (
            <div className={styles.nameRow}>
              <Input
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ваше имя"
                size="small"
                required
              />
              <Input
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ваша фамилия"
                size="small"
                required
              />
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            size="small"
            required
          />

          <Input
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={mode === 'login' ? 'Введите пароль' : 'Создайте пароль'}
            size="small"
            required
          />

          {mode === 'register' && (
            <Input
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              size="small"
              required
            />
          )}

          <Button type="submit" variant="primary" size="medium" fullWidth>
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>

          <div className={styles.divider}>
            <span>или</span>
          </div>

          <Button variant="outline" size="medium" fullWidth>
            Продолжить с Google
          </Button>
        </form>

        <div className={styles.modalFooter}>
          <Typography variant="small" color="secondary" align="center">
            {mode === 'login' ? (
              <>
                Нет аккаунта?{' '}
                <button
                  type="button"
                  className={styles.switchModeButton}
                  onClick={() => setMode('register')}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{' '}
                <button
                  type="button"
                  className={styles.switchModeButton}
                  onClick={() => setMode('login')}
                >
                  Войти
                </button>
              </>
            )}
          </Typography>
        </div>
      </div>
    </div>
  );
};