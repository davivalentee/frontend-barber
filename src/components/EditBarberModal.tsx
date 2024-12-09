import { useEffect, useState } from "react";
import { IBarber } from "../pages/Barbers";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface IEditBarberModalProps {
  setShowEditBarberModal: (showEditBarberModal: boolean) => void;
  currentBarber: IBarber
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const EditBarberModal = ({ setShowEditBarberModal, currentBarber, setMustUpdateList }: IEditBarberModalProps) => {

  const [name, setName] = useState(currentBarber.name)
  const [cpf, setCpf] = useState(currentBarber.cpf)
  const [email, setEmail] = useState(currentBarber.email)
  const [shift, setShift] = useState(currentBarber.shift)

  const userId = localStorage.getItem('userId')

  async function handleEdit() {

    if(name === currentBarber.name && cpf === currentBarber.cpf && email === currentBarber.email && shift === currentBarber.shift) {
      toast.info('Nada foi alterado!')
      return
    }
    
    try {
      
      const body: Partial<IBarber> = {}

      if(name !== currentBarber.name) {
        body.name = name
      }

      if(cpf !== currentBarber.cpf) {
        body.cpf = cpf
      }

      if(email !== currentBarber.email) {
        body.email = email
      }

      if(shift !== currentBarber.shift) {
        body.shift = shift
      }

      const response = await api.put('/update-barber', body, {
        params: {
          id: currentBarber.id,
          userId
        }
      })

      if(response.status === 200) {
        toast.success('Barbeiro editado com sucesso!')
        setMustUpdateList(true)
        setShowEditBarberModal(false)
        return
      }

      toast.error('Erro ao editar barbeiro!')
    } catch (error) {
      toast.error('Erro ao editar barbeiro!')
      console.log(error);
    }

  }

  useEffect(() => {
    setName(currentBarber.name)
    setCpf(currentBarber.cpf)
    setEmail(currentBarber.email)
    setShift(currentBarber.shift)
  }, [currentBarber])

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEditBarberModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Editar Barbeiro
          </h2>
          <span className="close"
            onClick={() => setShowEditBarberModal(false)}
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
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
            <button type="button" onClick={handleEdit}>Confirmar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
