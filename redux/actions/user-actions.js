import * as firebase from "firebase";
export const GET_USER_DATA = "GET_USER_DATA";

export const getUserData = (uid) => {
    console.log("getuserdata uid", uid);
    return async (dispatch) => {
        const userData = await firebase
            .database()
            .ref(`users/${uid}`)
            .once("value");
        const updatedUserData = await userData.val();
        dispatch({ type: GET_USER_DATA, updatedUserData });
    };
};
