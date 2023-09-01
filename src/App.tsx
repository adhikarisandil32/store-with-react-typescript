//https://react-typescript-cheatsheet.netlify.app/docs/basic/setup for react typescript reference
//tsconfig.ts file to disable eslint

import { Route, Routes, Navigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import Home from "./pages/Home"
import About from "./pages/About"
import Store from "./pages/Store"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
