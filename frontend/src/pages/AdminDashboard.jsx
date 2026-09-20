import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import {
  fetchAllArtifacts,
  createArtifact,
  updateArtifact,
  deleteArtifact
} from "../utils/artifactApi";

function AdminDashboard() {
  const navigate = useNavigate();

  const [artifacts, setArtifacts] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [editingArtifact, setEditingArtifact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    artifactCode: "",
    name: "",
    description: "",
    imageUrl: "",
    floorNumber: 1
  });

  const loadArtifacts = async () => {
    try {
      const data = await fetchAllArtifacts();
      setArtifacts(data);
    } catch (error) {
      console.error("Error loading artifacts:", error);
    }
  };

  useEffect(() => {
    loadArtifacts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  const floorArtifacts = useMemo(() => {
    return artifacts.filter(
      (artifact) =>
        artifact.floorNumber === selectedFloor &&
        (
          artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artifact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (artifact.artifactCode || "").toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [artifacts, selectedFloor, searchTerm]);

  const totalArtifacts = artifacts.length;

  const floorCount = (floor) =>
    artifacts.filter((artifact) => artifact.floorNumber === floor).length;

  const clearForm = () => {
    setEditingArtifact(null);
    setPreviewImage("");
    setFormData({
      artifactCode: "",
      name: "",
      description: "",
      imageUrl: "",
      floorNumber: selectedFloor
    });
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setSearchTerm("");
    setEditingArtifact(null);
    setPreviewImage("");
    setFormData({
      artifactCode: "",
      name: "",
      description: "",
      imageUrl: "",
      floorNumber: floor
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "floorNumber" ? Number(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      setPreviewImage(result);
      setFormData((prev) => ({
        ...prev,
        imageUrl: result
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...formData,
      imageUrl: formData.imageUrl || "/images/krishna_flute.jpg"
    };

    if (editingArtifact) {
      await updateArtifact(editingArtifact.id, payload);
    } else {
      await createArtifact(payload);
    }

    await loadArtifacts();
    clearForm();
  } catch (error) {
    console.error("Error saving artifact:", error);
    alert(error.message || "Failed to save artifact");
  }
};

  const handleEdit = (artifact) => {
    setEditingArtifact(artifact);
    setPreviewImage(artifact.imageUrl);
    setSelectedFloor(artifact.floorNumber);

    setFormData({
      artifactCode: artifact.artifactCode || "",
      name: artifact.name || "",
      description: artifact.description || "",
      imageUrl: artifact.imageUrl || "",
      floorNumber: artifact.floorNumber || 1
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtifact(id);
      await loadArtifacts();

      if (editingArtifact && editingArtifact.id === id) {
        clearForm();
      }
    } catch (error) {
      console.error("Error deleting artifact:", error);
      alert("Failed to delete artifact");
    }
  };

  return (
    <section className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-tag">CMS Panel</span>
          <h2>Krishna Museum</h2>
          <p>Manage your museum content professionally.</p>
        </div>

        <div className="admin-sidebar-block">
          <h3>Floors</h3>

          <button
            className={selectedFloor === 1 ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => handleFloorChange(1)}
          >
            Floor 1
            <span>{floorCount(1)}</span>
          </button>

          <button
            className={selectedFloor === 2 ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => handleFloorChange(2)}
          >
            Floor 2
            <span>{floorCount(2)}</span>
          </button>

          <button
            className={selectedFloor === 3 ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => handleFloorChange(3)}
          >
            Floor 3
            <span>{floorCount(3)}</span>
          </button>
        </div>

        <div className="admin-sidebar-block">
          <h3>Quick Actions</h3>
          <button className="sidebar-action logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="admin-tag">Admin Dashboard</span>
            <h1>Artifact Management</h1>
            <p>Add, update, delete, and organize artifacts for each museum floor.</p>
          </div>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Artifacts</h3>
            <p>{totalArtifacts}</p>
          </div>
          <div className="stat-card">
            <h3>Current Floor</h3>
            <p>{selectedFloor}</p>
          </div>
          <div className="stat-card">
            <h3>Visible Results</h3>
            <p>{floorArtifacts.length}</p>
          </div>
        </div>

        <div className="admin-content-grid">
          <div className="admin-form-box">
            <div className="box-header">
              <h2>{editingArtifact ? "Update Artifact" : "Add New Artifact"}</h2>

              {editingArtifact && (
                <button className="cancel-edit-btn" onClick={clearForm}>
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <input
                type="text"
                name="artifactCode"
                placeholder="Artifact Code"
                value={formData.artifactCode}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Artifact Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Artifact description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>

              <select
                name="floorNumber"
                value={formData.floorNumber}
                onChange={handleChange}
                required
              >
                <option value={1}>Floor 1</option>
                <option value={2}>Floor 2</option>
                <option value={3}>Floor 3</option>
              </select>

              <div className="upload-box">
                <label htmlFor="artifact-image" className="upload-label">
                  Upload Artifact Image
                </label>

                <input
                  id="artifact-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Artifact preview" />
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">
                {editingArtifact ? "Update Artifact" : "Add Artifact"}
              </button>
            </form>
          </div>

          <div className="admin-list-box">
            <div className="box-header">
              <h2>Floor {selectedFloor} Artifacts</h2>

              <input
                type="text"
                className="search-input"
                placeholder="Search artifacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="artifact-admin-list">
              {floorArtifacts.length > 0 ? (
                floorArtifacts.map((artifact) => (
                  <div className="artifact-admin-card" key={artifact.id}>
                    <img src={artifact.imageUrl} alt={artifact.name} />

                    <div className="artifact-admin-content">
                      <div className="artifact-admin-head">
                        <div>
                          <h3>{artifact.name}</h3>
                          <span>ID: {artifact.artifactCode || artifact.id}</span>
                        </div>
                      </div>

                      <p>{artifact.description}</p>

                      <div className="artifact-admin-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(artifact)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(artifact.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-artifacts">No matching artifacts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
