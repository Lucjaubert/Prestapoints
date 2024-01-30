package fr.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.exception.ExceptionJsonDetail;

import fr.dto.LocationDto;
import fr.entity.Location;
import fr.mapper.LocationMapper;
import fr.repository.LocationRepository;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationMapper locationMapper;

    public List<LocationDto> getAllLocations() {
        List<LocationDto> LocationsDto = new ArrayList<>();
        List<Location> locations = locationRepository.findAll();

        for (Location location : locations) {
            LocationsDto.add(locationMapper.convertToDto(location));
        }

        return LocationsDto;
    }

    public String getLocationById(Integer id) throws ExceptionJsonDetail {
        Location location = locationRepository.findById(id).orElseThrow(() -> new ExceptionJsonDetail());
        locationMapper.convertToDto(location);
        JSONObject object = new JSONObject(location);

        return object.toString();
    }

    public Location createLocation(LocationDto locationDto) {
        Location location = locationMapper.convertToEntity(locationDto);

        return locationRepository.save(location);
    }

    public void deleteLocationById(Integer id) {
        locationRepository.deleteById(id);
    }
}
