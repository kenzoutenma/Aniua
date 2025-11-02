import { button_variants } from '@/shared/ui/button/button-variants';
import React from 'react';

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
