import React from 'react'
import CompCard from '../components/CompCard'
import CompLists from '@/components/CompLists'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants';
import { getAllComaponions } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils'

export const dynamic = 'force-dynamic' // optional: for dynamic data fetching in Next.js

const Page = async () => {
  const companions = await getAllComaponions({});

  return (
    <main className='home-section'>
      <h1>Recently created</h1>
      <section className='companions-grid'>
        {companions.slice(0, 3).map((companion) => (
          <CompCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className='home-section'>
        <CompLists 
          title="Recently Completed Lessons"
          companions={recentSessions}
          classNames="md:w-2/3 max-w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page
