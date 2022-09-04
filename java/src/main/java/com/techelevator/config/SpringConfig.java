package com.techelevator.config;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Recipe;
import com.techelevator.entity.Role;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.repo.RoleRepo;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import com.techelevator.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class SpringConfig {

    @Autowired
    private RoleRepo roleRepo;

    @Bean
    CommandLineRunner run(AppUserService appUserService, RoleService roleService, RecipeService recipeService) {
        return args -> {

            roleService.saveRole(new Role(null, "ROLE_USER"));
            roleService.saveRole(new Role(null, "ROLE_ADMIN"));
            roleService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            Role userRole = roleRepo.findByName("ROLE_USER");

            AppUser eddie = AppUser.builder()
                    .username("eddie")
                    .password("12345")
                    .activated(true)
                    .roles(List.of(userRole))
                    .build();

            appUserService.saveUser(eddie);

            Recipe newRecipe = Recipe.builder()
                    .title("New recipe")
                    .description("Recipe description")
                    .servings(1)
                    .image_url("https://www.google.com")
                    .appUser(eddie)
                    .build();

//            recipeService.saveRecipe(newRecipe);
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}