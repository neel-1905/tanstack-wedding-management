'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Heart, Calendar } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

// Defining a better data structure for a wedding
export type Wedding = {
  id: string
  couple: string
  date: string
  location: string
}

export function WeddingSwitcher({
  weddings,
  defaultWeddingId,
}: {
  weddings: Wedding[]
  defaultWeddingId: string
}) {
  const [activeWedding, setActiveWedding] = React.useState(
    weddings.find((w) => w.id === defaultWeddingId) || weddings[0],
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-500 text-white">
                <Heart className="size-4 fill-current" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeWedding.couple}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeWedding.date}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Your Weddings
            </DropdownMenuLabel>
            {weddings.map((wedding) => (
              <DropdownMenuItem
                key={wedding.id}
                onSelect={() => setActiveWedding(wedding)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Calendar className="size-3" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{wedding.couple}</span>
                  <span className="text-xs text-muted-foreground">
                    {wedding.location}
                  </span>
                </div>
                {wedding.id === activeWedding.id && (
                  <Check className="ml-auto size-4" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <span className="text-lg font-bold leading-none">+</span>
              </div>
              <div className="font-medium text-muted-foreground">
                Add Wedding
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
