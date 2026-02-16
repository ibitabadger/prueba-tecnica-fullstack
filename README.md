## Prueba Técnica para Desarrollador Fullstack

### Ejecución local del Proyecto

1. **Clonar dependencias**

Ejecutar en consola los siguientes comandos:

```bash
git clone (https://github.com/ibitabadger/prueba-tecnica-fullstack.git)
cd prueba-tecnica-fullstack
npm install
```
2. **Variables de entorno**
Agregar el archivo .env en la raíz del proyecto compartido por correo.

3. **Sincronización de base de datos**

Generar el cliente de Prisma

```bash
npx prisma generate
```

4. **Ejecutar aplicación**
```bash
npm run dev
```
- La app estará disponible en http://localhost:3000.

### Test unitarios

Se han implementado pruebas unitarias utilizando Jest para validar la lógica central

  - **amount-styles:** Valida que en el frontend retorne texto verde para ingresos y texto rojo para egresos

  - **error-handling:** Valida manejo de errores y excepciones del backend

  - **permissions:** Valida si los controles de accesos de acuerdo al rol fueron implementados correctamente

Para correr los tests:
```bash
npm test
```
### Documentación de la API (Swagger)
La API está completamente documentada siguiendo el estándar OpenAPI 3.0.

  - **Ruta de la documentación:** /api-docs (Interfaz visual de Swagger).

  - **Ruta del JSON:** /api/docs.

### Seguridad y RBAC
Se implementó un sistema de Control de Acceso Basado en Roles (RBAC):

  - **Protección de Backend:** Las rutas en /api validan la sesión y rechazan conexiones no autenticadas con un error 401.

  - **Protección de Frontend:** Se utiliza una función requireAuth en getServerSideProps para validar no solo la sesión, sino también los permisos por página consultando la tabla Permission en la base de datos.

### Despliegue en Vercel

El proyecto está optimizado para ser desplegado en Vercel siguiendo estos pasos:

Crear un nuevo proyecto en Vercel y conectar el repositorio de GitHub.

Configurar las Environment Variables en el panel de Vercel con valores establecidos en un nuevo OAuth para producción (se comparte archivo variables-prod por correo).

En la configuración de GitHub OAuth App, añade la URL de callback de producción: https://tu-app.vercel.app/api/auth/callback/github.

Vercel ejecutará automáticamente npm run build y desplegará la aplicación.

  - Para este caso, **la aplicación ya se encuentra desplegada: https://prueba-tecnica-fullstack-red.vercel.app/**