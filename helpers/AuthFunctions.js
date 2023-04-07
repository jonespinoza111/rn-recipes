import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { firebaseApp } from '../components/Navigator';

import { getUserData } from '../redux/reducers/user-reducer';

export const createDatabaseUser = async (uid, data, dispatch) => {
    try {
        const storage = getStorage(firebaseApp);
        const defaultProfileImage = 
            await storage
                .ref("images/no-profile.jpg")
                .getDownloadURL()

        const db = getDatabase(firebaseApp);
        await 
            db
            .ref(`users/${uid}`)
            .set({
                name: data.name,
                description: "Food Novice",
                email: data.email,
                favorites: "",
                profileImage: data.profileImage || defaultProfileImage || "",
            });

        dispatch(getUserData(uid));
    } catch (err) {
        console.log('Could not create user in database', err);
    }
};


export const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
};

export const onSignIn = (googleUser, idToken, dispatch) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase
        .auth()
        .onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken
                );
                // Sign in with credential from the Google user.
                const userData = {
                    name: googleUser.name,
                    email: googleUser.email,
                    profileImage: googleUser.photoUrl || null   
                }

                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then((cred) => createDatabaseUser(cred.user.uid, userData, dispatch))
                    .catch((err) =>
                        console.log("There was an error signing in", err)
                    );
                    
                
            } else {
                console.log("User already signed-in Firebase.");
            }
        });
};