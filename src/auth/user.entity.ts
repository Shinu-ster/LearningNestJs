// 32. Creating User Entity so that it creates a table in my db

import { Note } from 'src/notes/note.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 50, default: Role.STUDENT })
  roles: Role[];

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];
}

//41. Updating user entity
