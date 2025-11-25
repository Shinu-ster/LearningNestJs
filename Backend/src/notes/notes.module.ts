import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { OwnerOrRoleGuard } from 'src/common/guards/owner-or-role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthModule],
  providers: [NotesService, RolesGuard, OwnerOrRoleGuard],
  controllers: [NotesController],
})
export class NotesModule {}

//51. providing role gaurd here
