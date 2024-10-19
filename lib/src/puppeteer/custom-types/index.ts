import { createCustomType } from './create';
import { deleteCustomType } from './delete';
import { editCustomType } from './edit';

export const customType = async (page) => {
  await createCustomType(page);
  await editCustomType(page);
  await deleteCustomType(page);
};
