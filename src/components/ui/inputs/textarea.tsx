import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type TextareaColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const colorClasses: Record<TextareaColor, string> = {
  primary: 'textarea-primary',
  secondary: 'textarea-secondary',
  accent: 'textarea-accent',
  neutral: 'textarea-neutral',
  info: 'textarea-info',
  success: 'textarea-success',
  warning: 'textarea-warning',
  error: 'textarea-error',
};

const sizeClasses: Record<TextareaSize, string> = {
  xs: 'textarea-xs',
  sm: 'textarea-sm',
  md: 'textarea-md',
  lg: 'textarea-lg',
  xl: 'textarea-xl',
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  colorVariant?: TextareaColor;
  size?: TextareaSize;
  ghost?: boolean;
}

export const Textarea = ({
  className,
  colorVariant,
  size,
  ghost,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className={cn(
        'textarea',
        colorVariant && colorClasses[colorVariant],
        size && sizeClasses[size],
        ghost && 'textarea-ghost',
        className,
      )}
      {...props}
    />
  );
};
