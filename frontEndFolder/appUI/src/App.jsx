import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./Pages/Header"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
