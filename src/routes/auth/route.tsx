import { authMiddleware } from '@/lib/middleware'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  server: {
    middleware: [authMiddleware],
  },
})

function RouteComponent() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
