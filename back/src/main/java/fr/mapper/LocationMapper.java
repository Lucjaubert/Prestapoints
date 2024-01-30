package fr.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.LocationDto;
import fr.entity.Location;
import fr.repository.LocationRepository;

@Component
public class LocationMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    LocationRepository locationRepository;

    public LocationDto convertToDto(Location location) {
        LocationDto locationDto = modelMapper.map(location, LocationDto.class);
               
        return locationDto;
    }

    public Location convertToEntity(LocationDto locationDto) {
        Location location = modelMapper.map(locationDto, Location.class);
        
        return location;
    }
}
