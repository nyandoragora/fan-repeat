import { useState } from 'react'
import './App.css'
import { EventPage } from './pages/EventPage/EventPage'

function App() {
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'

  // 全体のフォントサイズを動的に変更するためのクラス名
  const appClassName = `font-size-${fontSize}`;

  return (
    <div className={appClassName}>
      <EventPage fontSize={fontSize} setFontSize={setFontSize} />
    </div>
  )
}

export default App