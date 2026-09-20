import "../styles/Navbar.css"
import { useLocation, useNavigate } from "react-router-dom"

function Navbar(){

const location = useLocation()
const navigate = useNavigate()

if(
location.pathname.startsWith("/floor/") ||
location.pathname.startsWith("/artifact/") ||
location.pathname === "/login" ||
location.pathname === "/admin"
){
return null
}

const scroll=(id)=>{
const section = document.getElementById(id)
if(section){
section.scrollIntoView({behavior:"smooth"})
}
}

return(

<nav className="navbar">

<div className="logo">
  <h1>श्रीकृष्ण संग्रहालय</h1>
  <span>SRIKRISHNA MUSEUM</span>
</div>

<div className="nav-right">
  <ul>
    <li onClick={()=>scroll("home")}>Home</li>
    <li onClick={()=>scroll("explore")}>Explore</li>
    <li onClick={()=>scroll("about")}>About</li>
    <li onClick={()=>scroll("contact")}>Contact</li>
  </ul>

  <button className="admin-login-btn" onClick={() => navigate("/login")}>
    Admin Login
  </button>
</div>

</nav>

)

}

export default Navbar