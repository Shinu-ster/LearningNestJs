//44. Creating a seeder to populate db with data

import { AppDataSource } from '../../../src/data-source';
import { Role } from '../../../src/roles/role.entity';

async function seedRoles() {
  const roleRepo = AppDataSource.getRepository(Role);

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Teacher' },
    { id: 3, name: 'Student' },
  ];

  for (const role of roles) {
    const exists = await roleRepo.findOne({ where: { id: role.id } });
    if (!exists) {
      await roleRepo.save(role);
    }
  }

  console.log('Roles seeded successfully');
}

AppDataSource.initialize()
  .then(() => seedRoles())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding roles: ', err);
    process.exit(1);
  });

// seeing with command
// npx ts-node src/database/seeders/role.seeder.ts
// the import path should be clearly mentioned
