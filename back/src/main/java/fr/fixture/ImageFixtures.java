package fr.fixture;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import fr.entity.Image;
import fr.entity.Prestation;
import fr.enums.TablesEnum;
import fr.repository.ImageRepository;
import fr.repository.PrestationRepository;
import java.io.InputStream;
import java.net.URL;


@Component
public class ImageFixtures {

    @Autowired
    private ImageRepository imageRepository;
    
    @Autowired
    private PrestationRepository prestationRepository;

    @Autowired
    private Fixtures fixtures;
    private static final String IMAGE_PATH = "imageFixtures/";

    public void prepareFixtures() {
	    String table = TablesEnum.IMAGE.getTableName();
        int numberOfPrestations = prestationRepository.findAll().size();

        if (fixtures.isDatatableExistAndDelete(table)){
        
            for (Integer i = 1; i <= numberOfPrestations; i++) {
                try {
                    byte[] imageData = loadImageData(i.toString()+".jpg");

                    if (imageData != null) {

                        System.out.println("Image chargée avec succès. Taille du tableau de bytes : " + imageData.length);
                        Image image = new Image(imageData);
                        image.setId(i);
                        Prestation prestation = new Prestation();
                        prestation = prestationRepository.getReferenceById(i);
                        image.setPrestation(prestation);
                        imageRepository.save(image);

                    } else {
                        System.out.println("Le fichier n'a pas pu être trouvé !");
                    }
                } catch (Exception e) {
                        e.printStackTrace();
                } 

            }
                
            for (Integer i = 1; i <= numberOfPrestations; i++) {
                try {
                    Integer j = i+10;
                    byte[] imageData = loadImageData(j.toString()+".jpg");

                    if (imageData != null) {

                        System.out.println("Image chargée avec succès. Taille du tableau de bytes : " + imageData.length);
                        Image image = new Image(imageData);
                        image.setId(i+10);
                        Prestation prestation = new Prestation();
                        prestation = prestationRepository.getReferenceById(i);
                        image.setPrestation(prestation);
                        imageRepository.save(image);

                    } else {
                        System.out.println("Le fichier n'a pas pu être trouvé !");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } 

            }
        }
    }

    private static byte[] loadImageData(String imagePath) throws IOException {
        URL resourceUrl = ImageFixtures.class.getClassLoader().getResource(IMAGE_PATH + imagePath);
        System.out.println(resourceUrl);
        InputStream inputStream = ImageFixtures.class.getClassLoader().getResourceAsStream(IMAGE_PATH + imagePath);

        return inputStream.readAllBytes();
    }

}