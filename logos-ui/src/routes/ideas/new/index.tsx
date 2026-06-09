import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { Idea } from '#/types'

export const Route = createFileRoute('/ideas/new/')({
  component: NewIdeaPage,
})

function NewIdeaPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')

  return (
    <div className='space-y-4'>
      <h1 className='text-amber-600 text-3xl text-center font-medium mb-6'>Create New Idea</h1>
      <form className='space-y-2'>
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            id='Summary'
            type='text'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div>
          <label
            htmlFor='body'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='body'
            value={summary}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          ></textarea>
        </div>
        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            id='tags'
            type='text'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div className='mt-5'>
          <button
            type='submit'
            className='block w-full bg-amber-600 hover:bg-amber-500 text-white transitioning font-medium rounded px-6 py-2 uppercase disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
