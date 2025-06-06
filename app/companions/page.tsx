import React from 'react'
import { getAllComaponions } from '@/lib/actions/companion.action'
import CompCard from '@/components/CompCard'
import { getSubjectColor } from '@/lib/utils'
import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/SubjectFilter'

const Companions = async ({searchParams}: SearchParams) => {
  const filters= await searchParams
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllComaponions({subject, topic})
  console.log('Companions:', companions);
  
  
  return (
    <main className='flex flex-col items-center justify-center'>
      <section className='flex  max-sm:flex-col justify-between items-center w-full'>
        <h1>Companion Library</h1>
        <div className="flex w-full max-w-sm items-center gap-2">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className='companions-grid'>
            {companions.map((companion) => (
              <CompCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
            ))}
      </section>
    </main>
  )
}

export default Companions
