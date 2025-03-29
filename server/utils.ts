export const splitIdsIntoBatches = (ids: number[], batchSize = 100) => {
  const batches: number[][] = [];

  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }
  return batches;
};
