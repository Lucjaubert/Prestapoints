package fr.fixture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.entity.Role;
import fr.enums.RoleEnum;
import fr.enums.TablesEnum;
import fr.repository.RoleRepository;

@Component
public class RoleFixtures {
    
    @Autowired
    private Fixtures fixtures;

    @Autowired
    private RoleRepository roleRepository;

     public void prepareFixtures() {

         String table = TablesEnum.ROLE.getTableName();
         Role role = new Role();

        if (fixtures.isDatatableExistAndDelete(table)){
                
            role.setId(1);
                role.setName(RoleEnum.ROLE_ADMIN.getRole());
                roleRepository.save(role);

                role.setId(2);
                role.setName(RoleEnum.ROLE_USER.getRole());
                roleRepository.save(role);

            }
        }
    } 

