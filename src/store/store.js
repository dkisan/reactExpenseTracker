import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import expenseslice from "./expenseslice";

const store = configureStore({
    reducer:{
        auth:authslice,
        expense:expenseslice
    }
})

export default store;