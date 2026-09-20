import "../styles/Contact.css"

function Contact(){

return(

<section id="contact">

  <div className="contact-container">

    <div className="contact-header">
      <span className="contact-tag">Get In Touch</span>
      <h1>Contact Us</h1>
      <p>
         We are here to help visitors access the
        museum experience with ease.
      </p>
    </div>

    <div className="contact-content">

      <div className="contact-box">
        <div className="contact-item">
          <h3>Phone</h3>
          <p>+91 9999999999</p>
        </div>

        <div className="contact-item">
          <h3>Email</h3>
          <p>krishnamuseum@gmail.com</p>
        </div>

        <div className="contact-item">
          <h3>Address</h3>
          <p>
            Thanesar City Railway Station, Railway Station Area, Kurukshetra, Haryana 136118.
          </p>
        </div>

        <div className="contact-item">
          <h3>Location</h3>
          <p>View the museum location on Google Maps below.</p>
        </div>
      </div>

      <div className="map-box">
        <iframe
          title="Krishna Museum Location"
          src="https://www.google.com/maps?q=Krishna%20Museum%20Kurukshetra&z=14&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>

  </div>

</section>

)

}

export default Contact