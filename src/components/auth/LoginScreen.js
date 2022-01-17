import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const loading = useSelector(state => state.ui.loading)
    const dispatch = useDispatch()

    const handleGoogleLogin = () => {
        dispatch ( startGoogleLogin())
    }

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123456'
    })

    const { email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword( email, password))
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="none"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social network</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    className="link"
                    to="/auth/register"
                >
                    Create new account
                </Link>
            </form>
        </div>
    )
}
