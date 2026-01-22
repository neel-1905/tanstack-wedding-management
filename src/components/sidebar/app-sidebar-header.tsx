import { SidebarHeader } from '@/components/ui/sidebar'
import { WeddingSwitcher } from './wedding-switcher'

// Mock data: In a real app, this might come from a useQuery or a Loader
const data = {
  weddings: [
    {
      id: '1',
      couple: 'Sarah & James',
      date: 'Oct 24, 2025',
      location: 'San Francisco, CA',
    },
    {
      id: '2',
      couple: 'Elena & Marcus',
      date: 'June 12, 2026',
      location: 'Lake Como, Italy',
    },
  ],
}

const AppSidebarHeader = () => {
  return (
    <SidebarHeader>
      <WeddingSwitcher
        weddings={data.weddings}
        defaultWeddingId={data.weddings[0].id}
      />
    </SidebarHeader>
  )
}

export default AppSidebarHeader
