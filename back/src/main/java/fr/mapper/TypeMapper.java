package fr.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.TypeDto;
import fr.entity.Type;
import fr.repository.TypeRepository;

@Component
public class TypeMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    TypeRepository typeRepository;

    public TypeDto convertToDto(Type type) {
        TypeDto typeDto = modelMapper.map(type, TypeDto.class);
               
        return typeDto;
    }

    public Type convertToEntity(TypeDto typeDto) {
        Type type = modelMapper.map(typeDto, Type.class);
        
        return type;
    }
}
