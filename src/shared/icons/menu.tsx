import React from 'react';

const MenuIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
  <svg
    width={props.width ?? size}
    height={props.height ?? size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    {...props}
  >
    <path d="M3 12h18M3 18h18M3 6h18" />
  </svg>
);

export default React.memo(MenuIcon);
