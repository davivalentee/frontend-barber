import { toast } from "react-toastify";
import { ICustomer } from "../pages/Customers";
import { api } from "../lib/api";

interface IDeleteCustomerModalProps {
  setShowDeleteCustomerModal: (showDeleteCustomerModal: boolean) => void;
  customers: ICustomer[];
  customerId: string;
  setMustUpdateList: (mustUpdateList: boolean) => void;
}

export const DeleteCustomerModal = ({ setShowDeleteCustomerModal, customerId, customers, setMustUpdateList }: IDeleteCustomerModalProps) => {

  const userId = localStorage.getItem('userId')

  async function handleDelete() {

    const customer = customers.find((customer) => customer.id === customerId)

    if (!customer) {
      return
    }

    try {
      
      const response = await api.delete('/delete-customer', {
        params: {
          userId,
          id: customerId
        }
      })

      if(response.status === 200) {
        toast.success('Cliente deletado com sucesso!')
        setShowDeleteCustomerModal(false)
        setMustUpdateList(true)
        return
      }
      toast.error('Erro ao deletar cliente!')
    } catch (error) {
      toast.error('Erro ao deletar cliente!')
      console.log(error)
    }

  }

  return (
    <div id="myModal" className="modal" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowDeleteCustomerModal(false)
      }
    }}>

      <div className="modal-content">

        <div className="header-modal">
          <h2>
            Deletar Cliente
          </h2>
          <span className="close"
            onClick={() => setShowDeleteCustomerModal(false)}
          >
            &times;
          </span>
        </div>

        <div className="body-modal">
          <h3>Tem certeza que deseja deletar este cliente?</h3>
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
