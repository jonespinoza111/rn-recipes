import { getDatabase, ref, set } from 'firebase/database';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef } from 'firebase/storage';
import { app, db, firestore, storage } from '../helpers/Firebase';

import { getUserData } from '../redux/reducers/user-reducer';

export const createDatabaseUser = async (uid, data, dispatch) => {
    try {
        // const storage = getStorage(app);
        // const defaultProfileImage = ref(storage, "images/no-profile.jpg");

        console.log("default profile img 1, ", data);
        console.log("default profile img 2, ", uid);

        const docRef = await setDoc(doc(firestore, 'users', uid), {
            name: data.name,
            description: "Food Novice",
            email: data.email,
            favorites: "",
            profileImage: data.profileImage || "",
        })

        console.log('db write ', docRef);
        // dispatch(getUserData(uid));
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
                    app.auth.GoogleAuthProvider.PROVIDER_ID &&
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
    console.log('mate amte amate');
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = app
        .auth()
        .onAuthStateChanged((firebaseUser) => {
            console.log('firebase firebase ', firebaseUser);
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = app.auth.GoogleAuthProvider.credential(
                    idToken
                );
                // Sign in with credential from the Google user.
                const userData = {
                    name: googleUser.name,
                    email: googleUser.email,
                    profileImage: googleUser.photoUrl || null   
                }

                app
                    .auth()
                    .signInWithCredential(credential)
                    .then((cred) => {
                        console.log('cred.user.uid ', cred.user.uid)
                        createDatabaseUser(cred.user.uid, userData, dispatch)
                    })
                    .catch((err) =>
                        console.log("There was an error signing in", err)
                    );
                    
                
            } else {
                console.log("User already signed-in Firebase.");
            }
        });
};