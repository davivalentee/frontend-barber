import { toast } from "react-toastify";
import { IService } from "../pages/Services";
import { api } from "../lib/api";

interface IDeleteServiceModalProps {
  setShowDeleteServiceModal: (showDeleteServiceModal: boolean) => void;
  services: IService[];
  serviceId: number;
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const DeleteServiceModal = ({ setShowDeleteServiceModal, serviceId, services, setMustUpdateList }: IDeleteServiceModalProps) => {

  const userId = localStorage.getItem('userId')

  async function handleDelete() {

    const service = services.find((service) => service.id === serviceId)

    if (!service) {
      return
    }

    try {
      
      const response = await api.delete('/delete-service', {
        params: {
          userId,
          id: serviceId
        }
      })

      if(response.status === 200) {
        toast.success('Serviço deletado com sucesso!')
        setShowDeleteServiceModal(false)
        setMustUpdateList(true)
        return
      }
      toast.error('Erro ao deletar serviço!')
    } catch (error) {
      toast.error('Erro ao deletar serviço!')
      console.log(error)
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowDeleteServiceModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Deletar Serviço
          </h2>
          <span className="close"
            onClick={() => setShowDeleteServiceModal(false)}
          >
            &times;
          </span>
        </div>

        <div className="body-modal">
          <h3>Tem certeza que deseja deletar este serviço?</h3>
          <button type="button"
          onClick={handleDelete}
          style={{
            backgroundColor: 'red',
            color: 'white'  
          }}
          >Deletar</button>
        </div>


      </div>

    </div>
  )
}
