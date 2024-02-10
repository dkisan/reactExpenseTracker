import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
    name: 'theme',
    initialState: { theme: 'Light', active: false },
    reducers: {
        addpremium: (state,action) => {
            state.theme = action.payload
        },
        activatePremium: (state) => {
            state.active = true
        },
        deactivatePremium: (state) => {
            state.active = false
        }
    }
})

export const themeactions = themeslice.actions;
export default themeslice.reducer