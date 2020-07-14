package com.upgrad.eshop.users;

import com.upgrad.eshop.auth.models.RegisterRequest;
import com.upgrad.eshop.users.roles.RoleService;
//All Unit tests will use Core Junit Test
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {


    @InjectMocks
    UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    RoleService roleService;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final Logger log = LoggerFactory.getLogger(UserServiceTest.class);

    @Test
    public void whenUserDoesNotExistThenRegisteredUserShouldBeSaved() {

        RegisterRequest registerRequestWith = RegisterRequest.createRegisterRequestWith("testUser", "pass");

        when(userRepository.save(any())).thenReturn(new User());

        userService.addAdmin(registerRequestWith);

        verify(userRepository).save(any());
        verify(bCryptPasswordEncoder, times(1)).encode(any());

    }

}