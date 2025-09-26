import type { InputHTMLAttributes } from 'react';

export const Checkbox = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className={`checkbox ${className}`} type="checkbox" />
  );
};
