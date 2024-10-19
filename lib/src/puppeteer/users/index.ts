import { createUser } from './create';
import { deleteUser } from './delete';
import { editUser } from './edit';

export const users = async (page) => {
  await createUser(page);
  await editUser(page);
  await deleteUser(page);
};
