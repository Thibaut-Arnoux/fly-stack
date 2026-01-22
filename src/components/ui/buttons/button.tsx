import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'outline' | 'dash' | 'soft' | 'ghost' | 'link';

type ButtonColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonShape = 'wide' | 'block' | 'square' | 'circle';

const variantClasses: Record<ButtonVariant, string> = {
  outline: 'btn-outline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const colorClasses: Record<ButtonColor, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const shapeClasses: Record<ButtonShape, string> = {
  wide: 'btn-wide',
  block: 'btn-block',
  square: 'btn-square',
  circle: 'btn-circle',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorVariant?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
}

export const Button = ({
  className,
  variant,
  colorVariant,
  size,
  shape,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'btn',
        variant && variantClasses[variant],
        colorVariant && colorClasses[colorVariant],
        size && sizeClasses[size],
        shape && shapeClasses[shape],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
