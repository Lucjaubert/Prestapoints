package fr.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.dto.CategoryDto;
import fr.entity.Category;
import fr.repository.CategoryRepository;

@Component
public class CategoryMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    CategoryRepository categoryRepository;

    public CategoryDto convertToDto(Category category) {
        CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
               
        return categoryDto;
    }

    public Category convertToEntity(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        
        return category;
    }
}
