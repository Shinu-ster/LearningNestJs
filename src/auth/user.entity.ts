// 32. Creating User Entity so that it creates a table in my db

import { Note } from 'src/notes/note.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];
}
