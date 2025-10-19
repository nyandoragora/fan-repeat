import { useState } from 'react'
import './App.css'
import { EventPage } from './pages/EventPage//EventPage'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EventPage />
    </>
  )
}

export default App
