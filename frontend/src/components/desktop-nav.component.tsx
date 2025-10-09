import { } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { authClient } from '../lib/auth-client'
import { AppSidebar } from './app-sidebar.component'
import { Button } from './ui/button'
import { SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from './ui/sidebar'

export function DesktopNavbar({ content }: { content: React.ReactNode }) {
  const { data } = authClient.useSession()
  const navigate = useNavigate()

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
    <>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar collapsible="icon" variant="inset" />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">
            {content}

          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
