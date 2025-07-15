import React, { ReactNode } from 'react';
import styles from './Card.module.scss';

export type CardSpacing = 'compact' | 'normal' | 'spacious' | 'large';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spacing?: CardSpacing;
  elevated?: boolean;
  interactive?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  spacing = 'normal',
  elevated = false,
  interactive = false,
  header,
  footer,
  className = '',
  onClick,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    elevated ? styles.elevated : '',
    interactive ? styles.interactive : '',
    spacing !== 'normal' ? styles[spacing] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>
        {children}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};