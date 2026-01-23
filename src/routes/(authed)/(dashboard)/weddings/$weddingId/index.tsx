import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authed)/(dashboard)/weddings/$weddingId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authed)/(dashboard)/weddings/$weddingId/"!</div>
}
