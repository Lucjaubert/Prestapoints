// package fr;

// import org.junit.jupiter.api.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.test.web.servlet.MockMvc;

// import com.fasterxml.jackson.databind.ObjectMapper;

// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// import java.util.Optional;

// import org.springframework.http.MediaType;
// import org.springframework.security.test.context.support.WithMockUser;

// import fr.controller.AuthController;
// import fr.controller.CategoryController;
// import fr.dto.PrestationDto;
// import fr.entity.Prestation;
// import fr.entity.Registration;
// import fr.entity.User;
// import fr.mapper.UserMapper;
// import fr.model.ResponseApi;
// import fr.repository.PrestationRepository;
// import fr.service.PrestationService;
// import fr.service.RegistrationService;

// @RunWith(SpringRunner.class)
// @SpringBootTest
// @AutoConfigureMockMvc
// public class PrestationControllerTests {

//     @MockBean
//     private PrestationService prestationService;
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

//     @Autowired
//     private MockMvc mockMvc;

//     @Test
//     @WithMockUser(username = "user@example.com")
//     public void testBookedRegistration_ShouldReturnStatusOk() throws Exception {
//         // Arrange
//         Integer prestationId = 1;
//         User connectedUser = new User();

//         Prestation prestation = new Prestation();
//         prestation.setPlaceAvailable(10);

//         when(authController.getUserConnected()).thenReturn(connectedUser);
//         when(registrationService.getRegistrationByUserIdAndPrestationId(connectedUser.getId(), prestationId))
//                 .thenReturn(null);
//         when(prestationRepository.findById(prestationId)).thenReturn(Optional.of(prestation));

//         String requestBody = new ObjectMapper().writeValueAsString(prestationId);
//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(true);
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         // Act && Assert
//         mockMvc.perform(post("/prestations/prestation/registration")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(requestBody))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     @Test
//     @WithMockUser(username = "test@example.com")
//     public void testBookedRegistration_ShouldReturnStatusOkAndAlreadyRegistered() throws Exception {
//         // Arrange
//         Integer prestationId = 1;
//         User connectedUser = new User();

//         Prestation prestation = new Prestation();
//         prestation.setPlaceAvailable(10);

//         Registration registration = new Registration();
//         registration.setUser(connectedUser);

//         when(authController.getUserConnected()).thenReturn(connectedUser);
//         when(registrationService.getRegistrationByUserIdAndPrestationId(connectedUser.getId(), prestationId))
//                 .thenReturn(registration);
//         when(prestationRepository.findById(prestationId)).thenReturn(Optional.of(prestation));

//         String requestBody = new ObjectMapper().writeValueAsString(prestationId);
//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(false);
//         responseApi.setMessage("Vous Ãªtes dÃ©jÃ  inscrit Ã  cette prestation");
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         // Act && Assert
//         mockMvc.perform(post("/prestations/prestation/registration")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(requestBody))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     @Test
//     @WithMockUser(username = "test@example.com")
//     public void testBookedRegistration_ShouldReturnStatusOkRegistrationFull() throws Exception {
//         // Arrange
//         Integer prestationId = 1;
//         User connectedUser = new User();

//         Prestation prestation = new Prestation();
//         prestation.setPlaceAvailable(0);

//         Registration registration = new Registration();
//         registration.setUser(connectedUser);

//         when(authController.getUserConnected()).thenReturn(connectedUser);
//         when(registrationService.getRegistrationByUserIdAndPrestationId(connectedUser.getId(), prestationId))
//                 .thenReturn(null);
//         when(prestationRepository.findById(prestationId)).thenReturn(Optional.of(prestation));

//         String requestBody = new ObjectMapper().writeValueAsString(prestationId);
//         ResponseApi responseApi = new ResponseApi();
//         responseApi.setResponseValid(false);
//         responseApi.setMessage("DÃ©solÃ©, il n'y a plus de place disponible pour cette prestation");
//         String response = new ObjectMapper().writeValueAsString(responseApi);

//         // Act && Assert
//         mockMvc.perform(post("/prestations/prestation/registration")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(requestBody))
//                 .andExpect(status().isOk())
//                 .andExpect(content().string(response));
//     }

//     @Test
//     @WithMockUser(username = "test@example.com")
//     public void testGetPrestation() throws Exception {
//         // Arrange
//         Integer prestationId = 1;
//         PrestationDto prestationDto = new PrestationDto();

//         when(prestationService.getPrestationById(prestationId)).thenReturn(prestationDto);

//         // Act & Assert
//         mockMvc.perform(get("/prestations/{id}", prestationId)
//                 .contentType(MediaType.APPLICATION_JSON))
//                 .andExpect(status().isOk());
//     }
// }
