import { useContext } from 'react';
import {
  ModalContext,
  type ModalContextType,
} from '@/components/ui/modals/modal';

export const useModal = <T = unknown>() => {
  const ctx = useContext(ModalContext) as ModalContextType<T> | null;

  if (!ctx) throw new Error('useModal must be used within ModalProvider');

  // Only expose the open method
  return { open: ctx.open };
};
