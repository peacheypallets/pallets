import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { login, logout, logoutUser, fetchUser, loadUser } from './authSlice'
import { getJobs, getJobsByID, loadJobs, removeJobs } from '../JobTable/jobSlice'


const Signup = () => {
  
  const dispatch = useDispatch()

  useEffect( () => {
    getData()
  },[])
  
  const getData = async () => {
      let jobs = []
      let user = ''
      let res = await dispatch(fetchUser())
      if (res.payload !== undefined) {
        user = res.payload.username
        dispatch(loadUser(user))
        let companyID = res.payload.company.id
        if (user === 'Peachey') {
          jobs = await dispatch(getJobs())
        } else {
          jobs = await dispatch(getJobsByID(companyID))
        }
        dispatch(loadJobs(jobs.payload.data))
      }
  }
  
  let user = useSelector((state) => state.auth.username)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')


 

  const handleLogout = async (e) => {
    e.preventDefault()
    dispatch(logout())
    dispatch(logoutUser())
    dispatch(removeJobs())
  }

  const handleLogin = async (e,identifier, password) => {
    e.preventDefault()
    console.log(identifier)
    const user = await dispatch(login({identifier, password}) )
    if (user){
      getData()
    }
    return user
  }

  const handleIdentifier = (identifier) => {
    let id = ''
    if (identifier.length > 0) {
      id = identifier.split(' ') // split on white space, so you have an array of words
                .map(word => word[0].toUpperCase() + word.slice(1)) // map each word, capitalizing the first letter
                .join(' ') // join it all back together with a space
      setIdentifier(id)
    }
  }

  return (
    <div className="flex flex-col">
      {user ? 
      <form className='flex flex-row p-4'>
        <p className='pr-4'>{user}</p>
        <button className='text-red-500 border border-red-500 ml-4 pl-2 pr-2 rounded-sm' onClick={(e) => handleLogout(e)}>Logout</button>
      </form>
      :
      <form id="loginForm" className='flex flex-row w-full p-4'>
        <input className='w-4/5' onChange={(e) => handleIdentifier(e.target.value)} type="text" placeholder="Username" />
        <input onKeyDown={(e) => e.key === 'Enter' ? handleLogin(e,identifier,password) : null} className='w-4/5' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password" />
        <button onClick={(e) => handleLogin(e,identifier,password)} type="submit">Submit</button>
      </form>
      }
    </div>
  );
}

export default Signup