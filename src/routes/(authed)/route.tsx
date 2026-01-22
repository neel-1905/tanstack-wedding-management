import { authedMiddleware } from '@/lib/middleware'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)')({
  component: RouteComponent,
  server: {
    middleware: [authedMiddleware],
  },
  beforeLoad: async ({ serverContext }) => {
    if (!serverContext?.user) {
      throw redirect({ to: '/auth/login' })
    }

    return {
      user: serverContext?.user,
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
