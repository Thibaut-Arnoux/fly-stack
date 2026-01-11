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

type DropdownContextType = {
  id: string;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);

  if (!ctx) throw new Error('Dropdown.* must be used inside <Dropdown>');

  return ctx;
};

export const Dropdown = ({ children }: { children: ReactNode }) => {
  const id = useId();

  return (
    <DropdownContext.Provider value={{ id }}>
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
  className, // TODO : replace with variant or at dropdown root
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { id } = useDropdownContext();

  return (
    <div
      id={`popover-${id}`}
      className={cn('dropdown', className)}
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
