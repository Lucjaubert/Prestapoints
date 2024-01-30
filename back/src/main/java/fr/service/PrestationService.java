package fr.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.exception.ExceptionJsonDetail;
import fr.controller.AuthController;
import fr.dto.ImageDto;
import fr.dto.LocationDto;
import fr.dto.PrestationDto;
import fr.dto.TypeDto;
import fr.entity.Category;
import fr.entity.Image;
import fr.entity.Location;
import fr.entity.Prestation;
import fr.entity.Type;
import fr.entity.User;
import fr.mapper.PrestationMapper;
import fr.repository.CategoryRepository;
import fr.repository.ImageRepository;
import fr.repository.PrestationRepository;

@Service
public class PrestationService {

    @Autowired
    private PrestationRepository prestationRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private PrestationMapper prestationMapper;

    @Autowired
    private LocationService locationService;
    @Autowired
    private TypeService typeService;
    @Autowired
    private ImageService imageService;

    @Autowired
    private AuthController authController;

    public List<PrestationDto> getAllPrestations() {
        List<PrestationDto> prestationDtos = new ArrayList<>();
        List<Prestation> prestations = prestationRepository.findAll();

        for (Prestation prestation : prestations) {
            prestationDtos.add(prestationMapper.convertToDto(prestation));
        }

        return prestationDtos;
    }

    public PrestationDto getPrestationById(Integer id) throws ExceptionJsonDetail {
        Prestation prestation = prestationRepository.findById(id).get();
        PrestationDto prestationDto = prestationMapper.convertToDto(prestation);

        return prestationDto;
    }

    public PrestationDto createPrestation(PrestationDto prestationDto) {
        Prestation prestation = prestationMapper.convertToEntity(prestationDto);
        
        User user = authController.getUserConnected();
        
        TypeDto typeDto = prestationDto.getType();
        Type type = typeService.createType(typeDto);

        LocationDto locationDto = prestationDto.getLocation();
        Location location = locationService.createLocation(locationDto);

        List<ImageDto> imagesDto = prestationDto.getImages();
        List<Image> images = new ArrayList<>();
        for (ImageDto imageDto : imagesDto) {
            images.add(imageService.getImageById(imageDto.getId()));
        }
        prestation.setImages(images);

        prestation.setUser(user);
        prestation.setType(type);
        prestation.setLocation(location);

        prestation = prestationRepository.save(prestation);

        images = prestation.getImages();

        for (Image image : images) {
            image.setPrestation(prestation);
            imageRepository.save(image);
        }

        return prestationMapper.convertToDto(prestation);
        
    }

    public void deletePrestationById(int id) {
        prestationRepository.deleteById(id);
    }

    public Prestation subtractOnePlaceAvailableInPrestationById(Integer id) {
        Prestation prestation = prestationRepository.findById(id).get();

        if (prestation.getPlaceAvailable() > 0) {
            prestation.setPlaceAvailable(prestation.getPlaceAvailable() - 1);
        }

        return prestationRepository.save(prestation);
    }
    
    public Prestation addOnePlaceAvailableInPrestationById(Integer id) {
        Prestation prestation = prestationRepository.findById(id).get();

        if (prestation != null) {
            prestation.setPlaceAvailable(prestation.getPlaceAvailable() + 1);
        }

        return prestationRepository.save(prestation);
    }

    public List<PrestationDto> getPrestationsByCategory(Integer categoryId) throws ExceptionJsonDetail {
        Category category = categoryRepository.findById(categoryId).get();

        List<Prestation> prestations = prestationRepository.findByTypeCategory(category);

        List<PrestationDto> prestationDtos = prestations.stream()
            .map(prestationMapper::convertToDto)
            .collect(Collectors.toList());

        return prestationDtos;
    }
}
