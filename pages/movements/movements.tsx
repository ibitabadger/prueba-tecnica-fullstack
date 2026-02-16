import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { requireAuth } from '@/lib/auth/getSession';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetServerSideProps } from 'next';

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  user: { name: string | null };
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, 'movements');
};

export default function MovementsPage({ session }: any) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  // Sumar todos los montos
  const totalAmount = movements.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    fetch('/api/movements/movement')
      .then((res) => res.json())
      .then((data) => {
        setMovements(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );

  return (
    <div className='mb-8'>
      <div className='p-8'>
        <h1 className='text-2xl text-left underline underline-offset-[12px] pb-10'>Ingresos y egresos</h1>
        <div className=' text-right'>
          {session.user.roleId === 'admin_role' && (
            <Button asChild className='text-xl mt-8'>
              <Link href='/movements/create'>
                <Plus className='h-5 w-5' />
                Nuevo
              </Link>
            </Button>
          )}
        </div>
        <h1 className='text-2xl font-bold mb-6'>Lista de Movimientos</h1>

        <div className='overflow-x-auto bg-white rounded-lg shadow'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.slice(0, 6).map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.concept}</TableCell>
                  <TableCell
                    className={`px-6 py-4 text-sm font-bold ${m.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    $
                    {m.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{new Date(m.date).toLocaleDateString()}</TableCell>
                  <TableCell>{m.user?.name || 'Sistema'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>

      <div className='flex justify-end'>
        <Card className='md:w-72 text-gray shadow-xl'>
          <CardHeader className='pb-2'>
            <CardDescription className='text-zinc-700'>
              Balance Total
            </CardDescription>
            {/* Si hay ganancia o perdida, el color del total cambia automáticamente */}
            <CardTitle
              className={`text-2xl ${totalAmount >= 0 ? 'text-green-600' : 'text-red-400'}`}
            >
              $
              {totalAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}{' '}
              COP
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
