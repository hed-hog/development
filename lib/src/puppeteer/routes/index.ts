import { createRoute } from './create-route';
import { deleteRoute } from './delete-route';
import { editRoleRoute } from './edit-role-route';
import { editRoute } from './edit-route';
import { editRouteScreen } from './edit-route-screen';
import { verifyInvalidMethod } from './verify-invalid-method';

export const route = async (page) => {
  await createRoute(page);
  await editRoute(page);

  await verifyInvalidMethod(page);

  await editRoleRoute(page);
  await editRouteScreen(page);

  await deleteRoute(page);
};
