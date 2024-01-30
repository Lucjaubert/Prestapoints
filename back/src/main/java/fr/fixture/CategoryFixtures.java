package fr.fixture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import fr.entity.Category;
import fr.enums.TablesEnum;
import fr.repository.CategoryRepository;
import fr.repository.TypeRepository;

@Component
public class CategoryFixtures {

    private String[] categories = {
            "Animaux",
            "Artisanat",
            "Bijoux",
            "Bricolage",
            "Couture",
            "Jardinage",
            "Cuisine",
            "Photographie",
            "Autre"
        };

    @Autowired
    private Fixtures fixtures;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    TypeRepository typeRepository;

    public void prepareFixtures() {
        String table = TablesEnum.CATEGORY.getTableName();

        Category category = new Category();

        if (fixtures.isDatatableExistAndDelete(table)) {

            int numberOfLigne = categories.length;

            for (int i = 0; i < numberOfLigne; i++) {
                category.setId(i+1);
                category.setName(categories[i]);

                categoryRepository.save(category);
            }
        }
    }
}
