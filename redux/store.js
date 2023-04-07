import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import filtersReducer from "./reducers/filters-reducer";
import userDataReducer from './reducers/user-reducer';


const rootReducer = combineReducers({
    filters: filtersReducer,
    userData: userDataReducer
})


export default configureStore({ reducer: rootReducer }, applyMiddleware(thunk));