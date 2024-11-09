import createHttpError from 'http-errors';
import { SORT_ORDER } from '../constants/index.js';
import { contactsCollection } from '../db/models/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  isFavorite,
  contactType = '',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find({ userId });
  if (contactType) contactsQuery.where('contactType').equals(contactType);
  if (isFavorite) contactsQuery.where('isFavourite').equals(isFavorite);

  const [contactsCount, contacts] = await Promise.all([
    contactsCollection.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  if (!contactsCount) {
    throw createHttpError(404, 'Contacts not found');
  }

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id, userId) =>
  contactsCollection.findOne({ _id: id, userId });

export const createContact = (userId, payload) =>
  contactsCollection.create({ userId, ...payload });

export const updateContact = (contactId, userId, payload = {}) => {
  return contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );
};

export const deleteContact = (contactId, userId) =>
  contactsCollection.findOneAndDelete({ _id: contactId, userId });
