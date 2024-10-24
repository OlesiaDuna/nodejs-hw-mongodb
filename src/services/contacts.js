import { contactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContatById = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};
