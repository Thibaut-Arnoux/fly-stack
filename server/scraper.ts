import { fetchClasses, fetchItems } from './api.js';
import dotenv from 'dotenv';
import { writeObjectToFile } from './utils.js';

(async () => {
  dotenv.config();
  // TODO: Add logger in file / safe parse and log error
  const db = {
    items: await fetchItems(),
    classes: await fetchClasses(),
  };

  writeObjectToFile('server/db.json', db);
})();
