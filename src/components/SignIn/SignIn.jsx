import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from '../utils/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()



  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignIn = async (e) => {

  e.preventDefault()
  setError('')

    const response = await login({ email, password });


    if (response?.status === 401) {
      setError(response?.response?.data?.error)
  } else if (response?.status === 200) {
      navigate('/')
  } else {
      setError('Something went wrong. Please try again.');
  }

  }
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>

            {error && (
              <div className="bg-washed-red dark-red pa2 br2 mb3 tc">
                {error}
              </div>
            )}

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
          <div className="tc">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <Link to="/register">
          <div className="lh-copy mt3 tc">
            <p  className="f6 link dim black db pointer">
              Register
            </p>
          </div>
          </Link>
        </div>
      </main>
    </article>
  )
}
