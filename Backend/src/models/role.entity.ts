import { User } from 'src/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from './permisson.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.id)
  @JoinTable({
    name: 'role_users',
    joinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
//43. creating entity to generate migration and to migrate
/*
Adding Scripts  in package.json
migrations folder should exists first before migrating
Entity is a class that represents a table in db

---
Migration is db schema change
when creating table, adding column, removing, adding foregin key, changeg column type
----
npm run typeorm migration:generate -- src/migrations/CreateRolesTable -d src/data-source.ts
npm run typeorm migration:run -- -d dist/data-source.js
*/
