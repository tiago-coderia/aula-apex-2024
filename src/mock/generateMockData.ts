import { prisma } from '../prisma';

const generateMockData = async () => {
  await prisma.user.create({
    data: {
      email: 'tiago@gmail.com',
      name: 'tiago',
      password: '123',
      role: 'admin',
    },
  });
  await prisma.user.create({
    data: {
      email: 'johnny@gmail.com',
      name: 'johnny',
      password: '123',
      role: 'user',
    },
  });
};

generateMockData();
