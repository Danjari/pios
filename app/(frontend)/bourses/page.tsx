import React from 'react'
import {fetchBourses} from '@/lib/api'
import BoursesPage from '@/components/boursePage'


export const revalidate = 60;

export default async function Bourses() {
  const bourses = await fetchBourses()

  return (
    <div>
      <BoursesPage bourses={bourses} />
    </div>
  )
    
}
