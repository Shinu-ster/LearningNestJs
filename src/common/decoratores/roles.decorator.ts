// 45. creating decorator to check roles of current user

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// this add meta data to the route
// like suppose this route requires this role to access it
