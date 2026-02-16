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
  apis: ['./pages/api/**/*.ts'], 
};

export const spec = swaggerJSDoc(options);