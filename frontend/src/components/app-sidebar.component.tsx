import type { Sidebar } from './ui/sidebar'
import { Banknote, LogIn, Settings, Wallet } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { authClient } from '@/lib/auth-client'
import { NavUser } from './nav-user.component'
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Skeleton } from './ui/skeleton'

const HeavySidebar = lazy(() => import('./ui/sidebar').then(module => ({ default: module.Sidebar })))
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = authClient.useSession()

  const navigate = useNavigate()

  const handleLoginRedirect = async () => {
    navigate('/login')
  }

  return (
    <Suspense fallback={<Skeleton className="h-full w-56"></Skeleton>}>
      <HeavySidebar {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={window.location.pathname === '/home'} asChild>
                <NavLink
                  to="/home"
                >

                  <Wallet />
                  <span className="text-base font-semibold">BuyWise</span>

                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                <SidebarMenuItem className="flex items-center gap-2">
                  <SidebarMenuButton isActive={window.location.pathname === '/'} asChild>
                    <NavLink
                      to="/"

                    >
                      <Banknote />
                      <span className="">Purchase</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarMenu>
                <SidebarMenuItem className="flex items-center gap-2">
                  <SidebarMenuButton isActive={window.location.pathname === '/settings'} asChild>
                    {data && (
                      <NavLink
                        to="/settings"

                      >
                        <Settings />
                        <span>Settings</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {data && data.user
            ? (
                <NavUser user={{ name: data?.user.name ?? '', email: data?.user.email ?? '', avatar: data?.user.image ?? '' }} />
              )
            : (
                <SidebarMenuButton onClick={handleLoginRedirect}>
                  <LogIn />
                  <span>Sign In</span>
                </SidebarMenuButton>

              )}
        </SidebarFooter>

      </HeavySidebar>
    </Suspense>

  )
}
