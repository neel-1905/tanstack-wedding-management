import { Gem, LayoutDashboard } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import AppSidebarHeader from './app-sidebar-header'
import { AppSidebarFooter } from './app-sidebar-footer'
import { TUser } from '@/features/auth/domain/auth.types'
import { useLocation } from '@tanstack/react-router'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Weddings',
    url: '/weddings',
    icon: Gem,
  },
]

export function AppSidebar({ user }: { user: TUser }) {
  const pathname = useLocation().pathname

  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive =
                  item.url === '/'
                    ? pathname === item.url
                    : pathname.includes(item.url)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter user={user} />
    </Sidebar>
  )
}
