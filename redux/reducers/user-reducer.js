import { createSlice } from "@reduxjs/toolkit";
import { getDatabase } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../App";
import { firebaseApp } from "../../components/Navigator";

// export const userReducer = (state = {}, action) => {
//     switch (action.type) {
//         case GET_USER_DATA:
//             const favorites =
//                 action.updatedUserData &&
//                 action.updatedUserData.favorites === ""
//                     ? Object.values(action.updatedUserData.favorites)
//                     : [];
//             return { ...action.updatedUserData, favorites };
//         default:
//             return state;
//     }
// };


export const prepareUserData = (uid) => async dispatch => {
    const userData = await getDoc(doc(firestore, "users", uid));
    console.log("userData1 ", userData.data())
    const updatedUserData = userData.data();
    const favorites =
        updatedUserData &&
        updatedUserData.favorites === ""
            ? Object.values(updatedUserData.favorites)
            : [];
    
        console.log('favorites now ', favorites);

    let finalUpdate = { ...updatedUserData, favorites };
    dispatch(userSlice.actions.getUserData(finalUpdate));
}

const initialData = { begin: [], hello: '' }

export const userSlice = createSlice({
    name: 'userData',
    initialState: initialData,
    reducers: {
        getUserData: (state, action) => {
            console.log('action.payload', action.payload);
            return action.payload;
        },
    }
})


export const { getUserData } = userSlice.actions;

export default userSlice.reducer;