import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
    name: 'theme',
    initialState: { theme: 'light', active: false },
    reducers: {
        addpremium: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
        activatePremium: (state) => {
            state.active = true
        }
    }
})

export const themeactions = themeslice.actions;
export default themeslice.reducer