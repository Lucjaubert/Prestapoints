package fr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.entity.Type;

public interface TypeRepository extends JpaRepository<Type, Integer> {

}
