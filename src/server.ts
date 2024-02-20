import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';

dotenv.config();

const server = fastify();
server.register(fastifyCors, {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
});
server.register(jwt, {
  secret: process.env.JWT_SECRET as string,
});

server.register(authRoutes, { prefix: '/auth' });
server.register(productRoutes, { prefix: '/products' });

server.listen({ port: 3333 }, () => {
  console.log('Servidor Rodando na porta 3333 🚀');
});
