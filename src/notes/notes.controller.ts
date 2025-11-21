import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/common/decoratores/roles.decorator';
import { CurrentUser } from 'src/common/decoratores/current-user.decorator';
import { OwnerOrRoleGuard } from 'src/common/guards/owner-or-role.guard';

//48. Changing Controller slightly
@Controller('notes')
@UseGuards(JwtAuthGuard) // protect all routes in this controller
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  // allow teachers to crewate their own notes, and admin to create for anyone
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN) // allowing these roles to access this route
  async create(
    @CurrentUser() user,
    @Body() dto: CreateNoteDto & { ownerId?: string },
  ) {
    // if admin and provides ownerId, create for that owner
    if (user.roles.includes(Role.ADMIN) && dto.ownerId) {
      return this.notesService.createForUser(dto.ownerId, dto);
    }

    //Otherwise create for current user
    return this.notesService.create({ id: user.id } as any, dto);

    // req.user contains { id, email } from JwtStrategy.validate
    // return this.notesService.create({ id: req.user.id } as any, dto);
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) { // Getting all notes of current user
    return this.notesService.findAllForUser(userId);
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    // both students, teachers, admin can view a note; we will just return if it exists
    return this.notesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard, OwnerOrRoleGuard)
  @Roles(Role.ADMIN) // OwnerOrRoleGuard will allow owner or admin
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, userId, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard, OwnerOrRoleGuard)
  @Roles(Role.ADMIN)
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.notesService.remove(id, userId);
  }
}
