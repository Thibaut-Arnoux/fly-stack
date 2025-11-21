import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'outline' | 'dash' | 'soft' | 'ghost';

type BadgeColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
}

// explicit classes to be bundle by tailwind
const sizeClasses: Record<BadgeSize, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
  xl: 'badge-xl',
};

const variantClasses: Record<BadgeVariant, string> = {
  outline: 'badge-outline',
  dash: 'badge-dash',
  soft: 'badge-soft',
  ghost: 'badge-ghost',
};

const colorClasses: Record<BadgeColor, string> = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

export const Badge = ({
  className,
  variant,
  color,
  size,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'badge',
        variant && variantClasses[variant],
        color && colorClasses[color],
        size && sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
