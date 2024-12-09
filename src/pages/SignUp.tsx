import { useNavigate } from 'react-router-dom'
import '../style/login.css'
import { api } from '../lib/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useNavigate()

  async function handleSubmit() {

    try {

      setIsLoading(true)

      if (password !== confirmPassword) {
        toast.warning('As senhas não coincidem!')
        return
      }

      if (password.length < 6) {
        toast.warning('A senha deve conter no mínimo 6 caracteres!')
        return
      }

      if(!name || !email || !password || !confirmPassword) {
        toast.warning('Preencha todos os campos!')
        return
      }

      const response = await api.post('/create-user', {
        name:  name,
        email: email,
        password: password,
      })

      if (response.status === 200) {
        toast.success('Usuário cadastrado com sucesso!')
        router('/')
      }

    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar usuário!')
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className='app-container'>

      <div className="login-container">
        <div className='overlay-login' />

        <div className='login-form-container'>

          <h1>Bem-vindo</h1>
          <h2>Informe seus dados para acessar</h2>
          <form>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" onClick={handleSubmit}>
              {
                isLoading ? <Loader2 style={{
                  animation: 'spin 1s linear infinite',
                }}/> : 'Cadastrar'
              }
            </button>
          </form>

        </div>
      </div>

    </div>
  )
}
