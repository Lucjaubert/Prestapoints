package fr.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fr.dto.UserDto;
import fr.entity.Role;
import fr.entity.Avatar;
import fr.entity.User;
import fr.enums.MessageApiEnum;
import fr.enums.RoleEnum;
import fr.mapper.UserMapper;
import fr.model.ResponseApi;
import fr.repository.RoleRepository;
import fr.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    public User createUser(UserDto userDto) {
        User user = userMapper.convertToEntity(userDto);
        //user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        if (user.getCreationDate() == null) {
            LocalDate today = LocalDate.now();
            LocalTime currentTime = LocalTime.now();
            LocalDateTime currentDateTime = LocalDateTime.of(today, currentTime);
            Timestamp timestamp = Timestamp.valueOf(currentDateTime);

            user.setCreationDate(timestamp);
        }
        
        List<Role> roles = new ArrayList<Role>();
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            for (Role role : user.getRoles()) {
                Role roleDb = roleRepository.findByName(role.getName()).get();
                roles.add(roleDb);
            }
        } else {
            Role role = roleRepository.findByName(RoleEnum.ROLE_USER.getRole()).get();
            roles.add(role);
        }

        user.setRoles(roles);

       return userRepository.saveAndFlush(user);
    }

    public User getUserById(Integer id) {
        
        return userRepository.getReferenceById(id);
    }

    public List<UserDto> getUsersDto() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<UserDto>();

        for (User user : users) {
            usersDto.add(userMapper.convertToDto(user));
        }

        return usersDto;
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUserProfil(Integer id, UserDto userDto) {
        // PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));

        user.setLastname(userDto.getLastname());
        user.setFirstname(userDto.getFirstname());
        //user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());

        return userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void uploadNewAvatar(MultipartFile file, User user)throws IOException {
        Avatar newAvatar = new Avatar();
        newAvatar.setType(file.getContentType());
        newAvatar.setData(file.getBytes());
        newAvatar.setUser(user);
    }

    public ResponseApi deleteUsers(List<User> users) {
        try {
            userRepository.deleteAll(users);

            return new ResponseApi(true, MessageApiEnum.DELETE_SUCCESS.getMessage());

        } catch (DataIntegrityViolationException e) {
            String blockingTable = extractBlockingTableFromException(e);

            return new ResponseApi(false,
                    "Impossible de supprimer au moins l'un des utilisateurs en raison de sa présence dans : "
                            + blockingTable);
        }
    }

    public ResponseApi deleteUser(UserDto userDto) {
        try {
            User user = userRepository.findByEmail(userDto.getEmail()).orElse(null);

            if (user != null) {
                userRepository.delete(user);

                return new ResponseApi(true, MessageApiEnum.DELETE_SUCCESS.getMessage());
            } else {

                return new ResponseApi(false, "Utilisateur non trouvé");
            }
        } catch (DataIntegrityViolationException e) {
            String blockingTable = extractBlockingTableFromException(e);

            return new ResponseApi(false,
                    "Impossible de supprimer l'utilisateur en raison de sa présence dans : " + blockingTable);
        }
    }

    private String extractBlockingTableFromException(DataIntegrityViolationException exception) {
        String errorMessage = exception.getRootCause().getMessage();
        String[] parts = errorMessage.split("`");
        String table = "inconnue";

        if (parts.length >= 3) {
            switch (parts[3]) {
                case "registration":
                    table = "inscription";
                    break;

                default:
                    break;
            }
        }
        return table;
    }
}
