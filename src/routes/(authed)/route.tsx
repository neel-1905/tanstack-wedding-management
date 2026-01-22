import { authedMiddleware } from '@/lib/middleware'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)')({
  component: RouteComponent,
  server: {
    middleware: [authedMiddleware],
  },
})

function RouteComponent() {
  return <Outlet />
}
