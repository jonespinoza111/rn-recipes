import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../helpers/Firebase";
import { getFavorites } from "../../helpers/DatabaseFunctions";

export const prepareUserData = (uid) => async dispatch => {
    const userData = await getDoc(doc(firestore, "users", uid));
    console.log("userData1 ", userData.data())
    const updatedUserData = userData.data();

    const favorites = await getFavorites(uid);
    
        console.log('favorites now ', favorites);

    let finalUpdate = { ...updatedUserData, favorites };
    dispatch(userSlice.actions.getUserData(finalUpdate));
}

export const userSlice = createSlice({
    name: 'userData',
    initialState: {},
    reducers: {
        getUserData: (state, action) => {
            console.log('action.payload', action.payload);
            return action.payload;
        },
    }
})


export const { getUserData } = userSlice.actions;

export default userSlice.reducer;