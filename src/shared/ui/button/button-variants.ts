import styles from './button.module.scss';

export const button_variants = {
  default: styles[`btn-default`],
  primary: styles[`btn-primary`],
  ghost: styles[`btn-ghost`],
  outline: styles[`btn-outline`],
  danger: styles[`btn-danger`],
} as const;
