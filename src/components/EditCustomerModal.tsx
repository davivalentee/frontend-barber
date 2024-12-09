import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICustomer } from "../pages/Customers";
import { api } from "../lib/api";

interface IEditCustomerModalProps {
  setShowEditCustomerModal: (showEditCustomerModal: boolean) => void;
  currentCustomer: ICustomer
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const EditCustomerModal = ({ setShowEditCustomerModal, currentCustomer, setMustUpdateList }: IEditCustomerModalProps) => {

  const [name, setName] = useState(currentCustomer.name)
  const [cpf, setCpf] = useState(currentCustomer.cpf)
  const [email, setEmail] = useState(currentCustomer.email)
  const [phone, setPhone] = useState(currentCustomer.phone)

  const userId = localStorage.getItem('userId')

  async function handleEdit() {

    if (name === currentCustomer.name && cpf === currentCustomer.cpf && email === currentCustomer.email && phone === currentCustomer.phone) {
      toast.info('Nada foi alterado!')
      return
    }

    try {

      const body: Partial<ICustomer> = {}

      if (name !== currentCustomer.name) {
        body.name = name
      }

      if (cpf !== currentCustomer.cpf) {
        body.cpf = cpf
      }

      if (email !== currentCustomer.email) {
        body.email = email
      }

      if (phone !== currentCustomer.phone) {
        body.phone = phone
      }

      const response = await api.put('/update-customer', body, {
        params: {
          id: currentCustomer.id,
          userId
        }
      })

      if (response.status === 200) {
        toast.success('Cliente editado com sucesso!')
        setMustUpdateList(true)
        setShowEditCustomerModal(false)
        return
      }

      toast.error('Erro ao editar cliente!')
    } catch (error) {
      toast.error('Erro ao editar cliente!')
      console.log(error);
    }

  }

  useEffect(() => {
    setName(currentCustomer.name)
    setCpf(currentCustomer.cpf)
    setEmail(currentCustomer.email)
    setPhone(currentCustomer.phone)
  }, [currentCustomer])

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEditCustomerModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Editar Cliente
          </h2>
          <span className="close"
            onClick={() => setShowEditCustomerModal(false)}
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
            <button type="button" onClick={handleEdit}>Confirmar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
