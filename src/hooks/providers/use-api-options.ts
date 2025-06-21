import { useContext } from 'react';
import { ApiOptionsContext } from '@/providers/api-options-provider';

export const useApiOptions = () => {
  const context = useContext(ApiOptionsContext);
  if (context === null) {
    throw new Error('useApiOptions must be used within an ApiOptionsProvider');
  }

  return context;
};
