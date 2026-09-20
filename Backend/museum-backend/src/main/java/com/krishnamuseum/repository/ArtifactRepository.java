package com.krishnamuseum.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.krishnamuseum.model.Artifact;

public interface ArtifactRepository extends MongoRepository<Artifact, String> {
    List<Artifact> findByFloorNumber(int floorNumber);
    Optional<Artifact> findByArtifactCode(String artifactCode);
    boolean existsByArtifactCode(String artifactCode);
}