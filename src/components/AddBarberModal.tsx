import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface IAddBarberModalProps {
  setShowAddBarberModal: (showAddBarberModal: boolean) => void;
  setMustUpdateList: (mustUpdateList: boolean) => void
}

export const AddBarberModal = ({ setShowAddBarberModal, setMustUpdateList }: IAddBarberModalProps) => {

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [shift, setShift] = useState('')

  const userId = localStorage.getItem('userId')

  async function handleAddBarber() {

    try {

      if (!name || !cpf || !email || !shift) {
        toast.warning('Preencha todos os campos!')
        return
      }

      const newBarber = {
        name,
        cpf,
        email,
        shift
      }

      const response = await api.post('/create-barber', {
        ...newBarber,
        userId
      })  

      if (response.status == 200) {
        toast.success('Barbeiro adicionado com sucesso!')
        setMustUpdateList(true)
        setShowAddBarberModal(false)
        return
      }

      toast.error('Erro ao adicionar barbeiro!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao adicionar barbeiro!')
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowAddBarberModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Adicionar Barbeiro
          </h2>
          <span className="close"
            onClick={() => setShowAddBarberModal(false)}
          >
            &times;
          </span>
        </div>

        <div className="body-modal">
          <form>
            <input
              type="text"
              placeholder="Nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              required
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
            <button type="button" onClick={handleAddBarber}>Adicionar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
