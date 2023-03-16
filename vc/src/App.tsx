// import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

// import { Header } from "./components";
// import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Home } from "./pages"
// import React from "react";
// import { fetchAuthMe } from "./redux/slices/auth";
// import { Profile } from "./pages/Profile/Profile";

const App: React.FC = () => {
  // const dispatch = useDispatch()
  console.log(import.meta.env)
  console.log(REACT_APP_API_URL)
  console.log(VITE_REACT_APP_API_URL)

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe())
  // }, [dispatch])

  return (
    <>
      <div>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
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
      </div>
    </>
  )
}

export default App
