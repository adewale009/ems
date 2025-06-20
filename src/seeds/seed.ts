// // src/seeds/seed.ts
// import { connectionSource } from '@config/typeorm.config';
// import { User } from '@modules/core/entities/user.entity';
// import { Department } from '@modules/core/entities/department.entity';

// const seed = async () => {
//   try {
//     await connectionSource.initialize();

//     const departmentRepo = connectionSource.getRepository(Department);
//     const userRepo = connectionSource.getRepository(User);

//     // Seed department
//     const hr = departmentRepo.create({ name: 'HR' });
//     await departmentRepo.save(hr);

//     // Seed user
//     const user = userRepo.create({
//       firstname: 'Admin User',
//       email: 'admin@example.com',
//       password: 'hashed-password', // hash if needed
//       department: hr,
//     });
//     await userRepo.save(user);

//     console.log('Seeding complete.');
//     await connectionSource.destroy();
//   } catch (err) {
//     console.error('Seeding failed:', err);
//     process.exit(1);
//   }
// };

// seed();
