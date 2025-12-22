import { X } from 'lucide-react';
import {
  createContext,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { cn } from '@/utils/cn';

export interface ModalContextType<T = unknown> {
  open: (data?: T) => void;
  data: T | null;
}

export const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps extends PropsWithChildren {
  position?: 'top' | 'middle' | 'bottom' | 'start' | 'end';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  modal: ReactNode;
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

export const ModalProvider = ({
  children,
  modal,
  position = 'middle',
  size = 'md',
  className,
}: ModalProviderProps) => {
  const [data, setData] = useState<unknown>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open: ModalContextType['open'] = (newData?: unknown) => {
    if (newData !== undefined) {
      setData(newData);
    }
    dialogRef.current?.showModal();
  };

  return (
    <ModalContext.Provider value={{ open, data }}>
      {children}
      <dialog
        ref={dialogRef}
        className={cn('modal', positionClasses[position])}
      >
        <div
          className={cn(
            'modal-box p-0 flex flex-col',
            sizeClasses[size],
            heightClasses[size],
            className,
          )}
        >
          {modal}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" aria-label="Close modal">
            close
          </button>
        </form>
      </dialog>
    </ModalContext.Provider>
  );
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

export const Modal = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Cancel = Cancel;
Modal.Footer = Footer;
