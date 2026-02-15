import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { requireAuth } from "@/lib/auth/getSession";
import { GetServerSideProps } from "next";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"

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
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.slice(0, 6).map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.phone}</TableCell>
                                <TableCell>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href={`/users/edit/${u.id}`}>Editar</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            
                        </TableFooter>
                        </Table>
                </div>
            </div>
        </div>
    );

};