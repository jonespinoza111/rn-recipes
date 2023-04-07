import { createSlice } from "@reduxjs/toolkit";
import { getDatabase } from "firebase/database";
import { firebaseApp } from "../../components/Navigator";

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

export const userSlice = createSlice({
    name: 'userData',
    initialState: {},
    reducers: {
        getUserData: async (state, action) => {
            const db = getDatabase(firebaseApp);
            const userData = await 
            db
            .ref(`users/${action.payload}`)
            .once("value");
            const updatedUserData = await userData.val();

            const favorites =
                updatedUserData &&
                updatedUserData.favorites === ""
                    ? Object.values(updatedUserData.favorites)
                    : [];
            return { ...updatedUserData, favorites }
        },
    }
})


export const { getUserData } = userSlice.actions;

export default userSlice.reducer;