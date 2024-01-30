package fr.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fr.entity.User;
import fr.helper.JwtUtils;
import fr.service.UserService;

// AuthController :
// - gère les requêtes Post d'authentification, 
// - récupère, grâce aux  informations d'authentification, l'utilisateur, 
// - génère et renvoit un jeton JWT

@Controller
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, ?> doAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = user.securityUser().getAuthorities().stream()
                .map(authority -> authority.getAuthority()).toList();
        String token = jwtUtils.generateToken(user.getEmail(), rolesNames);

        userService.updateUser(user);

        return Map.of("token", token);
    }

    // TODO Verifier l'utilité auprès de Louis, sinon à suppr
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String, ?> testAuth() {
        return Map.of("success", true);
    }

    public User getUserConnected() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                return user;
    }
}
