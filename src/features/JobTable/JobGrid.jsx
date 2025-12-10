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
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  },[showAlert])

  useEffect( () => {
    setOrders(ordersArray)
  }, [ordersArray])

  const addUpdateButton = (id, value) => {
    setUpdateButton(id)
    setUpdatePalletCount(value)
  }


  const updatePallets = async (id, e, palletsAvailable) => {
    e.preventDefault()
    const info = {updatePalletCount, id, palletsAvailable}
    setShowAlert(true)
    let res = await dispatch(sendPalletUpdate(info))
    return res
  }

  

  return (
    <div className='flex flex-col justify-center items-center lg:w-auto'>
      {
        showAlert ? <div className='bg-red-200 rounded-lg text-xl w-full text-center'>Update Sent</div> : null
      }
      <label className='flex self-end' htmlFor="showCompleted">Show Completed
        <input className='ml-2' type="checkbox" value={showCompleted} onChange={() => setShowCompleted(!showCompleted)} name="showCompleted" id="" />
      </label>
    <table className="table-auto border-collapse justify-center items-center self-center">
      <thead>
        <tr>
          <th className="border p-2">Order</th>
          <th className="border p-2">Address</th>
          <th className="border p-2"><span className='invisible lg:visible'>Pallets</span> Available</th>
          <th className="border p-2"><span className='invisible lg:visible'>Pallets</span> Picked</th>
        </tr>
      </thead>
      
      <tbody className=''>
        {loading ? 
          orders ? 
            orders.map( order => { 
            const { id, address, palletsAvailable, palletsPicked, isCompleted, documentId } = order
            let completedOrders = 0
            if (!isCompleted || showCompleted) {
              return  (
                <tr key={id}>
                <td className="border p-2">{id}</td>
                <td className="border p-2">{address}</td>
                <td className="border p-2">{palletsAvailable}</td>
                <td className="border p-2">
                  <input className='w-1/2' id={id} onChange={(e) => addUpdateButton(id, e.target.value)} type="number" name={id} defaultValue={palletsPicked} placeholder={palletsPicked}/>
                  {
                    updateButton === id ? 
                    <button className='text-green-600 border border-green-600 rounded-sm pl-2 pr-2 ml-2' onClick={(e) => updatePallets(documentId, e, palletsAvailable)}>Update</button> 
                    :
                    null
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
    }) : <tr><td>Loading Orders</td></tr>
    :
    <tr><td>You must login to see company orders.</td></tr>
  }
      </tbody>
    
    </table>
  </div>
  )
}
export default JobGrid