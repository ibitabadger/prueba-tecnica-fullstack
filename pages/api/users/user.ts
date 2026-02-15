import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticación
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as Record<string, string>),
  });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'No autorizado. Debes iniciar sesión.' });
  }

  // Manejar el método GET para listar los usuarios
  if (req.method === 'GET') {
    try {
      if (!session)
        return res
          .status(401)
          .json({ message: 'No autorizado. Debes iniciar sesión.' });
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        orderBy: { name: 'asc' },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error al obtener la lista de usuarios' });
    }
  }
}
