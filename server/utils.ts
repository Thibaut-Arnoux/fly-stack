import fs from 'node:fs';
import path from 'node:path';

export const splitIdsIntoBatches = (ids: number[], batchSize = 100) => {
  const batches: number[][] = [];

  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }
  return batches;
};

export const writeObjectToFile = (filePath: string, data: object): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
};

export const writeBufferToFile = (filePath: string, data: Buffer): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
};
