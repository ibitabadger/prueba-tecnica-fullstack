import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de gestión',
      version: '1.0.0',
      description: 'Documentación de las APIs',
    },
  },
  apis: ['./pages/api/**/*.ts', './pages/api/**/*.js', "app/api/**/*.ts", "app/api/**/*.js"], // Rutas archivos de API en local y producción
};

export const spec = swaggerJSDoc(options);