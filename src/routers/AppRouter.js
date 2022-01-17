import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))

            } else {
                setIsLoggedIn(false)
            }
            setTimeout(() => {
                setChecking(false)
            }, 2000);
        });
    }, [dispatch, setChecking, setIsLoggedIn])


    return (
        <Router>
            <div>
                <Switch>
                    {
                        isLoggedIn ?
                            (
                                <>
                                    < Route exact path="/" component={JournalScreen} />
                                    <Redirect to="/"/>

                                </>
                            )
                            :
                            (
                                <>
                                    <Route path="/auth" component={AuthRouter} />
                                    <Redirect to="/auth/login" />
                                </>
                            )


                    }
                </Switch>
            </div>
        </Router>
    )
}
