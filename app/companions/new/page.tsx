import React from 'react'
import { CompForm } from '../../../components/Form'

const NewCompanions = () => {
  return (
    <main className='flex w-full flex-col items-center justify-center md:p-0 p-5'>
      <article  className='md:w-1/2 w-full p-5 rounded-md border border-purple-700'>
        <h1 className='text-purple-700'>Create a new Companion</h1>
        <CompForm />
        </article>
    </main>
  )
}

export default NewCompanions
