package fr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.dto.CategoryDto;
import fr.service.CategoryService;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PreAuthorize("permitAll()")
    @GetMapping("/categories")
    public List<CategoryDto> getAllCategories() {

        return categoryService.getAllCategories();
    }
}
