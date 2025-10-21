import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventPage } from './pages/EventPage/EventPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage/AdminDashboardPage'; // AdminDashboardPageをインポート

function App() {
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'

  // 全体のフォントサイズを動的に変更するためのクラス名
  const appClassName = `font-size-${fontSize}`;

  return (
    <div className={appClassName}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventPage fontSize={fontSize} setFontSize={setFontSize} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> {/* AdminDashboardPageへのルートを追加 */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App