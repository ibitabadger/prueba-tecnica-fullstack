import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { requireAuth } from '@/lib/auth/getSession';


export const getServerSideProps = requireAuth;
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => <div className="p-10 text-center">Cargando documentación...</div>
});

export default function ApiDocsPage() {
  // Le pasamos la URL de nuestra API de docs
  return (
    <div className="bg-white min-h-screen">
      <SwaggerUI url="/api/docs" />
    </div>
  );
}