import { useContext } from 'react';
import {
  ModalContext,
  type ModalContextType,
} from '@/components/ui/modals/modal';

export const useModalData = <T = unknown>() => {
  const ctx = useContext(ModalContext) as ModalContextType<T> | null;

  if (!ctx) throw new Error('useModalData must be used within ModalProvider');

  return { data: ctx.data };
};
