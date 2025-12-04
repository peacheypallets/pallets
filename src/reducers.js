import { combineSlices } from '@reduxjs/toolkit'
import { jobSlice } from './features/JobTable/jobSlice'
import { authSlice} from './features/Auth/authSlice'

const rootReducer = combineSlices(jobSlice, authSlice)


export default rootReducer