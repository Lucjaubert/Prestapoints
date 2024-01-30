// package fr;

// import org.junit.jupiter.api.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import static org.mockito.ArgumentMatchers.anyString;
// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// import java.util.Optional;

// import org.springframework.http.MediaType;
// import org.springframework.mock.web.MockMultipartFile;

// import fr.controller.AdminController;
// import fr.controller.AuthController;
// import fr.controller.CategoryController;
// import fr.controller.ImageController;
// import fr.controller.PrestationController;
// import fr.dto.UserDto;
// import fr.entity.Avatar;
// import fr.entity.User;
// import fr.mapper.UserMapper;
// import fr.model.ResponseApi;

// import fr.repository.PrestationRepository;
// import fr.service.ImageService;
// import fr.service.PrestationService;
// import fr.service.RegistrationService;
// import fr.service.SecurityUserService;
// import fr.service.UserService;

// @RunWith(SpringRunner.class)
// @SpringBootTest
// @AutoConfigureMockMvc
// public class UserControllerTests {
//     @MockBean
//     private Avatar avatar;
//     @MockBean
//     private User user;
//     @MockBean
//     private UserDetailsService userDetailsService;
//     @MockBean
//     private ImageService imageService;
//     @MockBean
//     private SecurityUserService securityUserService;
//     @MockBean
//     private UserService userService;
//     @MockBean
//     private PrestationController prestationController;
//     @MockBean
//     private AdminController adminController;
//     @MockBean
//     private ImageController imageController;
//     @MockBean
//     private AuthController authController;
//     @MockBean
//     private UserMapper userMapper;
//     @MockBean
//     private CategoryController categoryController;
//     @MockBean
//     private PrestationRepository prestationRepository;
//     @MockBean
//     private RegistrationService registrationService;
//     @MockBean
//     private PrestationService prestationService;

//     @Autowired
//     private MockMvc mockMvc;

//     // -----------------------GET USER--------------------------

//     // -----------------------CREATE USER--------------------------
//     @Test
//     public void testCreateUser_ShouldReturnStatusOk() throws Exception {
//         // Arrange
//         UserDto userDto = new UserDto();
//         userDto.setEmail("");
//         String bodyUser = new ObjectMapper().writeValueAsString(userDto);

//         // Act & Assert
//         mockMvc.perform(post("/public/sign-in")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(bodyUser))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     public void testCreateUser_ShouldReturnValidResponse() throws Exception {
//         // Arrange
//         UserDto userDto = new UserDto();
//         userDto.setEmail("test@email.fr");
//         String body = new ObjectMapper().writeValueAsString(userDto);
//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(true);
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         // Act & Assert
//         mockMvc.perform(post("/public/sign-in")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(body))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     @Test
//     public void testCreateUser_ShouldReturnErrorInvalidEmailResponse() throws Exception {
//         // Arrange
//         UserDto userDto = new UserDto();
//         userDto.setEmail("toto.to");
//         String body = new ObjectMapper().writeValueAsString(userDto);

//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(false);
//         responseApi.setMessage("L'email n'est pas conforme.");
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         // Act & Assert
//         mockMvc.perform(post("/public/sign-in")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(body))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     @Test
//     public void testCreateUser_ShouldReturnErrorEmailExistResponse() throws Exception {
//         // Arrange
//         UserDto userDto = new UserDto();
//         userDto.setEmail("to@to.to");
//         String body = new ObjectMapper().writeValueAsString(userDto);

//         User user = new User();
//         user.setEmail("to@to.to");
//         user.setPassword("toto123456");

//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(false);
//         responseApi.setMessage("L'email existe d\u00C3\u00A9j\u00C3\u00A0 !");
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         when(userService.findUserByEmail(anyString())).thenReturn(Optional.of(user));

//         // Act & Assert
//         mockMvc.perform(post("/public/sign-in")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(body))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     // -----------------------EMAIL VERIFICATION--------------------------
//     @Test
//     public void testEmailVerification_ShouldReturnBadRequest() throws Exception {
//         // Arrange
//         // Act & Assert
//         mockMvc.perform(post("/public/email/verification")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(""))
//                 .andExpect(status().isBadRequest());
//     }

//     @Test
//     public void testEmailVerification_ShouldReturnTrue() throws Exception {
//         // Arrange
//         // UserService is Mocked (no reel creation with createUser() in DB) 
//         // so we simulate the return of the method called by the api
//         // and we test the DB in DataUserTests.java
//         when(userService.findUserByEmail(anyString())).thenReturn(Optional.of(new User()));
//         // Act & Assert
//         mockMvc.perform(post("/public/email/verification")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content("\"test@test.com\""))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string("true"));
//     }

//     @Test
//     public void testUpdateUser_Success() throws Exception {
//         User connectedUser = new User();
//         connectedUser.setEmail("user@example.com");

//         when(authController.getUserConnected()).thenReturn(connectedUser);
//         mockMvc.perform(post("/update")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content("{\"email\":\"user@example.com\"}"))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string("Modification enregistrée"));
//     }

//     @Test
//     public void testUpdateUser_Failed() throws Exception {
//         User connectedUser = new User();
//         connectedUser.setEmail("");

//         UserDto userDto = new UserDto();
//         userDto.setEmail("user@example.com");

//         when(authController.getUserConnected()).thenReturn(connectedUser);

//         mockMvc.perform(post("/update")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content("{\"email\":\"user@example.com\"}"))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string("Erreur lors de la modification"));
//     }

//     // @Test
//     // public void testUploadAvatar_ShouldReturnStatusOk() throws Exception {
//     //     User connectedUser = user;
//     //     connectedUser.setId(1);

//     //     when(authController.getUserConnected()).thenReturn(connectedUser);
//     //     when(connectedUser.getAvatar()).thenReturn(avatar);

//     //     byte[] fileContent = "Test avatar".getBytes();
//     //     MockMultipartFile file = new MockMultipartFile("image", "avatar.png", MediaType.IMAGE_PNG_VALUE, fileContent);

//     //     mockMvc.perform(MockMvcRequestBuilders.multipart("/avatar")
//     //             .file(file))
//     //             .andExpect(status().isOk())
//     //             .andExpect(content().string("Avatar mis à jour avec succes"));
//     // }

//     // @Test
//     // public void testUploadAvatar_ShouldReturnStatusOkWithError() throws Exception {
        
//     //     when(authController.getUserConnected()).thenReturn(null);

//     //     byte[] fileContent = "Test avatar".getBytes();
//     //     MockMultipartFile file = new MockMultipartFile("image", "avatar.png", MediaType.IMAGE_PNG_VALUE, fileContent);

//     //     mockMvc.perform(MockMvcRequestBuilders.multipart("/avatar")
//     //             .file(file))
//     //             .andExpect(status().isOk())
//     //             .andExpect(content().string("Echec mise à jour Avatar"));

//     // }
// }
