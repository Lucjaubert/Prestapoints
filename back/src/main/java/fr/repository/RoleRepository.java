package fr.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import fr.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
