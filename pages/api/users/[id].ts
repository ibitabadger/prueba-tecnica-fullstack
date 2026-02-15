import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from "@/lib/auth"; 

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar autenticación
  const session = await auth.api.getSession({ 
    headers: new Headers(req.headers as Record<string, string>) 
  });

  if (!session) {
    return res.status(401).json({ message: "No autorizado. Debes iniciar sesión." });
  }

  const { id } = req.query;

  //método PATCH para edición parcial
  if (req.method === 'PATCH') {
    const { name, roleId } = req.body;

    // Validación básica de entrada
    if (!name && !roleId) {
      return res.status(400).json({ message: "Faltan campos para actualizar" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { name, roleId },
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "No se pudo editar ese usuario específico" });
    }
  }

  res.setHeader('Allow', ['PATCH']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}