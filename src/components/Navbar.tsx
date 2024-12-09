import { NavLink, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
import logo from '../assets/barber-logo.png'
import { LogOut } from 'lucide-react'

export const Navbar = () => {

  const router = useNavigate()

  return (
    <header>
      <img src={logo} alt="barber logo" />
      <nav>
        <ul>
          <li><NavLink to="/">Sign In</NavLink></li>
          <li><NavLink to="/register">Sign Up</NavLink></li>
          <li><NavLink to="/barbers">Barbeiros</NavLink></li>
          <li><NavLink to="/customers">Clientes</NavLink></li>
          <li><NavLink to="/services">Serviços</NavLink></li>
        </ul>
      </nav>
      <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        backgroundColor: '#f1f5f9',
        border: '1px solid #000',
        color: '#000',
      }}
      onClick={() => {
        localStorage.removeItem('userId')
        router('/')
      }}
      >
        Sair
        <LogOut size={20} />
      </button>
    </header>
  )
}
