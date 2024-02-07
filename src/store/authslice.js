import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    name: 'auth',
    initialState: {
        idToken: localStorage.getItem('ExpenseUToken') ? localStorage.getItem('ExpenseUToken') : '',
        isLogin: localStorage.getItem('ExpenseUToken') ? true : false
    },
    reducers: {
        setUserdata: (state, action) => {
            state.idToken = action.payload
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = false
        }
    }
})

export const authactions = authslice.actions;
export default authslice.reducer