package fr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {

}