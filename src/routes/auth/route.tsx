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
    <main className="flex divide-x">
      <div className="w-1/2 flex-center">SOME IMAGES</div>
      <div className="w-1/2 flex-center-col min-h-screen py-7">
        <Outlet />
      </div>
    </main>
  )
}
