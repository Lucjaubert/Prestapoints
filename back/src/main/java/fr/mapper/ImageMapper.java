package fr.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.ImageDto;
import fr.entity.Image;


@Component
public class ImageMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public ImageDto convertToDto(Image image) {
        ImageDto imageDto = modelMapper.map(image, ImageDto.class);

        return imageDto;
    }

    public Image convertToEntity( ImageDto imageDto) {
        Image image = modelMapper.map(imageDto, Image.class);

        return image;
    }

    public Iterable<ImageDto> convertAllToDto(List<Image> images) {
        List<ImageDto> imageDto = new ArrayList<>();

        for (Image image : images) {
            imageDto.add(modelMapper.map(image, ImageDto.class));
        }

        return imageDto;
    }
}
