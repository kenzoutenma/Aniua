import clsx from 'clsx';
import styles from './button.module.css';

export const button_variants = {
  button: clsx(styles.ghost, styles.button),
  outline: clsx(styles.outline, styles.button),
  secondary: clsx(styles.secondary, styles.button),
  link: clsx(styles.link, `border-animate`),
  primary: clsx(styles.primary, styles.button),
} as const;
