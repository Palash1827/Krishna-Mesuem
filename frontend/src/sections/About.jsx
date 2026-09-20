import "../styles/About.css"
import { useState, useEffect } from "react"

function About() {

const images = [
  "/images/museum1.jpg",
  "/images/museum2.jpg",
  "/images/museum3.jpg",
  "/images/museum4.jpg"
]

const [currentImage, setCurrentImage] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }, 2500)

  return () => clearInterval(interval)
}, [])

return(

<section id="about">

  <div className="about-container">

    <div className="about-image">
      <img 
        src={images[currentImage]} 
        alt="Srikrishna Museum"
        className="slider-image"
      />
    </div>

    <div className="about-text">

      <span className="about-tag">About Krishna Museum</span>

      <h1>Preserving the Legacy of Lord Krishna Through a Virtual Museum Experience</h1>

      <p className="about-intro">
        Krishna Museum is a thoughtfully designed digital platform dedicated to presenting the spiritual, historical, and artistic heritage associated with Lord Krishna in an engaging and accessible way. It allows visitors to experience the museum beyond physical boundaries and explore its collections from anywhere.
      </p>

      <p>
        The museum celebrates the life, teachings, and timeless influence of Lord Krishna, whose presence in Indian philosophy, devotion, literature, and art continues to inspire generations. From his childhood narratives to the profound wisdom of the Bhagavad Gita, each representation reflects a unique dimension of his divine and human character.
      </p>

      <p>
        Through this virtual museum, visitors can explore three distinct floors, each featuring carefully presented artifacts, statues, and scriptures in their respective sections. The website is designed to provide a structured and meaningful journey, helping users understand the significance of every exhibit while experiencing the richness of Krishna’s legacy.
      </p>

      <div className="about-highlights">
        <div className="highlight-card">
          <h3>Virtual Access</h3>
          <p>Explore the museum experience digitally from anywhere with ease.</p>
        </div>

        <div className="highlight-card">
          <h3>Three-Floor Journey</h3>
          <p>Discover exhibits floor by floor in a clear and organized format.</p>
        </div>

        <div className="highlight-card">
          <h3>Cultural Insight</h3>
          <p>Understand the stories, symbolism, and heritage behind each exhibit.</p>
        </div>
      </div>

    </div>

  </div>

</section>

)

}

export default About