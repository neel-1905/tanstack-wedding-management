import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'

export const Route = createFileRoute('/(authed)/(dashboard)')({
  component: RouteComponent,
  loader: async ({ serverContext }) => {
    if (!serverContext) {
      throw new Error('No server context')
    }

    return {
      user: serverContext?.user,
    }
  },
})

function RouteComponent() {
  const { user } = Route.useLoaderData()
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
