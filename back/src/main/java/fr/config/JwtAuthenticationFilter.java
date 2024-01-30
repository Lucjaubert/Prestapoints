package fr.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import fr.helper.JwtUtils;
import fr.service.SecurityUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// JwtAuthenticationFilter
// - effectue la vérification du token JWT
// - effectue la vérification du mail utilisateur
// - charge les informations de l'authentification
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private SecurityUserService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String token = jwtUtils.getToken(request);
        log.info("le token est : " + token);

        if (token != null && jwtUtils.validateToken(token)) {
            log.info("le token est validé ");

            String email = jwtUtils.extractUsername(token);
            log.info("le username est " + email);

            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if (userDetails != null) {

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, userDetails.getAuthorities());
                log.info("authenticated user with email :{}", email);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
        }
        filterChain.doFilter(request, response);
    }

}
