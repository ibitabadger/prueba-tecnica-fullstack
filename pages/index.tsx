import { ActionCard } from "@/components/ActionCard";
import { ArrowDownUp, UsersRound, FileText } from "lucide-react";
import { requireAuth } from "@/lib/auth/getSession";
import { useRouter } from 'next/router';

export const getServerSideProps = requireAuth;

export default function Home({ session }: any) {
  const router = useRouter();
  return ( 
      <main className="flex-1 p-8 text-black">
        
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl">
            Bienvenido/a, {session?.user?.name || 'usuario'}!
          </h1>
          <p className="text-zinc-600">Este es el mejor sistema de gestión para su empresa</p>
        </div>

        {/* Cards de acciones */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            title="Ingresos y Egresos" 
            icon={ArrowDownUp} 
            onClick={() => router.push('/movements')} 
          />
          {session.user.roleId === "admin_role" && (
            <>
              <ActionCard 
                title="Gestión de Usuarios" 
                icon={UsersRound} 
                onClick={() => router.push('/users')} 
              />
              <ActionCard 
                title="Reportes" 
                icon={FileText} 
                onClick={() => router.push('/reports')} 
              />
            </>
          )}
        </div>
      </main>
  );
}
