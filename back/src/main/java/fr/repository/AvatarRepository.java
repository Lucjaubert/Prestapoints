package fr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.entity.Avatar;
import fr.entity.User;

public interface AvatarRepository extends JpaRepository<Avatar, Integer> {
     Optional<Avatar> findByUserId(Integer userId);
     Avatar findByUser(User user);
}