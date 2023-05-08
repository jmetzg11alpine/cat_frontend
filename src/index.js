import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import App from "./App"
import Data from "./Data"
import Model from "./Model"
import NavBar from "./NavBar"

// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/data", element: <Data /> },
//   { path: "/model", element: <Model /> },
// ])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/data' element={<Data />} />
        <Route path='/model' element={<Model />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
