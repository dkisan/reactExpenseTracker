import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import expenseslice from "./expenseslice";
import themeslice from "./themeslice";

const store = configureStore({
    reducer:{
        auth:authslice,
        expense:expenseslice,
        theme:themeslice
    }
})

export default store;