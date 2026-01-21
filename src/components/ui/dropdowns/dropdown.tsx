import {
  cloneElement,
  createContext,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useContext,
  useId,
} from 'react';
import { cn } from '@/utils/cn';

type DropdownPosition = 'bottom' | 'top' | 'left' | 'right';
type DropdownAlign = 'start' | 'center' | 'end';

const positionClasses: Record<DropdownPosition, string> = {
  bottom: 'dropdown-bottom',
  top: 'dropdown-top',
  left: 'dropdown-left',
  right: 'dropdown-right',
};

const alignClasses: Record<DropdownAlign, string> = {
  start: 'dropdown-start',
  center: 'dropdown-center',
  end: 'dropdown-end',
};

type DropdownContextType = {
  id: string;
  position?: DropdownPosition;
  align?: DropdownAlign;
};

interface DropdownProps {
  children: ReactNode;
  position?: DropdownPosition;
  align?: DropdownAlign;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);

  if (!ctx) throw new Error('Dropdown.* must be used inside <Dropdown>');

  return ctx;
};

export const Dropdown = ({ children, position, align }: DropdownProps) => {
  const id = useId();

  return (
    <DropdownContext.Provider value={{ id, position, align }}>
      {children}
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({
  children,
}: {
  children: ReactElement<{ style?: React.CSSProperties }>;
}) => {
  const { id } = useDropdownContext();

  return cloneElement(children, {
    // @ts-expect-error - Popover API attributes not yet in React types
    popoverTarget: `popover-${id}`,
    style: {
      ...children.props.style,
      anchorName: `--anchor-${id}`,
    },
  });
};

const DropdownContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { id, position, align } = useDropdownContext();

  return (
    <div
      id={`popover-${id}`}
      className={cn(
        'dropdown menu rounded-box bg-base-100 shadow-sm',
        position && positionClasses[position],
        align && alignClasses[align],
        className,
      )}
      popover="auto"
      style={{ positionAnchor: `--anchor-${id}` }}
      {...props}
    >
      {children}
    </div>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
