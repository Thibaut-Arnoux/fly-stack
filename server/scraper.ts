import dotenv from 'dotenv';
import { fetchClasses, fetchItems } from './api.js';
import { writeObjectToFile } from './utils.js';

(async () => {
  dotenv.config();
  // TODO: Add logger in file / safe parse and log error / enums
  const db = {
    classes: await fetchClasses(),
    items: await fetchItems(),
  };

  writeObjectToFile('server/db.json', db);
})();
