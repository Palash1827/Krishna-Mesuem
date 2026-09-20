package com.krishnamuseum.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krishnamuseum.model.Artifact;
import com.krishnamuseum.repository.ArtifactRepository;

@RestController
@RequestMapping("/api/artifacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtifactController {

    private final ArtifactRepository artifactRepository;

    public ArtifactController(ArtifactRepository artifactRepository) {
        this.artifactRepository = artifactRepository;
    }

    @GetMapping
    public List<Artifact> getAllArtifacts() {
        return artifactRepository.findAll();
    }

    @GetMapping("/floor/{floorNumber}")
    public List<Artifact> getArtifactsByFloor(@PathVariable int floorNumber) {
        return artifactRepository.findByFloorNumber(floorNumber);
    }

    @GetMapping("/{id}")
    public Artifact getArtifactById(@PathVariable String id) {
        return artifactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artifact not found"));
    }

    @PostMapping
    public Artifact addArtifact(@RequestBody Artifact artifact) {
        System.out.println("Incoming artifact: " + artifact.getArtifactCode() + " | " + artifact.getName());
        Artifact savedArtifact = artifactRepository.save(artifact);
        System.out.println("Saved to MongoDB with id: " + savedArtifact.getId());
        return savedArtifact;
    }

    @PutMapping("/{id}")
    public Artifact updateArtifact(@PathVariable String id, @RequestBody Artifact updatedArtifact) {
        Artifact artifact = artifactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artifact not found"));

        artifact.setArtifactCode(updatedArtifact.getArtifactCode());
        artifact.setName(updatedArtifact.getName());
        artifact.setDescription(updatedArtifact.getDescription());
        artifact.setImageUrl(updatedArtifact.getImageUrl());
        artifact.setFloorNumber(updatedArtifact.getFloorNumber());

        return artifactRepository.save(artifact);
    }

    @DeleteMapping("/{id}")
    public void deleteArtifact(@PathVariable String id) {
        artifactRepository.deleteById(id);
    }
}