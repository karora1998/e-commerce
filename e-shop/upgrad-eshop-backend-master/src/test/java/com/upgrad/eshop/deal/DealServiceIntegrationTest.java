package com.upgrad.eshop.deal;

import com.upgrad.eshop.deal.models.DealRequest;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.product.Product;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import testutils.IntegrationTestRunner;

import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class DealServiceIntegrationTest extends IntegrationTestRunner {

    @Autowired
    DealService dealService;

    @Autowired
    MockDataGenerator mockDataGenerator;

    @Test
    public void whenDealIsAddedToAProductExpectSuccesfullyAdded() {

        Product product = getFirstProduct();
        double dealPrice = product.getPrice() - 12;

        Deal deal = createProductDealWith(product, dealPrice);
        assertNotNull(deal);
        assertThat(deal.getProduct().getProductId(), equalTo(product.getProductId()));
        assertThat(deal.getProduct().getDealPrice(), equalTo(dealPrice));


    }

    private Product getFirstProduct() {
        return mockDataGenerator.getFirstProduct();
    }

    @Test
    public void whenDealIsAddedWithHigherPriceItShouldThrowException() {

        Product product = getFirstProduct();
        double dealPrice = product.getPrice() + 12;
        DealRequest dealRequest = createDealRequestWith(product, dealPrice);

        assertThrows(AppException.class, () -> {
            dealService.addDeal(dealRequest);
        });


    }

    @Test
    public void whenUpdateDealIsCalledItShouldUpdateTheDeal() {

        Product product = getFirstProduct();
        double dealPrice = product.getPrice() - 12;

        Deal deal = createProductDealWith(product, dealPrice);

        assertNotNull(deal);
        double updatedDealPrice = product.getPrice() - 24;
        DealRequest anotherDealRequest = createDealRequestWith(product, updatedDealPrice);

        Deal updatedDeal = dealService.updateDeal(anotherDealRequest);
        assertNotNull(updatedDeal);
        assertThat(deal.getId(), equalTo(updatedDeal.getId()));
        assertThat(updatedDeal.getDealPrice(), equalTo(updatedDealPrice));
        assertThat(updatedDeal.getProduct().calculatedPrice(), equalTo(updatedDealPrice));

    }

    @Test
    public void whenDeleteDealIsCalledItShouldDeleteTheDeal() {

        Product product = getFirstProduct();
        double dealPrice = product.getPrice() - 12;

        Deal deal = createProductDealWith(product, dealPrice);

        assertNotNull(deal);

        dealService.removeDeal(product.getProductId());


        Optional<Deal> removedElement = dealService.getProductDealFor(product);
        assertFalse(removedElement.isPresent());

        Optional<Product> productToBeChecked = productService.getProductById(product.getProductId());

        assertNotNull(productToBeChecked);
        Product retrievedProduct = productToBeChecked.get();
        assertThat(retrievedProduct.getProductId(), equalTo(product.getProductId()));
        assertThat(retrievedProduct.getDealPrice(), equalTo(0.0));

    }

    Deal createFirstDeal() {
        Product product = getFirstProduct();
        double dealPrice = product.getPrice() - 12;
        return createProductDealWith(product, dealPrice);
    }

    Deal createProductDealWith(Product product, double dealPrice) {
        DealRequest dealRequest = createDealRequestWith(product, dealPrice);
        return dealService.addDeal(dealRequest);
    }

    private DealRequest createDealRequestWith(Product product, double dealPrice) {
        DealRequest dealRequest = new DealRequest();
        dealRequest.setProductId(product.getProductId());
        dealRequest.setPrice(dealPrice);
        return dealRequest;
    }
}