import "../styles/ArtifactCard.css";
import { useNavigate } from "react-router-dom";

function ArtifactCard({ artifact }) {
  const navigate = useNavigate();

  return (
    <div className="artifact-card" onClick={() => navigate(`/artifact/${artifact.id}`)}>
      <img src={artifact.imageUrl} alt={artifact.name} />
      <h3>{artifact.name}</h3>
    </div>
  );
}

export default ArtifactCard;
