package fr.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto {
    private Integer id;
    private String latitude;
    private String longitude;
    private String city;
    private String postalCode;
    private String address;
    private String addressNumber;
    private String addressInformation;
}
