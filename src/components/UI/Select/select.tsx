import React from 'react';
import { button_variants } from '@/components/UI/Button/button-variants';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

function Select({ children, ...props }: SelectProps) {
  return (
    <select
      className={button_variants.button}
      style={{ backgroundColor: 'transparent' }}
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;
