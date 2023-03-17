import { GoogleLogin, googleLogout } from "@react-oauth/google"

import React from "react"

export const OauthBlock: React.FC = () => {
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // })

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
