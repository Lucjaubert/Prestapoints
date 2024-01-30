package fr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import fr.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

    @Query("SELECT r FROM Registration r WHERE r.prestation.id = :id")
    List<Registration> findAllByPrestationId(@Param("id") Integer id);

    @Query("SELECT r, p FROM Registration r JOIN Prestation p")
    Iterable<Registration> findAllPrestationWithComment();

    @Query("SELECT r FROM Registration r WHERE r.user.id = :userId AND r.prestation.id = :prestationId")
    Registration getRegistrationByUserIdAndPrestationId(@Param("userId") Integer userId,
            @Param("prestationId") Integer prestationId);

    @Modifying
    @Query("DELETE FROM Registration r WHERE r.user.id = :userId AND r.prestation.id = :prestationId")
    void deleteRegistrationByUserIdAndPrestationId(@Param("userId") Integer userId, @Param("prestationId") Integer prestationId);
    
}
