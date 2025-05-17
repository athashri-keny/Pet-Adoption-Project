
import './App.css'
import Navbar from './Components/Header/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
 <>
<div>
  <div>
    <Navbar/>
  </div>
  <main>
    <Outlet/>
  </main>
</div>

</>

  )
}

export default App
