import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// const App = ({ Component, pageProps }: AppProps) => (
//   <Component {...pageProps} />
// );

// export default App;

// pages/_app.tsx
import { SidebarProvider } from "@/components/ui/sidebar"
import { useRouter } from "next/router"
import { AppSidebar } from '@/components/AppSidebar';
import { LayoutDashboard, ArrowDownUp, UsersRound, FileText } from "lucide-react";
import { authClient } from '@/lib/auth/client';

const mainMenu = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Ingresos y egresos", href: "/movements", icon: ArrowDownUp },
  { title: "Usuarios", href: "/users", icon: UsersRound },
  { title: "Reportes", href: "/reports", icon: FileText },
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const session = pageProps.session;


  // Definir ruta que no lleva sidebar
  const isLoginPage = router.pathname === "/auth/login"

  //Si es login, retornar la página "limpia"
  if (isLoginPage) {
    return <Component {...pageProps} />
  }

  //Visualizar partes del sidebar dependiendo del rol del usuario

  const baseItems = [
    { title: "Ingresos y egresos", href: "/movements", icon: ArrowDownUp },
  ];

  const adminItems =
    session?.user?.roleId === "admin_role"
      ? [
          { title: "Usuarios", href: "/users", icon: UsersRound },
          { title: "Reportes", href: "/reports", icon: FileText },
        ]
      : [];

const items = [...baseItems, ...adminItems];
  return (
    <SidebarProvider>
    <div className="flex min-h-screen w-full">
      {/* USAR EL COMPONENTE PASANDO EL PARÁMETRO */}
      <AppSidebar menuItems={items} />
      
      <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl justify-self-center mb-4">
              Sistema de gestión de ingresos y gastos 
            </h1>
          </div>
         <Component {...pageProps} />
      </main>
    </div>
  </SidebarProvider>
  )
}