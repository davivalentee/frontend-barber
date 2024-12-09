import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface IAddCustomerModalProps {
  setShowAddCustomerModal: (showAddCustomerModal: boolean) => void;
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const AddCustomerModal = ({ setShowAddCustomerModal, setMustUpdateList }: IAddCustomerModalProps) => {

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const userId = localStorage.getItem('userId')

  async function handleAddCustomer() {

    try {

      if (!name || !cpf || !email || !phone) {
        toast.warning('Preencha todos os campos!')
        return
      }

      const newCustomer = {
        name,
        cpf,
        email,
        phone
      }

      const response = await api.post('/create-customer', {
        ...newCustomer,
        userId
      })  

      if (response.status == 200) {
        toast.success('Cliente adicionado com sucesso!')
        setMustUpdateList(true)
        setShowAddCustomerModal(false)
        return
      }

      toast.error('Erro ao adicionar cliente!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao adicionar cliente!')
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowAddCustomerModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Adicionar Cliente
          </h2>
          <span className="close"
            onClick={() => setShowAddCustomerModal(false)}
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
            <input
              type="text"
              placeholder="Telefone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="button" onClick={handleAddCustomer}>Adicionar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
