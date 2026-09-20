package com.krishnamuseum;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.krishnamuseum.model.Artifact;
import com.krishnamuseum.repository.ArtifactRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final ArtifactRepository artifactRepository;

    public DataLoader(ArtifactRepository artifactRepository) {
        this.artifactRepository = artifactRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        saveIfNotExists("m1", "Krishna Playing Flute",
                "This statue represents Lord Krishna playing his divine flute.",
                "/images/krishna_flute.jpg", 1);

        saveIfNotExists("m2", "Kurukshetra War Scene",
                "This artifact depicts the famous Kurukshetra war described in the Mahabharata.",
                "/images/kurukshetra.jpg", 1);

        saveIfNotExists("m3", "Bhagavad Gita Teaching",
                "This statue represents Lord Krishna delivering the teachings of the Bhagavad Gita to Arjuna.",
                "/images/gita.jpg", 1);

        saveIfNotExists("h1", "Harappa Dancing Girl",
                "A famous bronze statue from the Indus Valley Civilization discovered at Mohenjo-Daro.",
                "/images/dancing_girl.jpg", 2);

        saveIfNotExists("h2", "Harappan Priest King",
                "A sculpture believed to represent a priest or important leader of the Harappan civilization.",
                "/images/priest_king.jpg", 2);

        saveIfNotExists("h3", "Harappa Seal",
                "Ancient seals used in the Harappan civilization for trade and identification.",
                "/images/harappa_seal.jpg", 2);

        saveIfNotExists("mo1", "Indian Independence Movement",
                "An artifact representing India's struggle for independence from British rule.",
                "/images/independence.jpg", 3);

        saveIfNotExists("mo2", "Freedom Fighters Memorial",
                "A statue honoring the brave freedom fighters who sacrificed their lives.",
                "/images/freedom_fighters.jpg", 3);

        saveIfNotExists("mo3", "Indian Constitution",
                "An artifact representing the formation of the Constitution of India.",
                "/images/constitution.jpg", 3);
    }

    private void saveIfNotExists(String artifactCode, String name, String description, String imageUrl, int floorNumber) {
        if (!artifactRepository.existsByArtifactCode(artifactCode)) {
            Artifact artifact = new Artifact();
            artifact.setArtifactCode(artifactCode);
            artifact.setName(name);
            artifact.setDescription(description);
            artifact.setImageUrl(imageUrl);
            artifact.setFloorNumber(floorNumber);

            artifactRepository.save(artifact);
        }
    }
}