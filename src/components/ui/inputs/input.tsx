import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = (el: HTMLInputElement | null) => {
    // if the input is inside a label, label should handle the input classname
    if (el?.parentElement?.tagName !== 'LABEL') {
      el?.classList.add('input');
    }
  };

  return <input {...props} ref={inputRef} />;
};
