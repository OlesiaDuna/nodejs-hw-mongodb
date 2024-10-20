import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  try {
    const contacts = JSON.parse(await readContacts());
    const updatedContacts = [...contacts, createFakeContact()];
    await writeContacts(JSON.stringify(updatedContacts, undefined, 2));
  } catch (e) {
    console.log('Print error', e);
  }
};

addOneContact();
