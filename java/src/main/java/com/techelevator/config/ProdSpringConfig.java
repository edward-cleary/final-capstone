package com.techelevator.config;

import com.techelevator.entity.Role;
import com.techelevator.repo.RoleRepo;
import com.techelevator.service.AppUserService;
import com.techelevator.service.RecipeService;
import com.techelevator.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class ProdSpringConfig {

    @Autowired
    private RoleRepo roleRepo;

    @Bean
    CommandLineRunner run(AppUserService appUserService, RoleService roleService, RecipeService recipeService) {
        return args -> {

            roleService.addRole(new Role(null, "ROLE_USER"));
            roleService.addRole(new Role(null, "ROLE_ADMIN"));
            roleService.addRole(new Role(null, "ROLE_SUPER_ADMIN"));

        };
    }
}