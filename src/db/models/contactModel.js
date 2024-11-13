import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const contactsCollection = model('contacts', contactsSchema);
