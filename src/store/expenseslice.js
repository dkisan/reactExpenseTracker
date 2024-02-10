import { createSlice } from "@reduxjs/toolkit";
import themeslice from "./themeslice";

const expenseslice = createSlice({
    name: 'expense',
    initialState: { expenses: [], totalamount: 0 },
    reducers: {
        addExpense: (state, action) => {
            let amount = 0
            for (let i = 0; i < action.payload.length; i++) {
                amount += +action.payload[i].amount
            }
            state.expenses = action.payload
            state.totalamount = amount
        }
    }
})

export const expenseactions = expenseslice.actions;
export default expenseslice.reducer