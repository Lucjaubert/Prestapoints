package fr.fixture;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;
import fr.entity.Location;
import fr.entity.User;
import fr.enums.TablesEnum;
import fr.repository.LocationRepository;
import fr.repository.UserRepository;


@Component
public class LocationFixtures {

    @Autowired
    private Fixtures fixtures;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;

    public void prepareFixtures() {

        String table = TablesEnum.LOCATION.getTableName();
        Faker faker = new Faker();
        Location location = new Location();

        if (fixtures.isDatatableExistAndDelete(table)){
            Integer numberOfLigne = 10;
            for (int i = 0; i < numberOfLigne; i++) {
                location.setId(i);

                String numeroDeRue = String.valueOf(faker.number().numberBetween(1,300));
                String rue = faker.address().streetName();
                location.setAddress(numeroDeRue + " rue "+ rue);

                location.setPostalCode(String.valueOf(faker.number().numberBetween(10000,95100)));
                location.setAddressNumber(numeroDeRue);
                location.setCity(faker.address().cityName());

                Optional<User> user = userRepository.findById(i+1);
                String userFirstName = user.get().getFirstname();
                String tramStopName1 =faker.name().fullName();
                String tramStopName2 =faker.name().fullName();
                location.setAddressInformation("L'atelier de "+ userFirstName + " se trouve dans la rue " + rue + ", à quelques pas de l'arrêt de Tram "+ tramStopName1 +" (Tram A) et "+ tramStopName2 + " (BUS C).");
                
                locationRepository.save(location);
            }
        }
    } 
}
