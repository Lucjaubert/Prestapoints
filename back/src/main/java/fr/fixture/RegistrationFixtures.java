package fr.fixture;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;
import fr.entity.Prestation;
import fr.entity.Registration;
import fr.entity.User;
import fr.enums.TablesEnum;
import fr.repository.PrestationRepository;
import fr.repository.RegistrationRepository;
import fr.repository.UserRepository;

@Component
public class RegistrationFixtures {

    @Autowired
    private Fixtures fixtures;
    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private PrestationRepository prestationRepository;
    @Autowired
    private UserRepository userRepository;
    

    public void prepareFixtures() {
        String table = TablesEnum.REGISTRATION.getTableName();
        Faker faker = new Faker();
        Registration registration = new Registration();
        int numberOfPrestations = prestationRepository.findAll().size();
        int numberOfUsers = userRepository.findAll().size();

        if (fixtures.isDatatableExistAndDelete(table)) {

            Integer numberOfLigne = 10;

            for (int i = 0; i < numberOfLigne; i++) {
                registration.setId(i);
                registration.setComment(faker.lorem().sentence(faker.number().numberBetween(1, 3)));
                registration.setEvaluation(faker.number().numberBetween(1, 5));

                Prestation prestation = prestationRepository.getReferenceById(faker.number().numberBetween(1, numberOfPrestations));               
                registration.setPrestation(prestation);

                User user = userRepository.getReferenceById(faker.number().numberBetween(1, numberOfUsers));
                registration.setUser(user);

                LocalDateTime dateComment = faker.date().future(30, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                long timestamp = dateComment.toInstant(ZoneOffset.UTC).toEpochMilli();
                Timestamp timestampSql = new Timestamp(timestamp);
                registration.setDate(timestampSql);  
                
                registrationRepository.save(registration);
            }
        }
    }
}
