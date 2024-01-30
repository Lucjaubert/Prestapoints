package fr.config;

import static org.springframework.http.HttpMethod.GET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import java.util.Arrays;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import fr.service.SecurityUserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private SecurityUserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder);
    }

    public WebSecurityConfig(SecurityUserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Profile("tests")
    @Bean
    public SecurityFilterChain filterChain2(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter)
            throws Exception {
        System.out.println("Security test configuration");
        http.csrf().disable();
        http.authorizeHttpRequests()
                .anyRequest().permitAll();

        return http.build();
    }

    @Profile("!tests")
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter)
            throws Exception {
        http.httpBasic();
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable();
        http.headers().frameOptions().disable(); // à voir avec Louis pourquoi conserver disable ligne 45-46
        http.cors() // CORS is configured just under
                .and()
                .authorizeHttpRequests()
                .requestMatchers(GET, "/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/prestations/**").hasAuthority("ROLE_USER") // qui restreint les routes
                .requestMatchers(
                        "/api/v1/auth/",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/",
                        "/swagger-resources",
                        "/swagger-resources/",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/",
                        "/webjars/**",
                        "/swagger-ui.html")
                .permitAll()
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/public/logout")) // TODO à faire
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/public/index") // TODO changer l'url et/ou à créer
                .deleteCookies("JSESSIONID");

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(
                Arrays.asList("http://localhost:4200", "https://staging.prestapoints.lille-1.wilders.dev", "**"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Accept",
                "Cache-Control",
                "Content-Type",
                "Origin",
                "x-csrf-token",
                "x-requested-with"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoOverride();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder);

        return authProvider;
    }
}
