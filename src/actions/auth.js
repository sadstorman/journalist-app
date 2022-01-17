import Swal from 'sweetalert2'
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config'
import { startLoading, finishLoading } from './ui';
import { types } from "../types/types";
import { notesLogoutCleaning } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading())
                if (e.message === "Firebase: Error (auth/user-not-found).") {
                    Swal.fire('Error', 'Invalid email, try again', 'error')
                } else {
                    Swal.fire('Error', 'Wrong email/password, try again', 'error')
                }
            })

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password, name)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name })
                dispatch(login(user.uid, user.displayName))

            }).catch(e => {
                console.log(e);
                Swal.fire( 'Error', e.message, 'error')
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogOut = () => {
    return async (dispatch) => {
        const auth = getAuth()
        await signOut(auth)

        dispatch(logout)
        dispatch(notesLogoutCleaning())
    }
}

export const logout = () => {
    return {
        type: types.logout

    }
}