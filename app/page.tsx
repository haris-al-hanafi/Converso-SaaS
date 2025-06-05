import React from 'react'
import { Button } from "@/components/ui/button"

const Page = () => {
  return (
    <div className='home-section'>
      <h1 className='text-2xl underline'>Hello World</h1>
      <Button variant="ghost" className='btn-primary'> Let's get started</Button>
    </div>
  )
}

export default Page