import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { sendPalletUpdate } from './jobSlice'


const JobGrid = () => {

  const dispatch = useDispatch()
  let ordersArray = useSelector(state => state.jobs.jobs)
  let loading = useSelector(state => state.jobs.loaded)
  const [orders, setOrders] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [updateButton, setUpdateButton] = useState(false)
  const [updatePalletCount, setUpdatePalletCount] = useState(0)
  

  useEffect( () => {
    
    setOrders(ordersArray)
    
  }, [ordersArray])

 
  const addUpdateButton = (id, value) => {
    setUpdateButton(id)
    setUpdatePalletCount(value)
  }

  const updatePallets = async (id, e, palletsAvailable) => {
    e.preventDefault()
    console.log('updatePallets', updatePalletCount)
    const info = {updatePalletCount, id, palletsAvailable}
    let res = await dispatch(sendPalletUpdate(info))
    return res
  }

  

  return (
    <div>
      <label htmlFor="showCompleted">Show Completed
        <input className='ml-2' type="checkbox" value={showCompleted} onChange={() => setShowCompleted(!showCompleted)} name="showCompleted" id="" />
      </label>
    <table className="table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Order #</th>
          <th className="border p-2">Company</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Pallets Available</th>
          <th className="border p-2">Pallets Picked</th>
        </tr>
      </thead>
      
      <tbody>
        {loading ? orders.map( order => { 
          const { id, company, address, palletsAvailable, palletsPicked, isCompleted, documentId } = order
          let completedOrders = 0
          if (!isCompleted || showCompleted) {
            return  (
              <tr key={id}>
              <td className="border p-2">{id}</td>
              <td className="border p-2">{company.name}</td>
              <td className="border p-2">{address}</td>
              <td className="border p-2">{palletsAvailable}</td>
              <td className="border p-2">
                <input id={id} onChange={(e) => addUpdateButton(id, e.target.value)} type="number" name={id} defaultValue={palletsPicked} placeholder={palletsPicked}/>
                {
                  updateButton === id ? 
                  <button onClick={(e) => updatePallets(documentId, e, palletsAvailable)}>Update</button> 
                  : null
                }
              </td>
            </tr>
        )} else {
          completedOrders++
        }

        if (orders.length === completedOrders) {
         return <tr key={order.id}><td>No current orders</td></tr>
        }
        return null
    })
    :
    <tr><td>You must login to see company orders.</td></tr>
  }
      </tbody>
    
    </table>
  </div>
  )
}
export default JobGrid