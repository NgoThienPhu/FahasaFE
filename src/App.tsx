import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <div className='content'>
          <Routes>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
