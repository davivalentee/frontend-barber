import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IService } from "../pages/Services";
import { api } from "../lib/api";

interface IEditServiceModalProps {
  setShowEditServiceModal: (showEditServiceModal: boolean) => void;
  currentService: IService
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const EditServiceModal = ({ setShowEditServiceModal, currentService, setMustUpdateList }: IEditServiceModalProps) => {

  const [id, setId] = useState(currentService.id)
  const [name, setName] = useState(currentService.name)
  const [price, setPrice] = useState(currentService.price)
  const [description, setDescription] = useState(currentService.description)

  const userId = localStorage.getItem('userId')

  async function handleEdit() {

    if (name === currentService.name && description === currentService.description && price === currentService.price) {
      toast.info('Nada foi alterado!')
      return
    }

    try {

      const body: Partial<IService> = {}

      if (name !== currentService.name) {
        body.name = name
      }

      if (description !== currentService.description) {
        body.description = description
      }

      if (price !== currentService.price) {
        body.price = price
      }

      const response = await api.put('/update-service', body, {
        params: {
          id: currentService.id,
          userId
        }
      })

      if (response.status === 200) {
        toast.success('Serviço editado com sucesso!')
        setMustUpdateList(true)
        setShowEditServiceModal(false)
        return
      }

      toast.error('Erro ao editar serviço!')
    } catch (error) {
      toast.error('Erro ao editar serviço!')
      console.log(error);
    }

  }

  useEffect(() => {
    setId(currentService.id)
    setName(currentService.name)
    setPrice(currentService.price)
    setDescription(currentService.description)
  }, [currentService])

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEditServiceModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Editar Serviço
          </h2>
          <span className="close"
            onClick={() => setShowEditServiceModal(false)}
          >
            &times;
          </span>
        </div>

        <div className="body-modal">
          <form>
            <input
              type="number"
              placeholder="ID"
              required
              readOnly
              disabled
              value={id}
            />
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
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="Descrição"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="button" onClick={handleEdit}>Confirmar</button>
          </form>
        </div>


      </div>

    </div>
  )
}
