// import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Header } from "./components/Header/Header"
// import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Blog } from "./pages"
import { Home } from "./pages"
// import React from "react";
// import { fetchAuthMe } from "./redux/slices/auth";
// import { Profile } from "./pages/Profile/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google"

const App: React.FC = () => {
  // const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe())
  // }, [dispatch])

  return (
    <>
      <GoogleOAuthProvider clientId='803620579002-l53iirinfa71mtdjrn1nmsf8vebeo674.apps.googleusercontent.com'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />} />
            {/* <Route path="/:curentSort" element = {<Home />} /> */}
            {/* <Route path="/tag/:tagName/:curentSort" element = {<Home />} /> */}
            {/* <Route path="/fullPost/:id" element = {<FullPost />} /> */}
            {/* <Route path="/posts/:id/edit" element = {<AddPost />} /> */}
            {/* <Route path="/add-post" element = {<AddPost />} /> */}
            {/* <Route path="/login" element = {<Login />} /> */}
            {/* <Route path="/register" element = {<Registration />} /> */}
            {/* <Route path="/profile" element = {<Profile/>} /> */}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
