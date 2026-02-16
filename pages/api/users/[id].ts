import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();


/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *           example: clx123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Andrea
 *             roleId: admin_role
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             example:
 *               id: clx123
 *               name: Andrea
 *               email: andrea.sanchezc@udea.edu.co
 *               emailVerified: true
 *               image: https://avatars.githubusercontent.com/u/126259117?v=4
 *               phone: null
 *               roleId: admin_role
 *               createdAt: 2026-02-15T20:57:17.209Z
 *               updatedAt: 2026-02-15T20:57:17.209Z
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       405:
 *         description: Método no permitido.
 *       500:
 *         description: Error interno del servidor.
 */
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

  const { id } = req.query;

  //método PATCH para edición parcial
  if (req.method === 'PATCH') {
    const { name, roleId } = req.body;

    // Validación básica de entrada
    if (!name && !roleId) {
      return res.status(400).json({ message: 'Faltan campos para actualizar' });
    }
    
    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { name, roleId },
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'No se pudo editar ese usuario específico' });
    }
  }

  res.setHeader('Allow', ['PATCH']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
