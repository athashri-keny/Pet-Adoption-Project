import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userdata: null
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login:(state , action) => {
            state.status = true
            state.userdata = action.payload.userdata
        },
        logout: (state ) =>{
            state.state = false
            state.userdata = null
        }
    }
})


export const {login , logout} = authSlice.actions

export default authSlice.reducer