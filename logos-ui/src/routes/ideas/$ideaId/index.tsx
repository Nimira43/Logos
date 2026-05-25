import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import type { Idea } from '#/types'
import api from '#/lib/axios'

const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`)
  return res.data
}

const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams()

  const { data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId))
  return (
    <div className='p-4'>
      <h1 className='flex text-6xl text-logo text-amber-600 mb-5'>
        Logos
      </h1>
      <Link
        to='/ideas'
        className='text-amber-600 block mb-4 hover:text-amber-500 uppercase transitioning' 
      >
        <span className='font-medium'>
          Back
        </span>
      </Link>
      <h2 className='text-2xl font-medium'>
        {idea.title}
      </h2>
      <p className='mt-2'>
        {idea.description}
      </p>
    </div>
  )
}
