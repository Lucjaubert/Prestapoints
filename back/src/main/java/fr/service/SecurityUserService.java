package fr.service;

import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fr.entity.User;
import fr.repository.UserRepository;

@Service
public class SecurityUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(
                    MessageFormat.format("L'utilisateur avec l'email {0} n'existe pas.", email)));

            return user.securityUser();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

}