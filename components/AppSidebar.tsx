import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuthActions } from '@/hooks/use-auth';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';

interface AppSidebarProps {
  menuItems: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

export function AppSidebar({ menuItems }: AppSidebarProps) {
  const { logout, isPending } = useAuthActions();
  return (
    <Sidebar className='bg-[#0a0a0a]'>
      <SidebarHeader className='pt-8 pb-8'>
        <div className='flex items-center justify-start'>
          <Link
            href='/'
            className='flex items-center justify-start cursor-pointer'
          >
            <img
              src='/white-prevalentware.png'
              alt='Logo prevalentware'
              className='h-30 w-auto object-contain'
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarTrigger />
      <Separator className='bg-zinc-500 w-[85%] mx-auto' />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.href}
                    className='text-zinc-400 hover:text-[#fafafa]'
                  >
                    <item.icon className='mr-2 h-5 w-5' />
                    <span className='font-bold text-lg'>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <Separator className='bg-zinc-500 w-[85%] mx-auto mt-4' />

            <Button
              type='button'
              variant='secondary'
              onClick={logout}
              disabled={isPending}
              className='mt-8'
            >
              {isPending ? (
                <Loader2 className='animate-spin' size={16} />
              ) : (
                <LogOut size={16} />
              )}
              <span>{isPending ? 'Cerrando...' : 'Cerrar sesión'}</span>
            </Button>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
