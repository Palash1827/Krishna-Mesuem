import "../styles/Home.css";

function Home() {
  const handleScrollToExplore = () => {
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/krishna-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay"></div>

      <div className="home-content">
        <span className="home-tagline">A Virtual Journey Through Heritage</span>

        <h1>Krishna Museum</h1>

        <p className="home-intro">
          Welcome to Krishna Museum, a digital gateway designed to bring the beauty,
          devotion, and cultural heritage of the museum to every visitor.
        </p>

        <p className="home-description">
          The museum is divided into three distinct floors, each presenting its own
          collection of artifacts, statues, and scriptures. Through this website,
          users can take a guided virtual tour, explore every floor separately,
          and gain a deeper understanding of the exhibits preserved within the museum.
        </p>

        <div className="home-buttons">
          <button className="home-btn primary-btn" onClick={handleScrollToExplore}>
            Start Virtual Tour
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;