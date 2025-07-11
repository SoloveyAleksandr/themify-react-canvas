import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.scss';

export type InputSize = 'small' | 'medium' | 'large';
export type InputState = 'default' | 'error' | 'success';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  size?: InputSize;
  state?: InputState;
  icon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  size = 'medium',
  state = 'default',
  icon,
  className = '',
  ...props
}) => {
  const inputClasses = [
    styles.input,
    size !== 'medium' ? styles[size] : '',
    state !== 'default' ? styles[state] : '',
    className
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    styles.helperText,
    state === 'error' ? styles.errorText : '',
    state === 'success' ? styles.successText : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input className={inputClasses} {...props} />
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      {helperText && (
        <span className={helperTextClasses}>
          {helperText}
        </span>
      )}
    </div>
  );
};