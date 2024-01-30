package fr.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.RoleDto;
import fr.entity.Role;
import fr.repository.RoleRepository;

@Component
public class RoleMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    RoleRepository roleRepository;

    public RoleDto convertToDto(Role role) {
        RoleDto roleDto = modelMapper.map(role, RoleDto.class);
               
        return roleDto;
    }

    public Role convertToEntity(RoleDto roleDto) {
        Role role = modelMapper.map(roleDto, Role.class);
        
        return role;
    }
}
