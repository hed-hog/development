import { SetMetadata } from '@nestjs/common';

export const WITH_ROLE = 'withRole';
export const Role = () => SetMetadata(WITH_ROLE, true);
