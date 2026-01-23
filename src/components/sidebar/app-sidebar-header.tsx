import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { Heart } from 'lucide-react'

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="pt-4 px-2">
      <SidebarMenu>
        <SidebarMenuItem>
          {/* Using Link instead of a button/switcher ensures SPA navigation */}
          <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
            <Link to="/" className="flex items-center gap-3">
              {/* Logo Icon */}
              <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-linear-to-br from-pink-500 to-rose-600 text-white shadow-sm">
                <Heart className="size-5 fill-current" />
              </div>

              {/* Brand Text */}
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-bold text-base tracking-tight text-foreground">
                  EverAfter
                </span>
                <span className="truncate text-xs font-medium text-muted-foreground">
                  Planner Pro
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default AppSidebarHeader
