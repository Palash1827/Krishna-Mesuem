import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"

import Home from "./sections/Home"
import Explore from "./sections/Explore"
import About from "./sections/About"
import Contact from "./sections/Contact"

import FloorPage from "./pages/FloorPage"
import ArtifactPage from "./pages/ArtifactPage"
import LoginPage from "./pages/LoginPage"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){

return(
<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={
<>
<Home/>
<Explore/>
<About/>
<Contact/>
</>
}/>

<Route path="/floor/:id" element={<FloorPage/>}/>
<Route path="/artifact/:id" element={<ArtifactPage/>}/>
<Route path="/login" element={<LoginPage/>}/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard/>
    </ProtectedRoute>
  }
/>

</Routes>

</BrowserRouter>
)

}

export default App