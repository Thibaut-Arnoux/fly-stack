import type { PropsWithChildren } from 'react';

interface SectionProps {
  title: string;
}

export const Section = ({
  title,
  children,
}: PropsWithChildren<SectionProps>) => {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60 mb-3 flex items-center gap-2">
        {title}
        <div className="flex-1 h-px bg-base-300/50" />
      </h3>
      {children}
    </div>
  );
};
