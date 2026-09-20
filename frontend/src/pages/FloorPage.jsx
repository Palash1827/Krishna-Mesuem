import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtifactCard from "../components/ArtifactCard";
import "../styles/FloorCard.css";
import { fetchArtifactsByFloor } from "../utils/artifactApi";

function FloorPage() {
  const { id } = useParams();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtifacts = async () => {
      try {
        const data = await fetchArtifactsByFloor(id);
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching floor artifacts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtifacts();
  }, [id]);

  return (
    <div className="page">
      <h1>Artifacts of Floor {id}</h1>

      {loading ? (
        <p>Loading artifacts...</p>
      ) : (
        <div className="grid">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FloorPage;
