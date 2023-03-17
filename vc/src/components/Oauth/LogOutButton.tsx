import { googleLogout } from "@react-oauth/google"
import { Button } from "@mui/material"
import React from "react"
import { logout, selectIsAuth } from "../../redux/slices/oAuth"
import { useAppDispatch } from "../../hook"
export const LogOutButton: React.FC = () => {
  const dispatch = useAppDispatch()
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // })

  return (
    <Button onClick={() => dispatch(logout())}>
    Выйти
    </Button>
  )
}
