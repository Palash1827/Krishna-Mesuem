import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ArtifactCard.css";
import { fetchArtifactById } from "../utils/artifactApi";

function ArtifactPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtifact = async () => {
      try {
        const data = await fetchArtifactById(id);
        setArtifact(data);
      } catch (error) {
        console.error("Error fetching artifact:", error);
        setArtifact(null);
      } finally {
        setLoading(false);
      }
    };

    loadArtifact();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Loading artifact...</h2>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Artifact not found</h2>
        <button onClick={() => navigate("/")}>Back to Museum</button>
      </div>
    );
  }

  return (
    <div className="artifact-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{artifact.name}</h1>

      <img src={artifact.imageUrl} alt={artifact.name} />

      <p>{artifact.description}</p>
    </div>
  );
}

export default ArtifactPage;
