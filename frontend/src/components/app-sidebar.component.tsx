import { Banknote, Home, LogIn, LogOut, Settings, Wallet } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = authClient.useSession()

  const navigate = useNavigate()
  const { state } = useSidebar()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/login')
        },
      },
    })
  }

  const handleLoginRedirect = async () => {
    navigate('/login')
  }

  return (
    <Sidebar {...props}>
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
        {data
          ? (
              <div className="space-y-4">
                <div
                  className={`
                    transition-all duration-300 ease-in-out
                    ${state === 'expanded' ? 'opacity-100 max-h-40 scale-100' : 'opacity-0 max-h-0 scale-95 pointer-events-none'}
                    origin-left overflow-hidden
                  `}
                >
                  <span className="text-sm transition-all">Signed in as</span>
                  <p className="font-medium transition-all">{data.user?.email}</p>
                </div>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </div>

            )

          : (

              <SidebarMenuButton onClick={handleLoginRedirect}>

                <LogIn />
                <span>Sign In</span>
              </SidebarMenuButton>

            )}
      </SidebarFooter>
    </Sidebar>
  )
}
