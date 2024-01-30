// package fr;

// import static org.junit.Assert.*;

// import java.util.Optional;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.test.context.TestPropertySource;

// import fr.entity.User;
// import fr.fixture.CategoryFixtures;
// import fr.fixture.ImageFixtures;
// import fr.fixture.LocationFixtures;
// import fr.fixture.PrestationFixtures;
// import fr.fixture.RegistrationFixtures;
// import fr.fixture.RoleFixtures;
// import fr.fixture.TypeFixtures;
// import fr.fixture.UserFixtures;

// import fr.repository.UserRepository;

// @DataJpaTest
// @TestPropertySource(locations = "classpath:application-test.properties")
// public class DataUserTests {

//     // must MockBean all fixtures classes to not have Exceptions errors with the PostConstruct.
//     @MockBean
//     private UserFixtures userFixtures;
//     @MockBean
//     private PrestationFixtures prestationFixtures;
//     @MockBean
//     private CategoryFixtures categoryFixtures;
//     @MockBean
//     private ImageFixtures imageFixtures;
//     @MockBean
//     private LocationFixtures locationFixtures;
//     @MockBean
//     private RegistrationFixtures registrationFixtures;
//     @MockBean
//     private TypeFixtures typeFixtures;
//     @MockBean
//     private RoleFixtures roleFixtures;
//     @Autowired
//     private UserRepository userRepository;
    
//     @Test
//     public void testEmailVerification_ShouldReturnTrue() throws Exception {
//         // Arrange
//         User user = new User();
//         user.setEmail("test@email.fr");
//         user.setPassword("password1");

//         // Act
//         userRepository.saveAndFlush(user);
//         Optional<User> userFromDB = userRepository.findById(user.getId());

//         // Assert
//         assertTrue(userFromDB.isPresent());
//         assertEquals(user.getId(), userFromDB.get().getId());
//         assertEquals(user.getEmail(),userFromDB.get().getEmail());
//     }
// }
