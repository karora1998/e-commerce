package com.upgrad.eshop.mocks;

import com.upgrad.eshop.auth.AuthController;
import com.upgrad.eshop.auth.models.LoginResponse;
import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.coupon.CouponService;
import com.upgrad.eshop.coupon.models.CouponRequest;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.product.models.ProductRequest;
import com.upgrad.eshop.product.search.SearchRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import com.upgrad.eshop.users.address.ShippingAddressRequest;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import static com.upgrad.eshop.auth.models.LoginRequest.createLoginRequestWith;
import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;

@Service
public class MockDataGenerator {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    AuthController authController;

    @Autowired
    CouponService couponService;

    public MockDataGenerator(ProductService productService) {
        this.productService = productService;
    }

    public Product getFirstProduct() {
        return getProductByName("Alisha Solid Women s Cycling Shorts");
    }

    private Product getProductByName(String name) {
        SearchRequest input = new SearchRequest();
        input.setName(name);

        Page<Product> products = productService.search(input);
        return products.getContent().get(0);

    }

    public Product getSecondProduct() {
        return getProductByName("FabHomeDecor Fabric Double Sofa Bed");
    }


    private String getRandomCode() {
        return RandomStringUtils.random(6, true, true);
    }

    public Product getRandomProduct() {

        return getRandomProductWithAmount(1000);
    }
    public Product getRandomProductWithAmount(double price) {

        String name = "Alisha Solid Women s Cycling Shorts" + getRandomCode();
        String category = "Clothing";

        String description = "Key Features of Alisha Solid Women s Cycling Shortorts";
        String manufacturer = "Alisha";
        int availableItems = 25;
        String imageUrl = "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg";

        ProductRequest productRequest = new ProductRequest(name, category, price, description, manufacturer, availableItems, imageUrl);
        return productService.addProduct(productRequest);
    }

    public String getAdminToken() {
        String testuser = "admin";
        String password = "password";
        return loginWith(testuser, password);
    }

    public String getUserToken() {
        String testuser = "user";
        String password = "password";
        return loginWith(testuser, password);
    }


    public String loginWith(String testuser, String password) {


        ResponseEntity<?> loggedInAdminResponse = authController.login(createLoginRequestWith(testuser, password));
        LoginResponse loginResponse = (LoginResponse) loggedInAdminResponse.getBody();
        return loginResponse.getToken();

    }

    public User createUser(String testuser, String password) {
        User testUser = userService.findByUserName(testuser);
        if (null == testUser)
            testUser = userService.addUser(createRegisterRequestWith(testuser, password));

        return testUser;
    }

    public Coupon createCouponForAmount(long amount) {
        CouponRequest couponRequest= new CouponRequest();
        couponRequest.setAmount(amount);
        return couponService.addCoupon(couponRequest);

    }


    public ShippingAddressRequest getShippingAddressRequestForName(String name) {
        ShippingAddressRequest shippingAddressRequest = new ShippingAddressRequest();
        shippingAddressRequest.setCity("WinterFell");
        shippingAddressRequest.setLandmark("Castle");
        shippingAddressRequest.setName(name);
        shippingAddressRequest.setPhone("78121545");
        shippingAddressRequest.setStreet("The Castle Street");
        shippingAddressRequest.setState("The North");
        shippingAddressRequest.setZipcode("4823873");
        return shippingAddressRequest;
    }

}
