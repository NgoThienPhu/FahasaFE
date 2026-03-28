import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/root/Layout'
import Loading from './components/loading/Loading'
import Introduce from './pages/introduce/Introduce'
import Profile from './pages/profile/Profile'

const Home = lazy(() => import('./pages/home/Home'))
const Auth = lazy(() => import('./pages/auth/Auth'))
const Products = lazy(() => import('./pages/products/Products'))
const ProductDetail = lazy(() => import('./pages/product_detail/ProductDetail'))
const ResetPassword = lazy(() => import('./pages/auth/components/ResetPassword'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))

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
            <Auth />
          </Suspense>
        } />
        <Route path="auth/resset-password" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <ResetPassword />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <Profile />
          </Suspense>
        } />
        <Route path="checkout" element={
          <Suspense fallback={<Loading notify='Đang tải...' />}>
            <Checkout />
          </Suspense>
        } />
        <Route path="*" element={<>Trang không tồn tại</>} />
      </Route>
    </Routes>
  )
}

export default App
