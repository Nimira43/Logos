import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [{title: 'Logos Hub - Browse Ideas'}]
  }),
  component: IdeasPage,
})

function IdeasPage() {
  return (
    <div className='p-4'>
      <h1 className='flex text-6xl text-logo text-amber-600 mb-5'>
        Logos
      </h1>
      <p>Ideas Page</p>
    </div>
  )
}
