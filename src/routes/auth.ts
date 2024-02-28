import { FastifyInstance } from 'fastify';
import { ILogin } from '../interfaces/ILogin';
import { prisma } from '../prisma';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/login', async function (request, response) {
    const { email, password } = request.body as ILogin;

    if (!email || !password) {
      return response.status(400).send({
        message: 'Usuário não encontrado!',
      });
    }

    const user = await prisma.user.findFirst({
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
        password: true,
      },
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (!user || user.password != password) {
      return response.status(400).send({
        message: 'Usuário não encontrado!',
      });
    }

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    const token = fastify.jwt.sign(userWithoutPassword);

    return response.send({
      token,
      name: user.name,
    });
  });
};

export default authRoutes;
