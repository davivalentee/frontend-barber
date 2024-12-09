import { useCallback, useEffect, useState } from 'react'
import '../style/barber.css'
import { SquarePen, Trash2 } from 'lucide-react'
import { AddServiceModal } from '../components/AddServiceModal'
import { EditServiceModal } from '../components/EditServiceModal'
import { DeleteServiceModal } from '../components/DeleteServiceModal'
import { api } from '../lib/api'

export interface IService {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const Services = () => {

  const [services, setServices] = useState<IService[]>([])
  const [search, setSearch] = useState('')
  const [currentService, setCurrentService] = useState<IService | null>(null)
  const [showAddServiceModal, setShowAddServiceModal] = useState(false)
  const [showEditServiceModal, setShowEditServiceModal] = useState(false)
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false)
  const [mustUpdateList, setMustUpdateList] = useState(false)

  const filteredServices = services.filter(service => service.name.toLowerCase().includes(search.toLowerCase()))

  const userId = localStorage.getItem('userId')

  const getServices = useCallback(async () => {
    try {
      const response = await api.get('/get-services-by-user', {
        params: {
          userId: userId
        }
      })

      const services: IService[] = response.data

      setServices(services)

    } catch (error) {
      console.log(error)
    }
  }, [userId])

  useEffect(() => {
    getServices()
  }, [getServices, userId])

  useEffect(() => {
    if (mustUpdateList) {
      getServices()
      setMustUpdateList(false)
    }
  }, [getServices, mustUpdateList])

  return (
    <div className='app-container'>
      <div className="page-container">

        <h1>
          Serviços
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
                onClick={() => setShowAddServiceModal(true)}
              >Adicionar Serviço</button>
            </div>

          </div>



          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Serviço</th>
                <th>Preço</th>
                <th>Descrição</th>
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
                filteredServices.map(service => (
                  <tr>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                    <td>{service.description}</td>
                    <td>
                      <SquarePen size={24} color='#f59e0b' cursor='pointer' onClick={() => {
                        setCurrentService(service)
                        setShowEditServiceModal(true)
                      }} />
                    </td>
                    <td>
                      <Trash2 size={24} color='#dc2626' cursor='pointer' onClick={() => {
                        setCurrentService(service)
                        setShowDeleteServiceModal(true)
                      }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        {
          showAddServiceModal && (
            <AddServiceModal
              setShowAddServiceModal={setShowAddServiceModal}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showEditServiceModal && (
            <EditServiceModal
              setShowEditServiceModal={setShowEditServiceModal}
              currentService={currentService!}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showDeleteServiceModal && (
            <DeleteServiceModal
              setShowDeleteServiceModal={setShowDeleteServiceModal}
              services={services}
              serviceId={currentService!.id}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

      </div>
    </div>
  )
}
