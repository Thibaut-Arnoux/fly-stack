/**
 * Format a number as a price with thousand separators
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US').format(price);
};
