// fronted/src/App.jsx consists of the main component of the React application.
// It serves as the root component that renders other components and manages the overall structure of the app.
// It sets up routing using React Router to navigate between different pages such as login, register, and home.
// It also includes a ProtectedRoute component to restrict access to certain routes based on user authentication status.

import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout(){
localStorage.removeItem("token")  // Remove the token from local storage to log out the user
return <Navigate to="/login" /> // routes us to the login page 
}

function RegisterAndLogin(){
localStorage.removeItem("token")  // Remove the token from local storage to log out the user
return <Register /> // routes us to the register page  
}

function App() {
 
  return (
    <BrowserRouter>

    <Routes>

    <Route 

      path="/" 
      element={
        <ProtectedRoute>
          <Home />                
        </ProtectedRoute>
      } 
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<RegisterAndLogin />} />
    <Route path="*" element={<NoteFound />} />

    </Routes>

    </BrowserRouter>
  )
};

export default App
