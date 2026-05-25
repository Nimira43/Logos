import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { Idea } from '#/types'
import api from '#/lib/axios'

const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get('/ideas')
  return res.data
}

const ideasQueryOptions = () => queryOptions({
  queryKey: ['ideas'],
  queryFn: () => fetchIdeas()
})

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [{title: 'Logos Hub - Browse Ideas'}]
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions())
  }
})

function IdeasPage() {
  const { data: ideas  } = useSuspenseQuery(ideasQueryOptions())

  return (
    <div className='p-4'>
      <h1 className='flex text-4xl text-logo text-amber-600 mb-4'>
        Logos
      </h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className='border border-amber-300 p-4 rounded shadow-md bg-white flex flex-col justify-between'
          >
            <div>
              <h2 className='text-lg font-medium text-amber-600'>
                {idea.title}
              </h2>
              <p className='text-gray-700 mt-2'>
                {idea.summary}
              </p>
              <Link
                to='/ideas/$ideaId'
                params={{ ideaId: idea.id.toString() }}
                className='text-white bg-amber-600 text-center inline-block mt-4 px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase' 
              >
                View Idea
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
