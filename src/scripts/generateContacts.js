import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const generateContacts = async (number) => {
  try {
    const contacts = JSON.parse(await readContacts());
    for (let index = 0; index < number; index++) {
      contacts.push(createFakeContact());
    }
    await writeContacts(JSON.stringify(contacts, undefined, 2));
  } catch (e) {
    console.log('Print error', e);
  }
};

generateContacts(5);
