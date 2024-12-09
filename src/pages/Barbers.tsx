import { useCallback, useEffect, useState } from 'react'
import '../style/barber.css'
import { AddBarberModal } from '../components/AddBarberModal'
import { SquarePen, Trash2 } from 'lucide-react'
import { EditBarberModal } from '../components/EditBarberModal'
import { DeleteBarberModal } from '../components/DeleteBarberModal'
import { api } from '../lib/api'

export interface IBarber {
  id: string;
  name: string;
  cpf: string;
  email: string;
  shift: string;
}

export const Barbers = () => {

  const [barbers, setBarbers] = useState<IBarber[]>([])
  const [search, setSearch] = useState('')
  const [currentBarber, setCurrentBarber] = useState<IBarber | null>(null)
  const [showAddBarberModal, setShowAddBarberModal] = useState(false)
  const [showEditBarberModal, setShowEditBarberModal] = useState(false)
  const [showDeleteBarberModal, setShowDeleteBarberModal] = useState(false)
  const [mustUpdateList, setMustUpdateList] = useState(false)

  const userId = localStorage.getItem('userId')

  const getBarbers = useCallback(async () => {
    try {
      const response = await api.get('/get-barbers-by-user', {
        params: {
          userId: userId
        }
      })

      const barbers: IBarber[] = response.data

      setBarbers(barbers)

    } catch (error) {
      console.log(error)
    }
  }, [userId])

  useEffect(() => {
    getBarbers()
  }, [getBarbers, userId])

  useEffect(() => {
    if (mustUpdateList) {
      getBarbers()
      setMustUpdateList(false)
    }
  }, [mustUpdateList, getBarbers])

  const filteredBarbers = barbers.filter(barber => barber.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='app-container'>
      <div className="page-container">
    
        <h1>
          Barbeiros
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
                onClick={() => setShowAddBarberModal(true)}
              >Adicionar Barbeiro</button>
            </div>

          </div>



          <table className="styled-table">
            <thead>
              <tr>
                <th>Nome do Barbeiro</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Turno</th>
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
                filteredBarbers.map(barber => (
                  <tr>
                    <td>{barber.name}</td>
                    <td>{barber.cpf}</td>
                    <td>{barber.email}</td>
                    <td>{barber.shift}</td>
                    <td>
                      <SquarePen size={24} color='#f59e0b' cursor='pointer' onClick={() => {
                        setCurrentBarber(barber)
                        setShowEditBarberModal(true)
                      }} />
                    </td>
                    <td>
                      <Trash2 size={24} color='#dc2626' cursor='pointer' onClick={() => {
                        setCurrentBarber(barber)
                        setShowDeleteBarberModal(true)
                      }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        {
          showAddBarberModal && (
            <AddBarberModal
              setShowAddBarberModal={setShowAddBarberModal}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showEditBarberModal && (
            <EditBarberModal
              setShowEditBarberModal={setShowEditBarberModal}
              currentBarber={currentBarber!}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

        {
          showDeleteBarberModal && (
            <DeleteBarberModal
              setShowDeleteBarberModal={setShowDeleteBarberModal}
              barbers={barbers}
              barberId={currentBarber!.id}
              setMustUpdateList={setMustUpdateList}
            />
          )
        }

      </div>
    </div>
  )
}
