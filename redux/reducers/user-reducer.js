import { createSlice } from "@reduxjs/toolkit";
import { GET_USER_DATA } from "../actions/user-actions";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            const favorites =
                action.updatedUserData &&
                action.updatedUserData.favorites === ""
                    ? Object.values(action.updatedUserData.favorites)
                    : [];
            return { ...action.updatedUserData, favorites };
        default:
            return state;
    }
};

export const userSlicer = createSlice({
    name: 'userData',
    initialState: {},
    reducers: {
        getUserData: () => {},
    }
})