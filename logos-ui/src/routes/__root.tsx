import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext
} from '@tanstack/react-router'
import '../styles.css'
import Header from '#/components/Header'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share, explore, collaborate and build on startup ideas and projects.'
      },
      {
        title: 'Logos - Your Creation Platform'
      }
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='min-h-screen bg-amber-50 flex flex-col'>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className='w-full max-w-4xl bg-white rounded shadow p-8'>
          <Outlet />    
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}


