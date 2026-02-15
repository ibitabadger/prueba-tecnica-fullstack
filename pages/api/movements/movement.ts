import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { auth } from '@/lib/auth'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const page = parseInt(req.query.page as string) || 1;
  const limit = 8; //Traer un numero limitado de movimientos para no saturar la interfaz
  const skip = (page - 1) * limit;
  const session = await auth.api.getSession({ 
    headers: new Headers(req.headers as Record<string, string>) 
  });
  // Manejar el método GET para listar los datos de movimientos
  if (req.method === 'GET') {
    try {
      if (!session) return res.status(401).json({ message: 'No autorizado. Debes iniciar sesión.' });

      const movements = await prisma.movement.findMany({
        
        // Traer el nombre del usuario y no su id
        include: {
          user: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json(movements);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener datos' });
    }
  }

  // Creación del método POST para crear un nuevo movimiento
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {

    if (!session || !session.user) {
      return res.status(401).json({ message: 'No autorizado. Debes iniciar sesión.' });
    }

    // Extraer y validar datos del body
    const { concept, amount, date } = req.body;

    if (!concept || typeof amount !== 'number') {
      return res.status(400).json({ 
        message: 'Datos inválidos. El concepto y el monto (número) son obligatorios.' 
      });
    }
    
    // Inserción en la base de datos vinculada al usuario
    const newMovement = await prisma.movement.create({
      data: {
        concept: concept,
        amount: amount,
        date: date ? new Date(date) : new Date(), // Si no se envía fecha, usar la actual
        userId: session.user.id, // Usar el ID de la sesión
      },
    });

    //Respuesta exitosa
    return res.status(201).json(newMovement);

  } catch (error) {
    console.error('Error en API Movement:', error);
    return res.status(500).json({ message: 'Error interno al crear el movimiento' });
  }
}