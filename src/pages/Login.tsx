import { useNavigate } from 'react-router-dom'
import '../style/login.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../lib/api'
import { Loader2 } from 'lucide-react'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useNavigate()

  async function handleSubmit() {

    try {

      setIsLoading(true)

      if (!email || !password) {
        toast.warning('Preencha todos os campos!')
        return
      }

      const response = await api.post('/user-sign-in', {
        email: email,
        password: password,
      })

      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId)
        router('/barbers')
      }

    } catch {
      toast.error('Email ou senha inválidos!')
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    localStorage.removeItem('userId')
  }, [])

  return (
    <div className='app-container'>

      <div className="login-container">
        <div className='overlay-login' />

        <div className='login-form-container'>

          <h1>Bem-vindo</h1>
          <h2>Faça login para continuar</h2>
          <form>
            <input
              type="email"
              placeholder="Digite seu email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>
              {
                isLoading ? <Loader2 style={{
                  animation: 'spin 1s linear infinite',
                }} /> : 'Entrar'
              }
            </button>
            <a href='/register' style={{
              marginTop: '20px',
            }}>
              Criar conta
            </a>
          </form>

        </div>
      </div>

    </div>
  )
}
