package fr.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Integer id;
    private String lastname;
    private String firstname;
    private String email;
    private String phone;
    private Long creationDate;
    private List<RoleDto> roles;
    private byte[] image;
}
