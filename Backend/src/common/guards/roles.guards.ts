import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decoratores/roles.decorator';

// 46. creating roles guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // no roles required
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();
    
    // Printing jwt
    console.log('Decoded JWT Payload; ',user);
    if (!user || !user.roles) {
      // user.roles may be array of strings
      return false;
    }
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

// we can then apply this gaurd where roles are required
