import {
  cloneElement,
  createContext,
  type HTMLAttributes,
  isValidElement,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '@/utils/cn';

interface ModalContextType {
  modalId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within Modal');
  }
  return context;
};

interface ModalProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ModalRoot = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: ModalProps) => {
  const modalId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const close = () => {
    dialogRef.current?.close();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const value: ModalContextType = {
    modalId,
    isOpen,
    open,
    close,
    dialogRef,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

interface TriggerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  asChild?: boolean;
}

const Trigger = ({ children, asChild, onClick, ...props }: TriggerProps) => {
  const { open } = useModalContext();

  if (asChild && isValidElement(children)) {
    const childProps = children.props as {
      onClick?: (e: React.MouseEvent) => void;
    };
    return cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        open();
        onClick?.(e as React.MouseEvent<HTMLElement>);
        if (childProps.onClick) {
          childProps.onClick(e);
        }
      },
    } as Partial<unknown>);
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        open();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top' | 'middle' | 'bottom';
}

const Content = ({
  children,
  className,
  size = 'md',
  position = 'middle',
  ...props
}: ContentProps) => {
  const { dialogRef, close } = useModalContext();

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  const positionClasses: Record<string, string> = {
    top: 'modal-top',
    middle: 'modal-middle',
    bottom: 'modal-bottom',
  };

  return (
    <dialog ref={dialogRef} className={cn('modal', positionClasses[position])}>
      <div className={cn('modal-box', sizeClasses[size], className)} {...props}>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={close}>
          close
        </button>
      </form>
    </dialog>
  );
};

interface CloseProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Close = ({ children, className, onClick, ...props }: CloseProps) => {
  const { close } = useModalContext();

  return (
    <button
      type="button"
      className={cn(
        'btn btn-sm btn-circle btn-ghost absolute right-2 top-2',
        className,
      )}
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
      aria-label="Close modal"
      {...props}
    >
      {children ?? '✕'}
    </button>
  );
};

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Header = ({ children, className, ...props }: HeaderProps) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Body = ({ children, className, ...props }: BodyProps) => (
  <div className={cn('py-4', className)} {...props}>
    {children}
  </div>
);

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Footer = ({ children, className, ...props }: FooterProps) => (
  <div className={cn('modal-action', className)} {...props}>
    {children}
  </div>
);

export const Modal = Object.assign(ModalRoot, {
  Trigger,
  Content,
  Close,
  Header,
  Body,
  Footer,
});
