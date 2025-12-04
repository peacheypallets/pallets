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
    const user = await dispatch(login({identifier, password}) )
    if (user){
      getData()
    }
    return user
  }



  return (
    <div className="">
      {user ? 
      <form className='flex flex-row'>
        <p className='pr-4'>{user}</p>
        <button className='ml-4' onClick={(e) => handleLogout(e)}>Logout</button>
      </form>
      :
      <form id="loginForm">
        <input onChange={(e) => setIdentifier(e.target.value)} type="text" placeholder="Username" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password" />
        <button onClick={(e) => handleLogin(e,identifier,password)} type="submit">Submit</button>
      </form>
      }
    </div>
  );
}

export default Signup