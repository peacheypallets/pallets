import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { localIP as IP } from '../../config/config'
import axios from 'axios'


const initialState = {
  username: '',
}


export const login = createAsyncThunk('auth/saveUsers', async ({identifier, password}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({identifier, password});
  const res = await axios.post(`${IP}/auth/local`, body, config)
  localStorage.setItem('token', res.data.jwt)
  return res.data  
})

export const logout = createAsyncThunk('auth/logoutUser', async () => {
  let blank = ''
  localStorage.removeItem('token', blank)
  return blank
})

export const fetchUser = createAsyncThunk('auth/loadUser', async () => {
  const config = {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  }

  const res = await axios.get(`${IP}/users/me?populate=*`, config)
  return res.data
  
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUsers : (state, action) => {
      state.username = action.payload.user.username
    },
    loadUser : (state, action) => {
      state.username = action.payload
    },
    logoutUser : (state, action) => {
      state.username = ''
    },
    fetchUser : (state, action) => {
      console.log(action)
      state.username = action.payload.username
    }
  }
})


export const { loadUser, saveUsers, logoutUser } = authSlice.actions
export default authSlice.reducer

