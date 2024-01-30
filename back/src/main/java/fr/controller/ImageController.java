package fr.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.entity.Image;
import fr.entity.User;
import fr.model.ResponseApi;
import fr.service.ImageService;

@RestController
@CrossOrigin(origins = "*")
public class ImageController {

    @Autowired
    ImageService imageService;

    @Autowired
    AuthController authController;
    
     @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) {
        // Récupérez l'image Blob en fonction de l'ID
        Image image = imageService.getImageById(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Remplacez par le type MIME approprié
        headers.setContentLength(image.getData().length);

        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
    }

    @PostMapping("/images")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        User user = authController.getUserConnected();
        ResponseApi responseApi = new ResponseApi();
        responseApi.setResponseValid(false);

        if (user != null) {
            return imageService.ImageSav(file);
        }
        
        return ResponseEntity.status(500).body("Utilisateur non connecter");

    }
}
