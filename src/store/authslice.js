import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    name: 'auth',
    initialState: {
        idToken: localStorage.getItem('ExpenseUToken') ? localStorage.getItem('ExpenseUToken') : '',
        email: localStorage.getItem('ExpenseUEmail') ? localStorage.getItem('ExpenseUEmail') : '',
        isLogin: localStorage.getItem('ExpenseUToken') ? true : false
    },
    reducers: {
        setUserdata: (state, action) => {
            state.idToken = action.payload.idToken
            state.email = action.payload.email
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = false
        }
    }
})

export const authactions = authslice.actions;
export default authslice.reducer