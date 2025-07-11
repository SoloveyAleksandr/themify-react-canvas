import React, { ReactNode } from 'react';
import styles from './Typography.module.scss';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption';

export type TypographyColor = 
  | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled';

export type TypographyAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  noMargin?: boolean;
  gutterBottom?: boolean;
  children: ReactNode;
  component?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'inherit',
  align = 'left',
  noMargin = false,
  gutterBottom = false,
  className = '',
  children,
  component,
  style
}) => {
  // Определяем компонент по умолчанию на основе варианта
  const getDefaultComponent = (): keyof JSX.IntrinsicElements => {
    if (variant.startsWith('h')) {
      return variant as keyof JSX.IntrinsicElements;
    }
    return 'p';
  };

  const Component = component || getDefaultComponent();

  const classNames = [
    styles.typography,
    styles[variant],
    color !== 'inherit' ? styles[color] : '',
    align !== 'left' ? styles[align] : '',
    noMargin ? styles.noMargin : '',
    gutterBottom ? styles.gutterBottom : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  );
};