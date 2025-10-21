import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext' // AuthProviderをインポート
import { EventRequestProvider } from './context/EventRequestContext' // EventRequestProviderをインポート

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* AppコンポーネントをAuthProviderで囲む */}
      <EventRequestProvider> {/* AppコンポーネントをEventRequestProviderで囲む */}
        <App />
      </EventRequestProvider>
    </AuthProvider>
  </StrictMode>,
)
