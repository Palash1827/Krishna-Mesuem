const API_BASE_URL = "http://localhost:8080/api/artifacts";

export const fetchAllArtifacts = async () => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch artifacts");
  }

  return response.json();
};

export const fetchArtifactsByFloor = async (floorNumber) => {
  const response = await fetch(`${API_BASE_URL}/floor/${floorNumber}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch floor artifacts");
  }

  return response.json();
};

export const fetchArtifactById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch artifact");
  }

  return response.json();
};

export const createArtifact = async (artifact) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(artifact)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create artifact");
  }

  return response.json();
};

export const updateArtifact = async (id, artifact) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(artifact)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update artifact");
  }

  return response.json();
};

export const deleteArtifact = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete artifact");
  }

  return true;
};