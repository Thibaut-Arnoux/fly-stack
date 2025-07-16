import type { ButtonHTMLAttributes } from 'react';

export const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
};
