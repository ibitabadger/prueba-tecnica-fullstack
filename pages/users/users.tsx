import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { requireAuth } from "@/lib/auth/getSession";
import { GetServerSideProps } from "next";

interface User {
  id: string;
  name: string;
  email: number;
  phone: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, "users");
};


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users/user')
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return(
        <div className="mb-8">
            <div className="p-8">
                <h1 className="text-3xl pb-10 underline">Usuarios</h1>
                
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((u) => (
                        <tr key={u.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{u.name}</td>
                            <td className="px-6 py-4 text-sm font-bold">{u.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{u.phone}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                <Button asChild size="sm" variant="outline">
                                    <Link href={`/users/edit/${u.id}`}>Editar</Link>
                                </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};