import { fetchItems } from './api.js';
import dotenv from 'dotenv';
import { writeObjectToFile } from './utils.js';

(async () => {
  dotenv.config();
  // TODO: Add logger in file / safe parse and log error items
  const db = {
    items: await fetchItems(),
  };

  writeObjectToFile('server/db.json', db);
})();
