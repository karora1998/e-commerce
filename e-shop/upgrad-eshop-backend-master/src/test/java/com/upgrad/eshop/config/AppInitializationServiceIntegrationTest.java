package com.upgrad.eshop.config;


import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.product.search.SearchRequest;
import com.upgrad.eshop.users.UserService;
import com.upgrad.eshop.users.roles.RoleService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class AppInitializationServiceIntegrationTest {

    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;


    @Test
    public  void ProductsShouldNotBeEmptyAfterInitialization(){

        assertThat(productService.findAll().size(),greaterThan(2));



    }
    @Test
    public  void carlton_london_bootsShouldHave25ProductsByDefault(){

        String carlton_london_boots = "Corporate Casuals";
        SearchRequest searchRequest= new SearchRequest();
        searchRequest.setName(carlton_london_boots);
        List<Product> carlton_london_bootsProducts = productService.search(searchRequest).getContent();
        assertNotNull(carlton_london_bootsProducts);
      Product  carlton_london_bootsProduct=carlton_london_bootsProducts.get(0);
        assertThat(carlton_london_bootsProduct.getAvailableItems(),equalTo(25));


    }

    @Test
    public  void NumberOfUsersShouldBeGreaterThanOrEqualToThree(){

        assertThat(userService.findAll().size(),greaterThanOrEqualTo(3));

    }

    @Test
    public  void NumberOfRolesShouldBeThree(){

        assertThat(roleService.findAll().size(),equalTo(3));

    }

}