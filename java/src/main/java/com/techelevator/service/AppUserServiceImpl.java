package com.techelevator.service;

import com.techelevator.entity.AppUser;
import com.techelevator.entity.Role;
import com.techelevator.exception.ApiException;
import com.techelevator.exception.UserAlreadyExistsException;
import com.techelevator.model.PasswordChangeDTO;
import com.techelevator.model.RegisterUserDTO;
import com.techelevator.repo.AppUserRepo;
import com.techelevator.repo.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepo appUserRepo;

    private final RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder;

    @Override
    public AppUser getUser(String username) {
        log.info("Fetching AppUser {} from database", username);
        AppUser appUser = appUserRepo.findByUsername(username);
        if (Objects.isNull(appUser)) {
            throw new UsernameNotFoundException("User " + username + " not found.");
        }
        return appUser;
    }

    @Override
    public AppUser addRoleToAppUser(String username, String roleName) throws ApiException {
        log.info("Saving new Role {} to AppUser {}", roleName, username);
        AppUser appUser = appUserRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        for (Role userRole : appUser.getAppUserRoles()) {
            if (role == userRole) {
                log.warn("User {} already has role {}", username, role.getName());
                throw new ApiException("User already has that role");
            }
        }
        appUser.getAppUserRoles().add(role);
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser addUser(AppUser appUser) {
        log.info("Saving new AppUser {} to the database", appUser.getUsername());
        AppUser userFound = appUserRepo.findByUsername(appUser.getUsername());
        if (Objects.nonNull(userFound)) {
            throw new UserAlreadyExistsException();
        }
        return appUserRepo.save(appUser);
    }

    @Override
    public AppUser addNewUser(RegisterUserDTO newUser) {
        log.info("Registering new user {} to the database", newUser.getUsername());
        Role userRole = roleRepo.findByName("ROLE_USER");
        AppUser userFound = appUserRepo.findByUsername(newUser.getUsername());
        if (Objects.nonNull(userFound)) {
            throw new UserAlreadyExistsException();
        }
        AppUser appUser = AppUser.builder()
                .username(newUser.getUsername())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .activated(true)
                .build();

        this.addUser(appUser);

        userRole.getAppUserRoles().add(appUser);

        roleRepo.save(userRole);

        return appUserRepo.save(appUser);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all AppUsers from database");
        return appUserRepo.findAll();
    }

    @Override
    @Transactional
    public Boolean changePassword(String username, PasswordChangeDTO passwordChangeDTO) {
        AppUser appUser = getUser(username);
        if (passwordEncoder.matches(passwordChangeDTO.getOldPassword(), appUser.getPassword())) {
            appUser.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public Boolean deleteUser(String username) {
        AppUser appUser = appUserRepo.findByUsername(username);
        for (Role role : appUser.getAppUserRoles()) {
            role.getAppUserRoles().remove(appUser);
            roleRepo.save(role);
        }
        appUserRepo.deleteById(appUser.getId());
        AppUser appUserFound = appUserRepo.findByUsername(username);
        if (Objects.isNull(appUserFound)) {
            return true;
        }
        return false;
    }
}
