import "../styles/FloorCard.css"
import { useNavigate } from "react-router-dom"

function FloorCard({id,title}){

const navigate = useNavigate()

return(

<div className="floor-card" onClick={()=>navigate(`/floor/${id}`)}>

<img src={`/images/floor${id}.jpg`} alt={title}/>

<div className="floor-card-content">

<h3>{title}</h3>

<p>Explore statues and artifacts on this floor</p>

</div>

</div>

)

}

export default FloorCard