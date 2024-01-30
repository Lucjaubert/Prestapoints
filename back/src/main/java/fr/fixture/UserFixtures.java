package fr.fixture;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.github.javafaker.Faker;
import fr.entity.Role;
import fr.entity.User;
import fr.enums.TablesEnum;
import fr.repository.RoleRepository;
import fr.repository.UserRepository;

@Component
public class UserFixtures {

    @Autowired
    private Fixtures fixtures;

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void prepareFixtures() {
        String table = TablesEnum.USER.getTableName();
        String tableJoin = TablesEnum.USER_ROLE.getTableName();
        Integer numberOfLigne = 10;
        Faker faker = new Faker();

        Role roleAdmin = roleRepository.getReferenceById(1);
        Role roleUser = roleRepository.getReferenceById(2);

        if (fixtures.isDatatableExistAndDelete(table)) {
            fixtures.isDatatableExistAndDelete(tableJoin);

            for (Integer i = 0; i < numberOfLigne; i++) {
                List<Role> roles = new ArrayList<Role>();
                User user = new User();
                user.setId(i);
                user.setEmail("user" + i.toString() + "@test.com");
                user.setFirstname(faker.name().firstName());
                user.setLastname(faker.name().lastName());
                user.setPhone("012345" + faker.phoneNumber().subscriberNumber());
                user.setPassword(passwordEncoder.encode("t123456789"));
                roles.add(roleUser);
                user.setRoles(roles);

                Date birthday = faker.date().birthday();
                Timestamp timestamp = new Timestamp(birthday.getTime());
                user.setCreationDate(timestamp);

                userRepository.save(user);
            }

            List<Role> roles = new ArrayList<Role>();
            User user = new User();

            user.setId(numberOfLigne + 1);
            user.setEmail("admin@test.com");
            user.setFirstname(faker.name().firstName());
            user.setLastname(faker.name().lastName());
            user.setPhone("012345" + faker.phoneNumber().subscriberNumber());
            user.setPassword(passwordEncoder.encode("t123456789"));
            roles.add(roleUser);
            roles.add(roleAdmin);
            user.setRoles(roles);
            
            Date birthday = faker.date().birthday();
            Timestamp timestamp = new Timestamp(birthday.getTime());
            user.setCreationDate(timestamp);


            userRepository.save(user);

        }
    }
}
