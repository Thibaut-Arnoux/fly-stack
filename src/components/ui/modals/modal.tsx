import { X } from 'lucide-react';
import {
  Children,
  cloneElement,
  createContext,
  type ElementType,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { cn } from '@/utils/cn';

interface ModalContextType {
  open: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal');
  }

  return context;
};

interface SeparatedModalChildren {
  triggerElement: ReactNode;
  dialogContent: ReactNode[];
}

const separateModalChildren = (
  children: ReactNode,
  triggerType: ElementType,
): SeparatedModalChildren => {
  const childArray = Children.toArray(children);
  let triggerElement: ReactNode = null;
  const dialogContent: ReactNode[] = [];

  for (const child of childArray) {
    if (isValidElement(child) && child.type === triggerType) {
      if (triggerElement !== null) {
        console.warn(
          'Modal: Multiple Trigger elements detected. Only the first will be used.',
        );
      } else {
        triggerElement = child;
      }
    } else {
      dialogContent.push(child);
    }
  }

  return { triggerElement, dialogContent };
};

interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  position?: 'top' | 'middle' | 'bottom' | 'start' | 'end';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const positionClasses: Record<string, string> = {
  top: 'modal-top',
  middle: 'modal-middle',
  bottom: 'modal-bottom',
  start: 'modal-start',
  end: 'modal-end',
};

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
};

const heightClasses: Record<string, string> = {
  sm: 'max-h-[50vh]',
  md: 'max-h-[70vh]',
  lg: 'max-h-[85vh]',
  xl: 'max-h-[90vh]',
};

export const Modal = ({
  children,
  position = 'middle',
  size = 'md',
  className,
  ...props
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const { triggerElement, dialogContent } = separateModalChildren(
    children,
    Trigger,
  );

  const value: ModalContextType = {
    open,
  };

  return (
    <ModalContext.Provider value={value}>
      {triggerElement}
      <dialog
        ref={dialogRef}
        className={cn('modal', positionClasses[position])}
        onClose={handleClose}
        {...props}
      >
        <div
          className={cn(
            'modal-box p-0 flex flex-col',
            sizeClasses[size],
            heightClasses[size],
            className,
          )}
        >
          {isOpen && dialogContent}
        </div>
        {/* DaisyUI pattern: backdrop with form method="dialog" enables outside click close */}
        <form method="dialog" className="modal-backdrop">
          <button type="submit" aria-label="Close modal">
            close
          </button>
        </form>
      </dialog>
    </ModalContext.Provider>
  );
};

const Trigger = ({
  children,
}: {
  children: ReactElement<{
    onClick?: (e: MouseEvent) => void;
  }>;
}) => {
  const { open } = useModalContext();
  return cloneElement(children, {
    onClick: () => open(),
  });
};

const Close = () => {
  return (
    <form method="dialog" className="absolute right-2 top-1">
      <IconButton
        type="submit"
        className="btn-sm btn-circle btn-ghost"
        icon={<X className="w-4 h-4" />}
        aria-label="Close modal"
      />
    </form>
  );
};

const Header = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('border-b border-base-300 px-4 py-2', className)}
      {...props}
    >
      {children}
      <Close />
    </div>
  );
};

const Body = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex-1 overflow-y-auto min-h-0 px-4 py-2', className)}
    {...props}
  >
    {children}
  </div>
);

const Cancel = () => {
  return (
    <form method="dialog">
      <Button className="btn-sm" type="submit">
        Cancel
      </Button>
    </form>
  );
};

const Footer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'modal-action mt-0 border-t border-base-300 px-4 py-2',
        className,
      )}
      {...props}
    >
      {children ?? <Cancel />}
    </div>
  );
};

Modal.Trigger = Trigger;
Modal.Header = Header;
Modal.Body = Body;
Modal.Cancel = Cancel;
Modal.Footer = Footer;
