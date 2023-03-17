import { GoogleLogin, googleLogout } from "@react-oauth/google"

import React from "react"

export const LogInButton: React.FC = () => {

  return (
    <div>

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse)
        }}
        onError={() => {
          console.log("Login Failed")
        }}
        useOneTap
      />
    </div>
  )
}
