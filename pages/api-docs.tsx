import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { requireAuth } from '@/lib/auth/getSession';
import { Loader2 } from 'lucide-react';


export const getServerSideProps = requireAuth;
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => <div className='flex h-screen items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
});

export default function ApiDocsPage() {
  // Pasar la URL del API de docs
  return (
    <div className="bg-white min-h-screen">
      <SwaggerUI url="/api/docs" />
    </div>
  );
}