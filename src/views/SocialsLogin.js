import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { firebaseApp } from '../config/firebase'
import { loginUser } from '../api/auth-api'

export default function SocialLogins({ setError }) {
// TODO: check this file
  const googleClientId = 'your-google-client-id-here'

  const handleGoogleLoginSuccess = async (googleUser) => {
    try {
      const { id_token } = googleUser.getAuthResponse()
      const response = await loginUser({ idToken: id_token })
      if (response.error) {
        setError(response.error)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleLoginFailure = (error) => {
    setError(error.details)
  }

  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Sign in with Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
      render={(renderProps) => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          Sign in with Google
        </button>
      )}
    />
  )
}
