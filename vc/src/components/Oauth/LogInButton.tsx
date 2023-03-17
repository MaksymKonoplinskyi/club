import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useAppDispatch, useAppSelector } from "../../hook"
import React from "react"
import { login } from "../../redux/slices/oAuth"
import Button from "@mui/material/Button"
export const LogInButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const google = () => {
    window.open("http://localhost:4444/auth/google", "_self")
  }

  return (
    <div>
      <Button onClick={() => dispatch(google)}>Войти</Button>

      {/* <GoogleLogin
        onSuccess={credentialResponse => {

          console.log(credentialResponse)
          dispatch(login(credentialResponse))
        }}
        onError={() => {
          console.log("Login Failed")
        }}
        // useOneTap
      /> */}
    </div>
  )
}
