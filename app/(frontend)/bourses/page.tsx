import React from 'react'
import {fetchBourses} from '@/lib/api'
import BoursesPage from '@/components/boursePage'
import NavBar from '@/components/marketing/navBar'
import Footer from '@/components/marketing/footer'


//export const revalidate = 60;

export default async function Bourses() {
  const bourses = await fetchBourses()

  return (
    <>
    <NavBar/>
    <div>
      <BoursesPage bourses={bourses} />
    </div>
    <Footer/>
    </>
  )
    
}
