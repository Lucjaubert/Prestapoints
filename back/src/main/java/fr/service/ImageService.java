package fr.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fr.entity.Image;
import fr.exception.ExceptionJsonDetail;
import fr.repository.ImageRepository;

@Service
public class ImageService {

    @Autowired
    ImageRepository imageRepository;

    public Image getImageById(Integer id) throws ExceptionJsonDetail {
        Image image = imageRepository.getReferenceById(id);
        //ImageDto imageDto  = imageMapper.convertToDto(image);
        return image;

    } 

    public ResponseEntity<String> ImageSav(MultipartFile file) {
        try {
            Image image = new Image();
            image.setData(file.getBytes());

            // Vérif type de fichier
            if (!isValidImageType(file.getContentType())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Type de fichier non pris en charge. Veuillez sélectionner une image au format autorisé.");
            }

            // Vérif taille du fichier en plus du application.properties
            if (!isValidImageSize(file.getSize())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La taille du fichier est trop grande. Veuillez sélectionner une image plus petite.");
            }

            image  = imageRepository.save(image);
            return ResponseEntity.ok().body(String.valueOf(image.getId()));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l'enregistrement de l'image.");
        }

    }

    private boolean isValidImageType(String contentType) {
        // Ajoutez les types MIME autorisés selon vos besoins
        List<String> allowedTypes = Arrays.asList("image/jpeg", "image/jpg", "image/png");
        return allowedTypes.contains(contentType);
    }

    private boolean isValidImageSize(long fileSize) {
        // Ajoutez la taille maximale autorisée selon vos besoins
        long maxSize = 1024 * 1024; // Exemple : 1 Mo (1 Mo = 1024 * 1024 octets)
        return fileSize <= maxSize;
    }
}
