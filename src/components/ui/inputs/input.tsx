import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export type InputProps = {
  delay?: number;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ delay, onChange, ...props }: InputProps) => {
  const inputRef = (el: HTMLInputElement | null) => {
    // if the input is inside a label, label should handle the input classname
    if (el?.parentElement?.tagName !== 'LABEL') {
      el?.classList.add('input');
    }
  };
  const debouncedOnChange = useDebounceCallback(
    onChange ?? (() => {}),
    delay ?? 0,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e);
  };

  return <input {...props} ref={inputRef} onChange={handleChange} />;
};
