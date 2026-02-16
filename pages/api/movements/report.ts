import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/movements/report:
 *   get:
 *     summary: Obtener movimientos de ingresos y egresos (logica separada para el reporte)
 *     responses:
 *       200:
 *         description: Lista cargada con éxito.
 *         content:
 *           application/json:
 *            example:
 *             date: 13 feb
 *             total: 8500
 *       401:
 *         description: No autorizado. Debes iniciar sesión.
 *       500:
 *         description: Error interno del servidor.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as Record<string, string>),
  });

  if (req.method !== 'GET') return res.status(405).end();

  try {
    if (!session)
      return res
        .status(401)
        .json({ message: 'No autorizado. Debes iniciar sesión.' });

    const movements = await prisma.movement.findMany({
      orderBy: { date: 'asc' },
    });

    // Agrupar por fecha para el gráfico
    const groupedData = movements.reduce((acc: any, curr) => {
      const dateLabel = new Date(curr.date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
      });

      if (!acc[dateLabel]) {
        acc[dateLabel] = { date: dateLabel, total: 0 };
      }
      acc[dateLabel].total += curr.amount;
      return acc;
    }, {});

    return res.status(200).json(Object.values(groupedData));
  } catch (error) {
    return res.status(500).json({ message: 'Error cargando reporte' });
  }
}
