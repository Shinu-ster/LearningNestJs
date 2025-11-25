// 50. creating central module

import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guards';
import { OwnerOrRoleGuard } from './guards/owner-or-role.guard';

@Module({
  providers: [RolesGuard, OwnerOrRoleGuard],
  exports: [RolesGuard, OwnerOrRoleGuard],
})
export class CommonModule {}
