import { auth } from '@/lib/auth';
import { prisma } from '../prisma';
import { GetServerSidePropsContext } from 'next';

export async function requireAuth(
  ctx: GetServerSidePropsContext,
  pageName?: string
) {
  const headers = Object.fromEntries(
    Object.entries(ctx.req.headers).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(', ') : value || '',
    ])
  );

  const session = await auth.api.getSession({
    headers: headers,
  });

  // Validar autenticación básica
  if (!session) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    };
  }

  // Validar permisos por RoleId
  if (pageName) {
    // Obtener el roleId de la sesión
    const userRoleId = session.user.roleId;

    const hasPermission = await prisma.permission.findFirst({
      where: {
        pageName: pageName,
        roles: {
          some: {
            id: userRoleId, // Buscar por ID directamente
          },
        },
      },
    });

    if (!hasPermission) {
      return {
        redirect: { destination: '/unauthorized', permanent: false },
      };
    }
  }

  // Devolver sesión y datos
  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
