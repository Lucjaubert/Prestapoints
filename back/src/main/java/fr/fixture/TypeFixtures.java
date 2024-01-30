package fr.fixture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import fr.entity.Type;
import fr.enums.TablesEnum;
import fr.repository.CategoryRepository;
import fr.repository.TypeRepository;

@Component
public class TypeFixtures {

    @Autowired
    private Fixtures fixtures;
    
    @Autowired
    TypeRepository typeRepository;
    @Autowired
    CategoryRepository categoryRepository;


    public void prepareFixtures() {

        String[] values = {
            "Dressage de chiens",
            "Poterie",
            "Création de bijoux en perles",
            "Construction de meubles en bois",
            "Confection de vêtements sur mesure",
            "Aménagement paysager",
            "Cuisines du monde",
            "Portrait",
            "Tapisserie d''ameublement"
        };
        
        String table = TablesEnum.TYPE.getTableName();
        Type type = new Type();

        if (fixtures.isDatatableExistAndDelete(table)){     

            for (int i = 0; i < values.length; i++) {
                type.setId(i+1);
                type.setName(values[i]);
                type.setCategory(categoryRepository.getReferenceById(i+1));

                typeRepository.save(type);
            }
        }
    } 
}
