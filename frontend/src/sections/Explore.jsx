import "../styles/Explore.css"
import FloorCard from "../components/FloorCard"

function Explore(){

return(

<section id="explore">

<h1>Explore The Museum</h1>

<div className="floor-container">

<FloorCard id="1" title="Floor 1"/>
<FloorCard id="2" title="Floor 2"/>
<FloorCard id="3" title="Floor 3"/>

</div>

</section>

)

}

export default Explore