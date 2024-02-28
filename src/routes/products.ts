import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

const productRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/all', async function (request, response) {
    const token = request.headers.authorization;
    if (!token) {
      return response.status(401).send({
        message: 'Token não informado!',
      });
    }

    let user: any = null;
    try {
      user = fastify.jwt.verify(token.replace('Bearer ', ''));
      
    } catch (error) {
      return response.status(401).send({
        message: 'Token Inválido!',
      });
    }

    const products = await prisma.product.findMany({});

    const productsWithDiscount = products.map((product) => {
      if (user.role == 'user') {
        return product;
      }
      return {
        ...product,
        price: product.price - product.price * 0.2,
      };
    });

    return response.send({
      productsWithDiscount,
    });
  });
};

export default productRoutes;
