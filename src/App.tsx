import { Routes, Route, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import { Barbers } from './pages/Barbers';
import { Services } from './pages/Services';
import { Customers } from './pages/Customers';
import { Navbar } from './components/Navbar';
import { NoMatch } from './pages/NoMatch';
import '../src/style/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUp } from './pages/SignUp';

function App() {

  const location = useLocation();

  const userId = localStorage.getItem('userId')

  const unauthenticatedRoutes = ['/', '/register']

  if (!userId && !unauthenticatedRoutes.includes(location.pathname)) {
    window.location.href = '/';
  }

  return (
    <div>
      {
        location.pathname !== '/' && <Navbar />
      }
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/barbers" element={<Barbers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <ToastContainer />
    </div>
  )
}

export default App
