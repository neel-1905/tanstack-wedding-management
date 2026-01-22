import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/(dashboard)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Dashboard Layout
      <Outlet />
    </div>
  )
}
