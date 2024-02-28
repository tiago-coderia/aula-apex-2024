import { prisma } from '../prisma';

const generateProductsMockData = async () => {
  const products = [
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  for (let i = 0; i < products.length; i++) {
     await prisma.product.create({
        data: {
           name: `Produto ${i}`,
           price: 100 * i - Math.random(),
           color: i % 2 === 0 ? 'blue' : 'red',
        },
     });
  }
};

generateProductsMockData();