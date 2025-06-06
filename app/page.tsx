import React from 'react'
import CompCard from '../components/CompCard'
import CompLists from '@/components/CompLists'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants';

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);        // Full color range
  const saturation = 100;                             // Full color for vibrancy
  const lightness = Math.floor(Math.random() * 20) + 70; // Light: 70%–90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


console.log(getRandomColor()); // Example: #3E2F1B


const Page = () => {

  return (
    <main className=''>
      <h1>Popular Companions</h1>
      <section className='home-section'>
        <CompCard 
          id={1}
          name="Neurology"
          topic="Introduction to Neurology"
          subject="Science"
          duration="45"
          color={getRandomColor()}
        />
        <CompCard 
          id={1}
          name="Neurology"
          topic="Introduction to Neurology"
          subject="Science"
          duration="45"
          color={getRandomColor()}
        /><CompCard 
          id={1}
          name="Neurology"
          topic="Introduction to Neurology"
          subject="Science"
          duration="45"
          color={getRandomColor()}
        />
        
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