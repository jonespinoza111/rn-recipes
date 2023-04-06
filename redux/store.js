import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import filtersReducer from "./reducers/filters-reducer";


const rootReducer = combineReducers({
    filters: filtersReducer
})


export default configureStore({ reducer: rootReducer }, applyMiddleware(thunk));