import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface IAddServiceModalProps {
  setShowAddServiceModal: (showAddServiceModal: boolean) => void;
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const AddServiceModal = ({ setShowAddServiceModal, setMustUpdateList }: IAddServiceModalProps) => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState('')

  const userId = localStorage.getItem('userId')

  async function handleAddService() {

    try {

      if (!name || !price || !description) {
        toast.warning('Preencha todos os campos!')
        return
      }

      const newService = {
        name,
        price,
        description,
      }

      const response = await api.post('/create-service', {
        ...newService,
        userId
      })  

      if (response.status == 200) {
        toast.success('Serviço adicionado com sucesso!')
        setMustUpdateList(true)
        setShowAddServiceModal(false)
        return
      }

      toast.error('Erro ao adicionar serviço!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao adicionar serviço!')
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowAddServiceModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Adicionar Serviço
          </h2>
          <span className="close"
            onClick={() => setShowAddServiceModal(false)}
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
              type="number"
              placeholder="Preço"
              required
              value={price === 0 ? '' : price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="Descrição"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="button" onClick={handleAddService}>Adicionar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
