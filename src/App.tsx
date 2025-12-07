import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout/Layout'
import { Loading } from './components/Loading/Loading'
import Introduce from './pages/Introduce/Introduce'
import { ProtectedRouter } from './components/protected_router/ProtectedRouter'

const Home = lazy(() => import('./pages/Home/Home'))
const Auth = lazy(() => import('./pages/Auth/Auth/Auth'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Suspense fallback={<Loading notify='Đang tải thông tin...' />}>
            <Home />
          </Suspense>
        } />
        <Route path="about" element={<Introduce />} />
        <Route path="products" element={<>Đây là trang sản phẩm</>} />
        <Route path="auth" element={
          <Suspense fallback={<Loading notify='Đang tải thông tin...' />}>
            <ProtectedRouter redirectIfAuth={true}>
              <Auth />
            </ProtectedRouter>
          </Suspense>
        } />
        <Route path="*" element={<>Trang không tồn tại</>} />
      </Route>
    </Routes>
  )
}

export default App
