import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './compoments/layout/Layout/Layout'
import { Loading } from './compoments/Loading/Loading'

const Home = lazy(() => import('./pages/Home/Home'))
const Auth = lazy(() => import('./pages/Auth/Auth'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Suspense fallback={<Loading notify='Đang tải thông tin...' />}>
            <Home />
          </Suspense>
        } />
        <Route path="about" element={<>Đây là trang giới thiệu</>} />
        <Route path="products" element={<>Đây là trang sản phẩm</>} />
        <Route path="auth" element={
          <Suspense fallback={<Loading notify='Đang tải thông tin...' />}>
            <Auth />
          </Suspense>
        } />
        {/* <Route path="loading" element={<Loading />} /> */}
        <Route path="*" element={<>Trang không tồn tại</>} />
      </Route>
    </Routes>
  )
}

export default App
