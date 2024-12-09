import { useCallback, useEffect, useState } from 'react'
import { SquarePen, Trash2 } from 'lucide-react'
import { AddCustomerModal } from '../components/AddCustomerModal'
import { EditCustomerModal } from '../components/EditCustomerModal'
import { DeleteCustomerModal } from '../components/DeleteCustomerModal'
import { api } from '../lib/api'

export interface ICustomer {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

export const Customers = () => {

  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [search, setSearch] = useState('')
  const [currentCustomer, setCurrentCustomer] = useState<ICustomer | null>(null)
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false)
  const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState(false)
  const [mustUpdateList, setMustUpdateList] = useState(false)

  const userId = localStorage.getItem('userId')

  const getCustomers = useCallback(async () => {
    try {
      const response = await api.get('/get-customers-by-user', {
        params: {
          userId: userId
        }
      })

      const customers: ICustomer[] = response.data

      setCustomers(customers)

    } catch (error) {
      console.log(error)
    }
  }, [userId])

  useEffect(() => {
    getCustomers()
  }, [getCustomers, userId])

  useEffect(() => {
    if (mustUpdateList) {
      getCustomers()
      setMustUpdateList(false)
    }
  }, [mustUpdateList, getCustomers])

  const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='app-container'>
      <div className="page-container">

        <h1>
          Clientes
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '800px',
          padding: '1rem'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%'
          }}>

            <div className="search-bar">
              <input type="text" placeholder="Pesquisar por nome"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={() => setShowAddCustomerModal(true)}
              >Adicionar Cliente</button>
            </div>

          </div>



          <table className="styled-table">
            <thead>
              <tr>
                <th>Nome do Cliente</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th
                  colSpan={2}
                  style={{
                    textAlign: 'center'
                  }}
                >Editar</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredCustomers.map(customer => (
                  <tr>
                    <td>{customer.name}</td>
                    <td>{customer.cpf}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <SquarePen size={24} color='#f59e0b' cursor='pointer' onClick={() => {
                        setCurrentCustomer(customer)
                        setShowEditCustomerModal(true)
                      }} />
                    </td>
                    <td>
                      <Trash2 size={24} color='#dc2626' cursor='pointer' onClick={() => {
                        setCurrentCustomer(customer)
                        setShowDeleteCustomerModal(true)
                      }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        {
          showAddCustomerModal && (
            <AddCustomerModal
              setShowAddCustomerModal={setShowAddCustomerModal}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showEditCustomerModal && (
            <EditCustomerModal
              setShowEditCustomerModal={setShowEditCustomerModal}
              currentCustomer={currentCustomer!}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showDeleteCustomerModal && (
            <DeleteCustomerModal
              setShowDeleteCustomerModal={setShowDeleteCustomerModal}
              customers={customers}
              customerId={currentCustomer!.id}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

      </div>
    </div>
  )
}
