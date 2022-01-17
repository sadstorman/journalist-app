import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'
import Swal from 'sweetalert2'

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    // const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()

        if (isFormValid()) {
            dispatch( startRegisterWithEmailPasswordName( email, password, name))
        }

    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('name required'))
            Swal.fire('error', 'Name required', 'error')
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('email is required'))
            Swal.fire('error', 'Email is required', 'error')
        } else if (password !== password2 || password.length <= 6) {
            dispatch(setError("Password should match and have more than 6 characters"))
            Swal.fire('error', 'Password should match and have more than 6 characters', 'error')
            return false
        }
        dispatch(removeError())
        return true
    }

    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'
            >

                {/* {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)
                } */}

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    autoComplete="none"
                    className="auth__input"
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    autoComplete="none"
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"

                >
                    Register
                </button>


                <Link
                    className="link"
                    to="/auth/login"
                >
                    Already registered? Log in
                </Link>
            </form>
        </div>
    )
}
