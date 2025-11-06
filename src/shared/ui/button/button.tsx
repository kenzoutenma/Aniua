import React from 'react';
import { button_variants } from './button-variants';

export const ButtonDefaultAsType = 'button' as const;
export type ButtonDefaultAsType = typeof ButtonDefaultAsType;

export type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  variant?: keyof typeof button_variants;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

const Button = <E extends React.ElementType = ButtonDefaultAsType>({
  children,
  as,
  variant,
  ...otherProps
}: ButtonProps<E>) => {
  const Tag = as || ButtonDefaultAsType;
  const picked_variant = variant ? button_variants[variant] : button_variants['button'];
  return (
    <Tag className={picked_variant} {...otherProps}>
      {children}
    </Tag>
  );
};

export default Button;
