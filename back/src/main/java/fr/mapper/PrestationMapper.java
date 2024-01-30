package fr.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import fr.dto.PrestationDto;
import fr.entity.Prestation;
import fr.repository.RegistrationRepository;
import fr.repository.UserRepository;

@Component
public class PrestationMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    RegistrationRepository registrationRepository;

    @Autowired
    UserRepository userRepository;

    public PrestationDto convertToDto(Prestation prestation) {
        PrestationDto prestationDto = modelMapper.map(prestation, PrestationDto.class);
               
        return prestationDto;
    }

    public Prestation convertToEntity(PrestationDto prestationDto) {
        Prestation prestation = modelMapper.map(prestationDto, Prestation.class);
        
        return prestation;
    }
}
