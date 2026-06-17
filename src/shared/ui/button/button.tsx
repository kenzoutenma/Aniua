import React from 'react';
import styles from './button.module.scss';

export const ButtonDefaultAsType = 'button' as const;
export type ButtonDefaultAsType = typeof ButtonDefaultAsType;

export type ButtonOwnProps<E extends React.ElementType> = {
  children?: React.ReactNode;
  as?: E;
  variant?: 'default' | 'primary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  icon?: React.ReactNode;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const Button = <E extends React.ElementType = ButtonDefaultAsType>({
  children,
  as,
  variant = 'default',
  size = 'md',
  loading = false,
  disabled = false,
  iconOnly = false,
  icon,
  className = '',
  ...otherProps
}: ButtonProps<E> & { className?: string }) => {
  const Tag = as || ButtonDefaultAsType;

  const classNames = [
    styles['btn'],
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    iconOnly ? styles['btn-icon-only'] : '',
    loading ? styles['btn-loading'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isCurrentlyDisabled = disabled || loading;

  const Component = Tag as React.ElementType;

  return (
    <Component
      className={classNames}
      disabled={Tag === 'button' ? isCurrentlyDisabled : undefined}
      aria-busy={loading ? true : undefined}
      aria-disabled={isCurrentlyDisabled ? true : undefined}
      {...otherProps}
    >
      {loading && <span className={styles['btn__spinner']} role="status" aria-label="Loading" />}

      {!loading && icon && (
        <span className={styles['btn__icon']} aria-hidden="true">
          {icon}
        </span>
      )}

      {iconOnly ? <span className={styles['sr-only']}>{children}</span> : children}
    </Component>
  );
};

export default Button;
