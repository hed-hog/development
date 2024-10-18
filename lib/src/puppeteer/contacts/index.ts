import { addTelephone } from './add-telephone';
import { createContact } from './add-contact';
import { deleteTelephone } from './delete-telephone';
import { editContact } from './edit-contact';
import { editTelephone } from './edit-telephone';
import { addDocument } from './add-document';
import { editDocument } from './edit-document';
import { deleteDocument } from './delete-document';
import { addAddress } from './add-address';
import { editAddress } from './edit-address';
import { deleteAddress } from './delete-address';
import { deleteContact } from './delete-contact';
import { addCustom } from './add-custom';
import { editCustom } from './edit-custom';
import { deleteCustom } from './delete-custom';

export const contacts = async (page) => {
  await createContact(page);
  await editContact(page);

  await addCustom(page);
  await editCustom(page)
  await deleteCustom(page)

  await addTelephone(page);
  await editTelephone(page);
  await deleteTelephone(page);

  await addDocument(page);
  await editDocument(page);
  await deleteDocument(page);

  await addAddress(page);
  await editAddress(page);
  await deleteAddress(page);

  await deleteContact(page);
};
