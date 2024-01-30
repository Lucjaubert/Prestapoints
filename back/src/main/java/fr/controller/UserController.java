package fr.controller;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.dto.UserDto;
import fr.entity.Avatar;
import fr.entity.User;
import fr.enums.MessageApiEnum;
import fr.enums.RegexEnum;
import fr.mapper.UserMapper;
import fr.model.ResponseApi;
import fr.repository.AvatarRepository;
import fr.service.UserService;

@RestController
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;

    @Autowired
    private AvatarRepository avatarRepository;

    // Inscription du USER :
    @CrossOrigin(origins = "*")
    @PostMapping("/public/sign-in")
    public ResponseApi createUser(@RequestBody UserDto userDto) {

        ResponseApi responseApi = new ResponseApi();
        responseApi.setResponseValid(false);

        if (!userService.findUserByEmail(userDto.getEmail()).isPresent()) {
            if (Pattern.matches(RegexEnum.REGEX_EMAIL.getString(),
                    userDto.getEmail())) {
                userService.createUser(userDto);
                responseApi.setResponseValid(true);
            } else {
                responseApi.setMessage(MessageApiEnum.EMAIL_NOT_VALID.getMessage());
            }
        } else {
            responseApi.setMessage(MessageApiEnum.EMAIL_EXISTING.getMessage());
        }

        return responseApi;
    }

    // vérification de l'email d'inscription :
    @CrossOrigin(origins = "*")
    @PostMapping("/public/email/verification")
    public boolean emailVerification(@RequestBody String email) {
        Optional<User> user = userService.findUserByEmail(email);
        return user.isPresent();
    }

    /**
     * Method to return our logged in User
     *
     * @return user connected
     */

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getUserConnected")
    public UserDto getUserConnected() {
        User user = authController.getUserConnected();
        System.out.println("***************************************----------------------------USERCONNECTED");
        System.out.println(user.getEmail());
        return userMapper.convertToDto(user);
    }

    // @CrossOrigin(origins = "*")
    // @GetMapping(value = "/users/{id}")
    // public UserDto getUser(@PathVariable("id") Integer id) {
    //     return userMapper.convertToDto(userService.getUserById(id));
    // }

    /**
     * Method to update logged in user's profile
     *
     * @return return the api response
     */

    @CrossOrigin(origins = "*")
    @PostMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserDto userDto) {
        User user = authController.getUserConnected();
        if (user.getEmail().equals(userDto.getEmail())) {
            userService.updateUserProfil(user.getId(), userDto);

            return new ResponseEntity<>("Modification enregistrée", HttpStatus.OK);
        } else {
            
            return new ResponseEntity<>("Erreur lors de la modification", HttpStatus.OK);
        }
    }

    /**
     * Method to update picture Avatar
     *
     * @return return the api response
     */

    @CrossOrigin(origins = "*")
    @PostMapping("/avatar")
    public ResponseEntity<String> uplaodAvatar(@RequestParam("image") MultipartFile file) throws IOException {
        User user = authController.getUserConnected();
        if (user != null) {
            Avatar existingAvatar = user.getAvatar();
            if (existingAvatar == null) {
                userService.uploadNewAvatar(file, user);
            } else {
                existingAvatar.setType(file.getContentType());
                existingAvatar.setData(file.getBytes());
            }
            avatarRepository.save(user.getAvatar());
            return new ResponseEntity<>("Avatar mis à jour avec succes", HttpStatus.OK);
        }
        return new ResponseEntity<>("Echec mise à jour Avatar", HttpStatus.OK);
    }

    /**
     * Method to get a picture Avatar
     *
     * @return return avatar
     */

    @GetMapping("/get/avatar")
    public ResponseEntity<byte[]> getImageAvatarUserConnected() throws IOException {
        User user = authController.getUserConnected();
        Optional<Avatar> avatarUserConnected = avatarRepository.findByUserId(user.getId());
        if (avatarUserConnected.isPresent()) {
            Avatar avatar = avatarUserConnected.get();
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(avatar.getType()))
                    .body(avatar.getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}