import { googleLogout } from "@react-oauth/google"
import { Button } from "@mui/material"
import React from "react"

export const LogOutButton: React.FC = () => {
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // })

  return <Button onClick={googleLogout} title='LogOut'></Button>
}
