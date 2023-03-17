import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useAppDispatch, useAppSelector } from "../../hook"
import React from "react"
import { logout, selectIsAuth } from "../../redux/slices/oAuth"
import {LogInButton} from './LogInButton'
import {LogOutButton} from './LogOutButton'

export const OauthBlock: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.oAuth.isAuth)
  return (
    <>
      {isAuth ? (
        <LogOutButton/>
      ): (
        <LogInButton/>
        )} 
 
    </>
  )
}
