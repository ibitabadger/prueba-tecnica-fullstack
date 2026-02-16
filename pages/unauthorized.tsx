import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-background p-4'>
      <div className='max-w-md w-full text-center space-y-6'>

        <div className='flex justify-center'>
          <div className='bg-destructive/10 p-6 rounded-full animate-pulse'>
            <ShieldAlert className='h-16 w-16 text-destructive' />
          </div>
        </div>

        {/* Mensaje principal */}
        <div className='space-y-2'>
          <h1 className='text-4xl font-extrabold tracking-tight'>
            Acceso Denegado
          </h1>
          <p className='text-muted-foreground text-lg'>
            Lo sentimos, tu rol no tiene los permisos necesarios para ver esta
            sección.
          </p>
        </div>

        <div className='border-t border-border pt-6 flex flex-col gap-3'>
          <Button
            onClick={() => router.push('/')}
            variant='default'
            className='w-full py-6 text-md font-semibold'
          >
            <ArrowLeft className='mr-2 h-5 w-5' />
            Volver atrás
          </Button>
        </div>

        <p className='text-xs text-muted-foreground pt-4'>
          Si crees que esto es un error, contacta al administrador del sistema.
        </p>
      </div>
    </div>
  );
}
