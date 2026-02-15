import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { requireAuth } from "@/lib/auth/getSession";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { GetServerSideProps } from "next";

interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  user: { name: string | null };
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, "movements");
};


export default function MovementsPage({ session }: any) {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  // Sumar todos los montos
  const totalAmount = movements.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    fetch('/api/movements/movement')
      .then(res => res.json())
      .then(data => {
        setMovements(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (

    <div className="mb-8">
        <div className="p-8">
          <h1 className="text-3xl underline mb-4">Ingresos y egresos</h1>
          <div className=" text-right">
          {session.user.roleId === "admin_role" && (
            <Button asChild className="text-xl mt-8">
              <Link href="/movements/create">
                <Plus className="h-5 w-5" />
                Nuevo
              </Link>
            </Button>
          )}
        </div>
          <h1 className="text-2xl font-bold mb-6">Lista de Movimientos</h1>
          
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {movements.map((m) => (
                  <tr key={m.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{m.concept}</td>
                    <td className={`px-6 py-4 text-sm font-bold ${m.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${m.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(m.date).toLocaleDateString()} 
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {m.user?.name || 'Sistema'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <Card className="md:w-72 text-gray shadow-xl">
            <CardHeader className="pb-2">
              <CardDescription className="text-zinc-700">Balance Total</CardDescription>
              {/* Si hay ganancia o perdida, el color del total cambia automáticamente */}
              <CardTitle className={`text-2xl ${totalAmount >= 0 ? 'text-green-600' : 'text-red-400'}`}> 
                ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} COP
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
    </div>

  );
}