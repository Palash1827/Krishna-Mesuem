import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/LoginPage.css"
import adminAuth from "../data/adminAuth"

function LoginPage() {

const navigate = useNavigate()

const [formData, setFormData] = useState({
email:"",
password:""
})

const [error, setError] = useState("")

const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
})
}

const handleSubmit=(e)=>{
e.preventDefault()

if(
formData.email === adminAuth.email &&
formData.password === adminAuth.password
){
localStorage.setItem("isAdminLoggedIn","true")
navigate("/admin")
}else{
setError("Invalid email or password")
}
}

return(

<section className="login-page">

<div className="login-box">

<button className="login-close" onClick={()=>navigate("/")}>
✕
</button>

<span className="login-tag">Admin Access</span>

<h1>Login to Dashboard</h1>

<p>
Sign in to manage museum artifacts and update exhibit information.
</p>

<form onSubmit={handleSubmit} className="login-form">

<input
type="email"
name="email"
placeholder="Enter admin email"
value={formData.email}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Enter password"
value={formData.password}
onChange={handleChange}
required
/>

{error && <div className="login-error">{error}</div>}

<button type="submit">
Login
</button>

</form>

</div>

</section>

)

}

export default LoginPage