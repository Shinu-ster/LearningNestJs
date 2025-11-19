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

@Controller('notes')
@UseGuards(JwtAuthGuard) // protect all routes in this controller
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateNoteDto) {
    // req.user contains { id, email } from JwtStrategy.validate
    return this.notesService.create({ id: req.user.id } as any, dto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.notesService.findAllForUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.notesService.findOneForUser(id, req.user.id);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.notesService.remove(id, req.user.id);
  }
}
