import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout/Layout'
import Loading from './components/Loading/Loading'
import Introduce from './pages/Introduce/Introduce'
import { ProtectedRouter } from './components/protected_router/ProtectedRouter'
import Profile from './pages/Profile/Profile'

const Home = lazy(() => import('./pages/Home/Home'))
const Auth = lazy(() => import('./pages/Auth/Auth'))
const Products = lazy(() => import('./pages/Products/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const ResetPassword = lazy(() => import('./pages/Auth/components/ResetPassword'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <Home />
          </Suspense>
        } />
        <Route path="about" element={<Introduce />} />
        <Route path="products" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <Products />
          </Suspense>
        } />
        <Route path="products/:id" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <ProductDetail />
          </Suspense>
        } />
        <Route path="auth" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <ProtectedRouter redirectIfAuth={true}>
              <Auth />
            </ProtectedRouter>
          </Suspense>
        } />
        <Route path="auth/resset-password" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <ResetPassword />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          </Suspense>
        } />
        <Route path="*" element={<>Trang không tồn tại</>} />
      </Route>
    </Routes>
  )
}

export default App
