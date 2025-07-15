import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Typography } from '../components/Typography/Typography';
import { Card } from '../components/Card/Card';
import styles from './Auth.module.scss';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <Card spacing="large" className={styles.authCard}>
          <div className={styles.authHeader}>
            <Typography variant="h1" align="center">
              Вход в аккаунт
            </Typography>
            <Typography variant="body" color="secondary" align="center">
              Войдите, чтобы получить доступ к услугам
            </Typography>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
              required
            />

            <Input
              label="Пароль"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />

            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Запомнить меня
              </label>
            </div>

            <Button type="submit" variant="primary" size="large" fullWidth>
              Войти
            </Button>

            <div className={styles.authLinks}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Забыли пароль?
              </Link>
            </div>

            <div className={styles.divider}>
              <span>или</span>
            </div>

            <div className={styles.socialButtons}>
              <Button variant="outline" size="medium" fullWidth>
                Войти через Google
              </Button>
            </div>

            <div className={styles.authFooter}>
              <Typography variant="body" color="secondary" align="center">
                Нет аккаунта?{' '}
                <Link to="/register" className={styles.authLink}>
                  Зарегистрироваться
                </Link>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;