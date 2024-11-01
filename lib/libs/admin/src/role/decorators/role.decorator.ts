import { SetMetadata } from '@nestjs/common';

export const WITH_ROLE = 'withRole';

export function Role() {
  return SetMetadata(WITH_ROLE, true);
}
