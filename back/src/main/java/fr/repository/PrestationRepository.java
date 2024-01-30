package fr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.entity.Category;
import fr.entity.Prestation;

public interface PrestationRepository extends JpaRepository<Prestation, Integer> {
    List<Prestation> findByTypeCategory(Category category);
    
}
