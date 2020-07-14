package com.upgrad.eshop.users;

import com.upgrad.eshop.auth.models.RegisterRequest;
import com.upgrad.eshop.users.models.UpdateUserDetailRequest;
import com.upgrad.eshop.users.roles.Role;
import com.upgrad.eshop.users.roles.RoleService;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import static com.upgrad.eshop.utils.StringValidator.isNotEmptyOrNull;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final Logger log = LoggerFactory.getLogger(UserService.class);



    @Cacheable("user")
    public User findByUserName(String userName) {

        return userRepository.findByUserName(userName);

    }

    public boolean isUserNameAlreadyRegistered(String userName) {
        User user = findByUserName(userName);
        return (null != user);
    }

    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userRepository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }




    @Transactional
    @CacheEvict("user")
    public void delete(String userName) {


        userRepository.deleteByUserName(userName);
    }


    public User findById(Long id) {
        return userRepository.findById(id).get();
    }


    public User addUser(RegisterRequest user) {


        return addUserWithRole(user, roleService.getForUser());
    }

    public User addInventoryManager(RegisterRequest user) {

        return addUserWithRole(user, roleService.getForInventoryManager());
    }

    public User addAdmin(RegisterRequest user) {

        return addUserWithRole(user, roleService.getForAdmin());
    }


    public User addUserWithRole(RegisterRequest user, Role role) {

        if (isUserNameAlreadyRegistered(user.getUserName()))
            throw new AppException("Username already exists");

        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setPassword(toEncrypted(user.getPassword()));
        newUser.setRoles(getRolesForUser(role));
        newUser.setCreated(LocalDateTime.now());
        newUser.setUpdated(LocalDateTime.now());


        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPhoneNumber(user.getPhoneNumber());

        User updatedUser = saveUser(newUser);
        log.info("addUserWithRole" + updatedUser.toString());

        return updatedUser;


    }

    @CachePut(value = "user")
    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User updateUserDetails(User user, UpdateUserDetailRequest updateUserDetailRequest) {

        log.info("updateUserDetailRequest" + updateUserDetailRequest.toString());

        if(isNotEmptyOrNull(updateUserDetailRequest.getFirstName()))
            user.setFirstName(updateUserDetailRequest.getFirstName());

        if(isNotEmptyOrNull(updateUserDetailRequest.getLastName()))
            user.setLastName(updateUserDetailRequest.getLastName());

        if(isNotEmptyOrNull(updateUserDetailRequest.getEmail()))
            user.setEmail(updateUserDetailRequest.getEmail());

        if(isNotEmptyOrNull(updateUserDetailRequest.getPhoneNumber()))
            user.setPhoneNumber(updateUserDetailRequest.getPhoneNumber());


        User savedUser = saveUser(user);
        log.info("updateUserDetails" + savedUser.toString());
        return savedUser;


    }

    private Set<Role> getRolesForUser(Role role) {
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        return roles;
    }


    private String toEncrypted(String password) {

        return bCryptPasswordEncoder.encode(password);
    }
}
