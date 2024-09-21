import { SetMetadata } from '@nestjs/common';

export const WITH_PERMISSION = 'withPermission';
export const Permission = () => SetMetadata(WITH_PERMISSION, true);
