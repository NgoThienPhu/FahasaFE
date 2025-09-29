import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Home, Login, Register, Products, Profile } from './pages';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className='app'>
          <Header />
          <div className='content'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile"
              element={
                <ProtectedRoute requireAuth redirectTo="/login">
                  <Profile />
                </ProtectedRoute>
              }
            />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
