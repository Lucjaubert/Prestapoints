package fr.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fr.model.ResponseApi;
import fr.repository.PrestationRepository;
import fr.dto.PrestationDto;
import fr.entity.Prestation;
import fr.entity.Registration;
import fr.entity.User;
import fr.enums.MessageApiEnum;
import fr.service.PrestationService;
import fr.service.RegistrationService;
import fr.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class PrestationController {
    @Autowired
    PrestationService prestationService;

    @Autowired
    PrestationRepository prestationRepository;

    @Autowired
    RegistrationService registrationService;

    @Autowired
    UserService userService;

    @Autowired
    AuthController authController;

    @GetMapping("/accueil")
    public List<PrestationDto> getAllPrestations() {

        return prestationService.getAllPrestations();
    }

    @GetMapping("/prestations/{id}")
    public PrestationDto getPrestation(@PathVariable Integer id) {

        return prestationService.getPrestationById(id);
    }

    @GetMapping("/prestations/categories/{categoryId}")
    public ResponseEntity<List<PrestationDto>> getPrestationsByCategory(@PathVariable Integer categoryId) {
        List<PrestationDto> prestations = prestationService.getPrestationsByCategory(categoryId);

        return ResponseEntity.ok(prestations);
    }
    
    @PostMapping("/prestations/prestation/registration")
    public ResponseApi bookedRegistration(@RequestBody Integer prestationId) {

        User user = authController.getUserConnected();
        ResponseApi responseApi = new ResponseApi();
        Prestation prestation = prestationRepository.findById(prestationId).get();
        responseApi.setResponseValid(false);

        if (user != null) {
            Registration registration = registrationService.getRegistrationByUserIdAndPrestationId(user.getId(),
                    prestationId);

            if (registration != null) {
                responseApi.setMessage(MessageApiEnum.REGISTRATION_ALREADY.getMessage());

            } else if (prestation.getPlaceAvailable() == 0) {
                responseApi.setMessage(MessageApiEnum.REGISTRATION_FULL.getMessage());

            } else {
                prestationService.subtractOnePlaceAvailableInPrestationById(prestationId);
                registrationService.addRegistrationByUserIdAndPrestationId(user, prestation);
                responseApi.setResponseValid(true);
            }
        } else {
            responseApi.setMessage(MessageApiEnum.NEED_TO_BE_CONNECTED.getMessage());
        }
        
        return responseApi;
    }
   
    @PostMapping("/prestations")
    public PrestationDto createPrestation(@RequestBody PrestationDto prestationDto) {

        return prestationService.createPrestation(prestationDto);
    }

    @DeleteMapping("/prestations/{id}")
    public void deletePrestation(@PathVariable Integer id) {

        prestationService.deletePrestationById(id);
    }



    @DeleteMapping("/prestations/prestation/registration/suppression/{prestationId}")
    public ResponseApi undoRegistration(@PathVariable Integer prestationId) {

        User user = authController.getUserConnected();
        ResponseApi responseApi = new ResponseApi();
        responseApi.setResponseValid(false);

        if (user != null) {

            Registration registration = registrationService.getRegistrationByUserIdAndPrestationId(user.getId(),
                    prestationId);

            if (registration != null) {
                registrationService.deleteRegistrationByUserIdAndPrestationId(user.getId(), prestationId);
                prestationService.addOnePlaceAvailableInPrestationById(prestationId);
                responseApi.setResponseValid(true);
                responseApi.setMessage(MessageApiEnum.DELETE_SUCCESS.getMessage());
                
            } else {
                responseApi.setMessage(MessageApiEnum.DELETE_FAILED.getMessage());
            }
        } else {
            responseApi.setMessage(MessageApiEnum.NEED_TO_BE_CONNECTED.getMessage());
        }
        return responseApi;
    }

}
