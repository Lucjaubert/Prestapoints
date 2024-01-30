package fr.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.exception.ExceptionJsonDetail;

import fr.dto.CategoryDto;
import fr.entity.Category;
import fr.mapper.CategoryMapper;
import fr.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    public List<CategoryDto> getAllCategories() {
        List<CategoryDto> categoriesDto = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();
       
        for (Category category : categories) {
            categoriesDto.add(categoryMapper.convertToDto(category));
        }
         System.out.println(categoriesDto);
        return categoriesDto;
    }

    public String getCategoryById(Integer id) throws ExceptionJsonDetail {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ExceptionJsonDetail());
        categoryMapper.convertToDto(category);
        JSONObject object = new JSONObject(category);

        return object.toString();
    }

    public Category createCategory(CategoryDto categoryDto) {
        Category category = categoryMapper.convertToEntity(categoryDto);

        return categoryRepository.save(category);
    }

    public void deleteCategoryById(Integer id) {
        categoryRepository.deleteById(id);
    }
}
