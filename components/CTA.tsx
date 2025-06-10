import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const CTA = () => {
  return (
    <section className="cta-section">
      <div className='cta-badge'>
        <h2>Start learning your way</h2>
    </div>
    <h1>Build a Personalize Learning Companion</h1>
    <p>
      Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.

    </p>
    <Image src={'/images/cta.svg'} alt='cta' width={500} height={500}/>
    <Link href="/companions/new " className='w-full'>
      <Button variant="outline" className='btn-primary w-full  bg-orange-500 border-0'>Button</Button>
    </Link>
    </section>
  )
}

export default CTA
