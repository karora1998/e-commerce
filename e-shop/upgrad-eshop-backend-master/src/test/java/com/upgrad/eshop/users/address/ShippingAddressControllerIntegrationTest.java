package com.upgrad.eshop.users.address;

import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserController;
import com.upgrad.eshop.users.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.PostConstruct;

import java.util.List;

import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class ShippingAddressControllerIntegrationTest {


    public static final String TEST_USER_SHIPPING = "test-user-shipping";
    @Autowired
    ShippingAddressController shippingAddressController;

    @Autowired
    UserService userService;

    @Autowired
    UserController userController;


    @Autowired
    MockDataGenerator mockDataGenerator;


    @PostConstruct
    public void  insertMockUsers(){

        try {

            userService.addUser(createRegisterRequestWith(TEST_USER_SHIPPING, "password"));
        }catch (Throwable ignore){

        }
    }

    private static final Logger log = LoggerFactory.getLogger(ShippingAddressControllerIntegrationTest.class);

    @Test
    @WithUserDetails(value = "test-user-shipping")
    public void creatingNewAddressShouldSetItForUser(){

        String jon_snow = "Jon Snow";
        String arya_stark = "Arya Stark";

        ShippingAddress shippingAddress = shippingAddressController.addAddress(getShippingAddressRequestForName(jon_snow));

        log.info(shippingAddress.toString());
        String winterFell = "WinterFell";

        assertShippingAddress(jon_snow, winterFell, TEST_USER_SHIPPING, shippingAddress);


        ShippingAddress anotherShippingAddress = shippingAddressController.addAddress(getShippingAddressRequestForName(arya_stark));

        log.info(anotherShippingAddress.toString());
        assertShippingAddress(arya_stark, winterFell, TEST_USER_SHIPPING, anotherShippingAddress);


        List<ShippingAddress> shippingAddressList =shippingAddressController.findAllByUser();
        log.info(shippingAddressList.toString());
        assertThat(shippingAddressList.size(),greaterThanOrEqualTo(2));
    }

    @Test
    @WithUserDetails(value = "test-user-shipping")
    public void updateShippingAddressShouldUpdateValues(){

        String ramsay = "Ramsay";
        String sansa = "Sansa Stark";
        String winterFell = "WinterFell";


        ShippingAddress originalShippingAddress = shippingAddressController.addAddress(getShippingAddressRequestForName(ramsay));

        log.info(originalShippingAddress.toString());

        assertShippingAddress(ramsay, winterFell, TEST_USER_SHIPPING, originalShippingAddress);


        ShippingAddress updatedShippingAddress = shippingAddressController.updateAddress(originalShippingAddress.getId(),getShippingAddressRequestForName(sansa));

        log.info(updatedShippingAddress.toString());
        assertShippingAddress(sansa, winterFell, TEST_USER_SHIPPING, updatedShippingAddress);

        assertThat(updatedShippingAddress.getId(),equalTo(originalShippingAddress.getId()));

    }

    @Test
    @WithUserDetails(value = TEST_USER_SHIPPING)
    public void deleteShippingAddressShouldDeleteTheAddress(){

        String edward_stark = "Edward Stark";

        String winterFell = "WinterFell";


        ShippingAddress shippingAddress = shippingAddressController.addAddress(getShippingAddressRequestForName(edward_stark));

        log.info(shippingAddress.toString());

        assertShippingAddress(edward_stark, winterFell, TEST_USER_SHIPPING, shippingAddress);


         shippingAddressController.deleteAddress(shippingAddress.getId());


       RuntimeException exception=  assertThrows(RuntimeException.class,()->{
             shippingAddressController.findByUserAndId(shippingAddress.getId());

         });


       assertThat(exception.getMessage(),containsString("Invalid Address"));

       //Ensure User Still Exists after Deleting

        assertUserStillExistsAndNotDeleted();

    }

    private void assertUserStillExistsAndNotDeleted() {
        User user = userController.getMyDetails();
        assertThat(user.getUserName(), equalTo(TEST_USER_SHIPPING));
    }


    private void assertShippingAddress(String recepient_name, String city,String user,ShippingAddress shippingAddress) {
        assertThat(city, equalTo(city));
        assertThat(shippingAddress.getName(), equalTo(recepient_name));
        assertThat(shippingAddress.getUser().getUserName(), equalTo(user));
    }

     ShippingAddressRequest getShippingAddressRequestForName(String name) {
         return mockDataGenerator.getShippingAddressRequestForName(name);
    }
}