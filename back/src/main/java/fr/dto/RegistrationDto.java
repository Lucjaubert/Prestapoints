package fr.dto;

import java.sql.Timestamp;
import fr.entity.Prestation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationDto {
    private Timestamp date;
    private Integer evaluation;
    private String comment;
    private UserDto user;
    private Prestation prestation;
}
