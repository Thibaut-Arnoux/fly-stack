import { createContext, type HTMLAttributes, useContext, useId } from 'react';

type DrawerContextType = {
  id: string;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);

  if (!ctx) throw new Error('Drawer.* must be used inside <Drawer>');

  return ctx;
};

/**
 * More information about the drawer structure
 * @see https://daisyui.com/components/drawer/?lang=en#structure
 */
export const Drawer = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const id = useId();

  return (
    <DrawerContext.Provider value={{ id }}>
      <div className={`drawer ${className}`} {...props}>
        <input id={id} type="checkbox" className="drawer-toggle" />
        {children}
      </div>
    </DrawerContext.Provider>
  );
};

Drawer.Content = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`drawer-content ${className}`} {...props}>
      {children}
    </div>
  );
};

Drawer.Trigger = ({ children, ...props }: HTMLAttributes<HTMLLabelElement>) => {
  const { id } = useDrawerContext();

  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  );
};

Drawer.Side = ({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { id } = useDrawerContext();

  return (
    <div className="drawer-side">
      <label
        htmlFor={id}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div
        className={`bg-base-200 text-base-content min-h-full ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
