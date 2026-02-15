import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  // Crear los Permisos (Páginas)
  const pMovement = await prisma.permission.upsert({
    where: { id: 'movements_permission' },
    update: {},
    create: { id: 'movements_permission', pageName: 'movements' },
  })

  const pCreateMovement = await prisma.permission.upsert({
    where: { id: 'create_movements_permission' },
    update: {},
    create: { id: 'create_movements_permission', pageName: 'create' },
  })

  const pReports = await prisma.permission.upsert({
    where: { id: 'reports_permission' },
    update: {},
    create: { id: 'reports_permission', pageName: 'reports' },
  })

  const pUsers = await prisma.permission.upsert({
    where: { id: 'users_permission' },
    update: {},
    create: { id: 'users_permission', pageName: 'users' },
  })

  // Crear Rol ADMIN con TODOS los permisos
  await prisma.role.upsert({
    where: { id: 'admin_role' },
    update: {
      permissions: {
        connect: [
          { id: pMovement.id },
          { id: pCreateMovement.id },
          { id: pReports.id },
          { id: pUsers.id }
        ]
      }
    },
    create: {
      id: 'admin_role',
      name: 'ADMIN',
      permissions: {
        connect: [
          { id: pMovement.id },
          { id: pCreateMovement.id },
          { id: pReports.id },
          { id: pUsers.id }
        ]
      }
    },
  })

  // Crear Rol USER solo con permiso de Movements
  await prisma.role.upsert({
    where: { id: 'user_role' },
    update: {
      permissions: {
        connect: [{ id: pMovement.id }]
      }
    },
    create: {
      id: 'user_role',
      name: 'USER',
      permissions: {
        connect: [{ id: pMovement.id }]
      }
    },
  })

  console.log('Sistema de Roles y Permisos creado en la DB')
}

main()