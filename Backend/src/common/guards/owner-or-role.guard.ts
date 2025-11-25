// 47.  Creating another guard for roles like admin or higher

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { NotesService } from 'src/notes/notes.service';
import { ROLES_KEY } from '../decoratores/roles.decorator';

@Injectable()
export class OwnerOrRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private notesSerivce: NotesService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const requriedRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const noteId = req.params?.id;

    // if user has one of requriedRoles, allow immediately
    if (requriedRoles && requriedRoles.length > 0 && user?.roles) {
      const hasRole = requriedRoles.some((role) => user.roles.include(role));
      if (hasRole) return true;
    }

    // otherwise check ownership: user must be owner of note
    if (!noteId) {
      // no noteId to check deny if not admin role
      return false;
    }

    const note = await this.notesSerivce.findById(noteId); // we'll add this method
    if (!note) {
      throw new ForbiddenException('Note not found or access denied');
    }

    return note.owner?.id == user.id;
  }
}
