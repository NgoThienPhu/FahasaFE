import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import Notification from './components/notification/Notification.tsx'
import { CartProvider } from './contexts/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <App />
          <Notification />
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  </BrowserRouter>,
)
