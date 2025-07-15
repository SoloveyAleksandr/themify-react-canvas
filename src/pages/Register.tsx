import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Typography } from '../components/Typography/Typography';
import { Card } from '../components/Card/Card';
import styles from './Auth.module.scss';

type UserType = 'client' | 'business';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('client');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessCategory: '',
    businessDescription: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted:', { userType, ...formData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
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
              Регистрация
            </Typography>
            <Typography variant="body" color="secondary" align="center">
              Присоединяйтесь к нашей платформе услуг
            </Typography>
          </div>

          <div className={styles.userTypeSelector}>
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'client' ? styles.active : ''}`}
              onClick={() => setUserType('client')}
            >
              <Typography variant="subtitle">Клиент</Typography>
              <Typography variant="small" color="secondary">
                Ищу услуги
              </Typography>
            </button>
            <button
              type="button"
              className={`${styles.userTypeButton} ${userType === 'business' ? styles.active : ''}`}
              onClick={() => setUserType('business')}
            >
              <Typography variant="subtitle">Бизнес</Typography>
              <Typography variant="small" color="secondary">
                Предоставляю услуги
              </Typography>
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.nameRow}>
              <Input
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ваше имя"
                required
              />
              <Input
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ваша фамилия"
                required
              />
            </div>

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
              label="Телефон"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
              required
            />

            {userType === 'business' && (
              <>
                <Input
                  label="Название бизнеса"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Название вашей компании"
                  required
                />

                <div className={styles.selectWrapper}>
                  <label className={styles.selectLabel}>Категория услуг</label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    <option value="beauty">Красота и здоровье</option>
                    <option value="fitness">Фитнес и спорт</option>
                    <option value="education">Образование</option>
                    <option value="repair">Ремонт и строительство</option>
                    <option value="automotive">Автомобильные услуги</option>
                    <option value="cleaning">Клининг</option>
                    <option value="photography">Фотография</option>
                    <option value="events">Организация мероприятий</option>
                    <option value="consulting">Консультации</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div className={styles.textareaWrapper}>
                  <label className={styles.textareaLabel}>Описание услуг</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    placeholder="Кратко опишите ваши услуги"
                    className={styles.textarea}
                    rows={3}
                  />
                </div>
              </>
            )}

            <Input
              label="Пароль"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Создайте пароль"
              required
            />

            <Input
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              required
            />

            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={styles.checkbox}
                required
              />
              <label htmlFor="agreeToTerms" className={styles.checkboxLabel}>
                Я согласен с{' '}
                <Link to="/terms" className={styles.authLink}>
                  условиями использования
                </Link>{' '}
                и{' '}
                <Link to="/privacy" className={styles.authLink}>
                  политикой конфиденциальности
                </Link>
              </label>
            </div>

            <Button type="submit" variant="primary" size="large" fullWidth>
              Зарегистрироваться
            </Button>

            <div className={styles.divider}>
              <span>или</span>
            </div>

            <div className={styles.socialButtons}>
              <Button variant="outline" size="medium" fullWidth>
                Регистрация через Google
              </Button>
            </div>

            <div className={styles.authFooter}>
              <Typography variant="body" color="secondary" align="center">
                Уже есть аккаунт?{' '}
                <Link to="/login" className={styles.authLink}>
                  Войти
                </Link>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;