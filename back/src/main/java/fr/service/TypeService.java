package fr.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.exception.ExceptionJsonDetail;

import fr.dto.TypeDto;
import fr.entity.Type;
import fr.mapper.TypeMapper;
import fr.repository.TypeRepository;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeMapper typeMapper;

    public List<TypeDto> getAllTypes() {
        List<TypeDto> typesDto = new ArrayList<>();
        List<Type> types = typeRepository.findAll();

        for (Type type : types) {
            typesDto.add(typeMapper.convertToDto(type));
        }

        return typesDto;
    }

    public String getTypeById(Integer id) throws ExceptionJsonDetail {
        Type type = typeRepository.findById(id).orElseThrow(() -> new ExceptionJsonDetail());
        typeMapper.convertToDto(type);
        JSONObject object = new JSONObject(type);

        return object.toString();
    }

    public Type createType(TypeDto typeDto) {
        Type type = typeMapper.convertToEntity(typeDto);

        return typeRepository.save(type);
    }

    public void deleteTypeById(Integer id) {
        typeRepository.deleteById(id);
    }
}
