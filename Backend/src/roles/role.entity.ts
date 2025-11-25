import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
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