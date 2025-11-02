import React from 'react';

const userIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? size}
    height={props.height ?? size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-user-icon lucide-user"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default React.memo(userIcon);
