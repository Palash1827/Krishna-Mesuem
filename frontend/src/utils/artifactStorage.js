import artifactsData from "../data/artifactsData"

const STORAGE_KEY = "krishna_museum_artifacts"

export const getArtifacts = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return artifactsData
}

export const saveArtifacts = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const resetArtifacts = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artifactsData))
}