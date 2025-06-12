import { useEffect } from 'react'
import AuthService from '../appwrite/Auth'
import LandingPage from '../Landing/LandingPage'
import About from '../Footer/About'
// things to do 
// loop the pet pics using map
// degsin the components of the pet 
// and display 

function Home() {
// get current posts
  return (
<>

  <LandingPage />
  <About />


</>
  )
}

export default Home