import swaggerJSDoc from 'swagger-jsdoc';
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de gestión',
      version: '1.0.0',
      description: 'Documentación de las APIs',
    },
  },
  apis: [path.join(process.cwd(), "pages/api/**/*.{ts,js}"),
    path.join(process.cwd(), "app/api/**/*.{ts,js}")], // Rutas archivos de API en local y producción
};

export const spec = swaggerJSDoc(options);