import { createFileRoute, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchIdeas } from '#/api/ideas'

const latestIdeasQueryOptions = () =>
  queryOptions({
    queryKey: ['latest-ideas'],
    queryFn: async () => {
      const ideas = await fetchIdeas()

      return ideas
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 4) 
    }
  })

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Logos Hub - Home' }]
  }),
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(latestIdeasQueryOptions())
  },
  component: Home
})

function Home() {
  const { data: latestIdeas } = useSuspenseQuery(latestIdeasQueryOptions())

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-amber-600'>
          Welcome to Logos
        </h1>
        <p className='text-lg text-gray-700 mt-4 max-w-2xl mx-auto'>
          A small experimental hub for ideas, tinkering, and creative sparks.
          Browse concepts, explore possibilities, and build something new.
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-medium text-amber-600 mb-6 text-center'>
          Latest Ideas
        </h2>

        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {latestIdeas.map((idea) => (
            <li
              key={idea.id}
              className='border border-amber-300 p-4 rounded shadow-sm bg-white'
            >
              <h3 className='text-lg font-medium text-amber-600'>
                {idea.title}
              </h3>
              <p className='text-gray-700 mt-2'>
                {idea.summary}
              </p>

              <Link
                to='/ideas/$ideaId'
                params={{ ideaId: idea.id.toString() }}
                className='inline-block mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-500 transition uppercase text-sm'
              >
                View Idea
              </Link>
            </li>
          ))}
        </ul>

        <div className='text-center mt-10'>
          <Link
            to='/ideas'
            className='text-white bg-amber-600 text-center px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase'
          >
            Browse all ideas
          </Link>
        </div>
      </section>
    </div>
  )
}

