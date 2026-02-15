import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, Loader2, User as UserIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { requireAuth } from "@/lib/auth/getSession";
import { GetServerSideProps } from 'next';



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireAuth(ctx, "users");
};

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la URL

  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Cargar los datos del usuario al entrar
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/user`);
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setRoleId(data.roleId);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, roleId })
      });

      if (res.ok) {
        router.push('/users/users'); // Volver a la pagina que lista de usuarios
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="mb-8">
        <h1 className="text-3xl pb-10 underline">
            Usuarios
        </h1>
        <div className="flex flex-col items-center p-8">

        <div className="w-full max-w-lg space-y-4">
            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Editar Usuario</CardTitle>
                <CardDescription>Actualiza la información del perfil y permisos.</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleUpdate}>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                    id="name"
                    placeholder="Ingrese el nuevo nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Asignar Rol</Label>
                    <Select value={roleId} onValueChange={setRoleId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin_role">Administrador</SelectItem>
                        <SelectItem value="user_role">Usuario Estándar</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </CardContent>
                
                <CardFooter>
                <Button type="submit" className="w-full mr-2" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Guardando..." : "Actualizar Usuario"}
                </Button>
                
                <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
                  Cancelar
                </Button>
                </CardFooter>
            </form>
            </Card>
        </div>
        </div>
    </div>
  );
}