import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { localIP as IP } from '../../config/config'
import axios from 'axios'


const initialState = {
  jobs: [],
  loaded: false
}

export const getJobs = createAsyncThunk('jobs/fetchJobs', async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };

  const res = await axios.get(`${IP}/orders?populate=company`, config)
  return res.data
})

export const getJobsByID = createAsyncThunk('jobs/fetchJobsByID', async (ID) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };

  const res = await axios.get(`${IP}/orders?populate=*&filters[company][id][$eq]=${ID}`, config)

  return res.data
})

export const loadOrders = createAsyncThunk('jobs/loadJobs', async (jobs) => {
  console.log('load jobs')
  return jobs
})

export const sendPalletUpdate = createAsyncThunk('jobs/updatePalletByID', async (info) => {

  const {updatePalletCount, id, palletsAvailable} = info
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };

  const body = {
    "data": 
    {"palletsPicked" : updatePalletCount,
      "isCompleted" : updatePalletCount >= palletsAvailable ? true : false
     }
  }

  const res = await axios.put(`${IP}/orders/${id}`, body, config)

  return res
})

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    loadJobs: (state, action) => {
      state.jobs = action.payload
      state.loaded = true
    },
    removeJobs: (state) => {
      state.jobs = []
      state.loaded = false
    }
  }
})


export const { loadJobs, removeJobs } = jobSlice.actions
export default jobSlice.reducer