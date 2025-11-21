import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/auth/user.entity';

// 37. creating note service
@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private notesRepo: Repository<Note>) {}

  async create(owner: User, dto: CreateNoteDto) {
    const note = this.notesRepo.create({ ...dto, owner });
    return this.notesRepo.save(note);
  }
  // 49. adding method to create notes for specific user id
  async createForUser(ownerId: string, dto: CreateNoteDto) {
    const owner = { id: ownerId } as any;
    const note = this.notesRepo.create({ ...dto, owner });
    return this.notesRepo.save(note);
  }

  async findAllForUser(userId: string) {
    return this.notesRepo.findOne({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }

  async findById(id: string) {
    return this.notesRepo.findOne({ where: { id }, relations: ['owner'] });
  }

  async findOneForUser(noteId: string, userId: string) {
    const note = await this.notesRepo.findOne({
      where: { id: noteId },
      relations: ['owner'],
    });
    if (!note) throw new NotFoundException('Note not found');
    if (note.owner.id !== userId)
      throw new ForbiddenException('You dont own this note');
    console.log('Returning single note: ', noteId);
    return note;
  }

  async update(noteId: string, userId: string, dto: UpdateNoteDto) {
    const note = await this.notesRepo.findOne({
      where: { id: noteId },
      relations: ['owner'],
    });
    if (!note) throw new NotFoundException('Note not found');
    if (note.owner.id !== userId)
      throw new ForbiddenException('You dont own this note');

    Object.assign(note, dto);
    return this.notesRepo.save(note);
  }

  async remove(noteId: string, userId: string) {
    const note = await this.notesRepo.findOne({
      where: { id: noteId },
      relations: ['owner'],
    });
    if (!note) throw new NotFoundException('Note not found');
    if (note.owner.id !== userId)
      throw new ForbiddenException('You dont have access to this note');
    return this.notesRepo.remove(note);
  }
}
