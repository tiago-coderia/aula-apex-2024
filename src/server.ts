import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify();
server.register(fastifyCors, {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
});
server.register(jwt, {
  secret: process.env.JWT_SECRET as string,
});

server.listen({ port: 3333 }, () => {
  console.log('Servidor Rodando na porta 3333 🚀');
});
