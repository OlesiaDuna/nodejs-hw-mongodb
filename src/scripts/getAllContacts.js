import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  try {
    return JSON.parse(await readContacts());
  } catch (e) {
    return e;
  }
};

console.log(await getAllContacts());
