import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'



export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setName] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()

  const navigate = useNavigate()

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onSubmitRegister = async () => {

    setError("");

    const response = await register({ email, password, username });



    if (response?.status === 400) {
        let errorMessage =
          response?.response?.data?.username?.[0] ||
          response?.response?.data?.email?.[0] ||
          response?.response?.data?.password?.[0] ||
          "Registration failed";
      console.log('error', response?.response)
        setError(errorMessage);

    } else if (response?.status === 201) { 
        navigate("/signin");

    } else {
        setError("An unexpected error occurred");
    }


  };
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0"> Register</legend>

            {/* Username field */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="username"
                id="username"
                required
                onChange={onNameChange}
              />
            </div>

            {/* Email field */}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                required
                onChange={onEmailChange}
              />
            </div>

            {/* Password field */}
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                required
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>

          {/* Error message */}
          {error && (
            <div className="red f6 mb3 tc">
              {error}
            </div>
          )}

          {/* Register button */}
          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={onSubmitRegister}
            />
          </div>

          {/* Signin link */}

          <Link to="/signin">
            <div className="lh-copy mt3 tc">

              <p className="f6 link dim black db pointer">SignIn</p>


            </div>
          </Link>
        </div>
      </main>
    </article>
  )
}
