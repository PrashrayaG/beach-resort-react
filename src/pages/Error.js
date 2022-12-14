import React from 'react'

import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'


export default function Error() {
  return (
    <Hero>
      <Banner title='404' subtitle='Page not found. Please check the website carefully'>
        <Link to='/' className='btn-primary'>
          Return to The Home Page
        </Link>
      </Banner>
    </Hero>
  )
}
