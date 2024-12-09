import { toast } from "react-toastify";
import { IBarber } from "../pages/Barbers";
import { api } from "../lib/api";

interface IDeleteBarberModalProps {
  setShowDeleteBarberModal: (showDeleteBarberModal: boolean) => void;
  barbers: IBarber[];
  barberId: string;
  setMustUpdateList: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteBarberModal = ({ setShowDeleteBarberModal, barberId, barbers, setMustUpdateList }: IDeleteBarberModalProps) => {

  const userId = localStorage.getItem('userId')

  async function handleDelete() {

    const barber = barbers.find((barber) => barber.id === barberId)

    if (!barber) {
      return
    }

    try {
      
      const response = await api.delete('/delete-barber', {
        params: {
          userId,
          id: barberId
        }
      })

      if(response.status === 200) {
        toast.success('Barbeiro deletado com sucesso!')
        setShowDeleteBarberModal(false)
        setMustUpdateList(true)
        return
      }
      toast.error('Erro ao deletar barbeiro!')
    } catch (error) {
      toast.error('Erro ao deletar barbeiro!')
      console.log(error)
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowDeleteBarberModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Deletar Barbeiro
          </h2>
          <span className="close"
            onClick={() => setShowDeleteBarberModal(false)}
          >
            &times;
          </span>
        </div>

        <div className="body-modal">
          <h3>Tem certeza que deseja deletar este barbeiro?</h3>
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
