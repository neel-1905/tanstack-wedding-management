import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authed)/(dashboard)/weddings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authed)/weddings/"!</div>
}
