package com.upgrad.eshop.product;


import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.product.models.ProductRequest;
import com.upgrad.eshop.product.search.SearchRequest;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import testutils.IntegrationTestRunner;

import javax.annotation.PostConstruct;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class ProductControllerFeatureTest extends IntegrationTestRunner {


    @Autowired
    MockDataGenerator mockDataGenerator;

    String name = "Alisha Solid Women s Cycling Shorts";
    String category = "Clothing";
    double price = 999;
    String description = "Key Features of Alisha Solid Women s Cycling Shortorts";
    String manufacturer = "Alisha";
    int availableItems = 25;
    String imageUrl = "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg";




    // Add Product

    private static final Logger log = LoggerFactory.getLogger(ProductControllerFeatureTest.class);


    @Test
    public void registeringWithNewProductShouldCreateNewProduct() {
        String  adminToken = getAdminToken();

        ProductRequest productRequest = new ProductRequest(name, category, price, description, manufacturer, availableItems, imageUrl);

        Product newProduct = postEntityWithToken("/products", adminToken, Product.class, productRequest);
        log.info(newProduct.toString());
        assertNotNull(newProduct);
        assertThat(newProduct.getName(), equalTo(name));
        assertThat(newProduct.getAvailableItems(), equalTo(availableItems));


    }

    private String getAdminToken() {
        return mockDataGenerator.getAdminToken();
    }


    @Test
    public void registeringWithNewProductWithEmptyNameShouldThrowException() {

        String  adminToken = getAdminToken();
        name = "";

        ProductRequest productRequest = new ProductRequest(name, category, price, description, manufacturer, availableItems, imageUrl);


        Throwable throwable = assertThrows(RuntimeException.class, () -> {
            postEntityWithToken("/products", adminToken, Product.class, productRequest);
        });

        log.info(throwable.getMessage(), throwable);
        assertThat(throwable.getMessage(), containsString("name"));

    }


    @Test
    public void updatingProductShouldUpdateTheProductDetails() {

        String  adminToken = getAdminToken();
        String newlyCreatedProductName = "newly-created-product-1";

        ProductRequest productRequest = new ProductRequest(newlyCreatedProductName, category, price, description, manufacturer, availableItems, imageUrl);

        Product newProduct = postEntityWithToken("/products", adminToken, Product.class, productRequest);

        log.info("newProduct  " + newProduct.toString());

        assertNotNull(newProduct);
        assertThat(newProduct.getName(), equalTo(newlyCreatedProductName));

        Long newlyCreatedProductId = newProduct.getProductId();
        String updatedProductName = "updated-product-1";


        ProductRequest updatedProductRequest = new ProductRequest();
        updatedProductRequest.setName(updatedProductName);

        Product updatedProduct = putWithToken("/products/" + newlyCreatedProductId, adminToken, Product.class, updatedProductRequest);

        log.info("updatedProduct  " + updatedProduct.toString());

        assertNotNull(updatedProduct);
        assertThat(updatedProduct.getName(), equalTo(updatedProductName));
        assertThat(updatedProduct.getUpdated(), not(equalTo(newProduct.getUpdated())));

        assertUpdatedNotChangeExistingAttributes(newProduct, updatedProduct);


    }

    private void assertUpdatedNotChangeExistingAttributes(Product newProduct, Product updatedProduct) {
        assertThat(updatedProduct.getCategory(), equalTo(newProduct.getCategory()));
        assertThat(updatedProduct.getManufacturer(), equalTo(newProduct.getManufacturer()));
        assertThat(updatedProduct.getPrice(), equalTo(newProduct.getPrice()));
        assertThat(updatedProduct.getDescription(), equalTo(newProduct.getDescription()));
        assertThat(updatedProduct.getCreated(), equalTo(newProduct.getCreated()));
    }

    //Find Product By ID

    @Test
    public void FindingProductByIdShouldReturnProductDetails() {
        String  adminToken = getAdminToken();
        String newlyCreatedProductName = "findable-product-1";

        ProductRequest productRequest = new ProductRequest(newlyCreatedProductName, category, price, description, manufacturer, availableItems, imageUrl);

        Product newProduct = postEntityWithToken("/products", adminToken, Product.class, productRequest);

        log.info("newProduct  " + newProduct.toString());

        assertNotNull(newProduct);
        assertThat(newProduct.getName(), equalTo(newlyCreatedProductName));

        Long newlyCreatedProductId = newProduct.getProductId();


        Product retrievedProduct = getAsObject("/products/" + newlyCreatedProductId, Product.class);

        log.info("retrievedProduct  " + retrievedProduct.toString());

        assertNotNull(retrievedProduct);
        assertThat(retrievedProduct.getName(), equalTo(newProduct.getName()));
        assertThat(retrievedProduct.getProductId(), equalTo(newProduct.getProductId()));


    }

    //Find Product By ID

    @Test
    public void FindingProductByInValidIdShouldThrowException() throws Exception {


        Long invalidProductId = -1L;

        assertThrows(RuntimeException.class, () -> {
                getAsObject("/products/" + invalidProductId, Product.class);

        });


    }

    //Delete Product

    @Test
    public void DeletingProductByIdShouldDeleteProduct() {

        String  adminToken = getAdminToken();
        String deletableProductName = "deletable-product-1";

        ProductRequest productRequest = new ProductRequest(deletableProductName, category, price, description, manufacturer, availableItems, imageUrl);

        Product deletableProduct = postEntityWithToken("/products", adminToken, Product.class, productRequest);


        assertNotNull(deletableProduct);
        assertThat(deletableProduct.getName(), equalTo(deletableProductName));

        Long deletableProductId = deletableProduct.getProductId();


        String result = deleteWithToken("/products/" + deletableProductId, adminToken, String.class, null);

        log.info("Deleted result  " + result);

        assertNotNull(result);


        assertThrows(RuntimeException.class, () -> {
          getAsObject("/products/" + deletableProductId, Product.class);

        });


    }

    @Test
    public void DeletingInvalidProductIdShouldThrowException() {

        String  adminToken = getAdminToken();
        Long deletableProductId = -26L;

        assertThrows(RuntimeException.class, () -> {

            deleteWithToken("/products/" + deletableProductId, adminToken, String.class, null);
        });


    }



}