export const splitIntoColumns = <T>(
  array: T[],
  numCols: number,
): Array<{ id: string; items: T[] }> => {
  const perCol = Math.ceil(array.length / numCols);
  const cols: Array<{ id: string; items: T[] }> = [];

  for (let i = 0; i < numCols; i++) {
    cols.push({
      id: `identifier-${i}`,
      items: array.slice(i * perCol, (i + 1) * perCol),
    });
  }

  return cols;
};
