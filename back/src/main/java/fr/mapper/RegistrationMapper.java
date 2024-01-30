package fr.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.RegistrationDto;
import fr.entity.Registration;

@Component
public class RegistrationMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public RegistrationDto convertToDto(Registration registration) {
        RegistrationDto registrationDto = modelMapper.map(registration, RegistrationDto.class);

        return registrationDto;
    }

    public Registration convertToEntity(RegistrationDto registrationDto) {
        Registration registration = modelMapper.map(registrationDto, Registration.class);

        return registration;
    }

    public Iterable<RegistrationDto> convertAllToDto(List<Registration> registrations) {
        List<RegistrationDto> registrationDto = new ArrayList<>();

        for (Registration registration : registrations) {
            registrationDto.add(modelMapper.map(registration, RegistrationDto.class));
        }

        return registrationDto;
    }
}
