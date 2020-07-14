package com.upgrad.eshop.product;

import com.upgrad.eshop.product.search.SearchRequest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static testutils.PagingHelper.getFirstSortedProperty;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class ProductControllerIntegrationTest {

    @Autowired
    ProductController productController;


    @Autowired
    ProductService productService;

    private static final Logger log = LoggerFactory.getLogger(ProductControllerIntegrationTest.class);

    @Test
    public void whenSearchCalledWithEmptyParametersItShouldReturnProductsOfPageSizeTen() {

        Page<Product> products = productController.search(new SearchRequest());

        assertThat(products.get().count(), equalTo(10L));

        assertThat(getFirstSortedProperty(products.getPageable()), equalTo("updated"));
        int totalElements = Math.toIntExact(products.getTotalElements());
        log.info("Total Elements " + totalElements);
        log.info("Total Pages " + products.getTotalPages());

        List<Product> actualTotalProducts = productService.findAll();
        assertThat(totalElements, equalTo(actualTotalProducts.size()));
    }



    @Test
    public void whenSearchCalledWithEmptyParametersItShouldProvideAbilityToPagination() {

        SearchRequest searchRequest = new SearchRequest();
        Page<Product> pageableProducts = productController.search(searchRequest);

        assertThat(pageableProducts.get().count(), greaterThanOrEqualTo(10L));
        assertThat(pageableProducts.getPageable().getPageNumber(), equalTo(searchRequest.getPageNo()));

        List<Product> firstPageProducts = pageableProducts.getContent();

        log.info("firstPageProducts" + firstPageProducts.toString());

        searchRequest.setPageNo(pageableProducts.getPageable().getPageNumber() + 1);
        searchRequest.setPageSize(pageableProducts.getPageable().getPageSize());

        Page<Product> nextPageableProducts = productController.search(searchRequest);


        List<Product> nextPageProducts = nextPageableProducts.getContent();
        log.info("nextPageProducts" + nextPageProducts.toString());
        assertThat(nextPageableProducts.getPageable().getPageNumber(), equalTo(searchRequest.getPageNo()));
        assertThat(firstPageProducts, is(not(equalTo(nextPageProducts))));


    }


    @Test
    public void whenSearchCalledWithSearchableCategoryItShouldResultInPrdouctsWIthSameCategory() {


        String petSupplies = "Pet Supplies";

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setCategory(petSupplies);

        Page<Product> pageableProducts = productController.search(searchRequest);

        List<Product> firstPageProducts = pageableProducts.getContent();

        assertThat(firstPageProducts.size(), greaterThanOrEqualTo(2));

        List<Product> productsWithCategory = firstPageProducts.stream()
                .filter(product -> product.getCategory().equals(petSupplies))
                .collect(Collectors.toList());

        assertThat(firstPageProducts, is(equalTo(productsWithCategory)));


    }


    @Test
    public void whenSearchCalledWithSearchableNameItShouldResultInProductsWithContainingName() {


        String name = "Shorts";

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setName(name);

        Page<Product> pageableProducts = productController.search(searchRequest);

        List<Product> firstPageProducts = pageableProducts.getContent();

        assertThat(firstPageProducts.size(), greaterThanOrEqualTo(2));

        List<Product> productsWithName = firstPageProducts.stream()
                .filter(product -> product.getName().contains(name))
                .collect(Collectors.toList());

        assertThat(firstPageProducts, is(equalTo(productsWithName)));


    }

    @Test
    public void whenSearchCalledWithSearchableNameAndRatingItShouldResultInProductsWithContainingNameAndRatingValueGreaterThanOrEqualToInput() {


        String name = "Shorts";

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setName(name);
        double overAllRating = 3.0D;
        searchRequest.setOverAllRating(overAllRating);

        List<Product> firstPageProducts = productController.search(searchRequest).getContent();

        assertThat(firstPageProducts.size(), greaterThanOrEqualTo(1));

        List<Product> productsWithNameAndRating = firstPageProducts.stream()
                .filter(product -> product.getName().contains(name))
                .filter(product -> product.getOverAllRating() >= overAllRating)
                .collect(Collectors.toList());

        assertThat(firstPageProducts, is(equalTo(productsWithNameAndRating)));


    }

    @Test
    public void whenSearchCalledWithSearchableNameItShouldResultInProductsTheResultsShouldBeCaseInsensitive() {


        String name = "Shorts";

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setName(name);
        double overAllRating = 3.0D;
        searchRequest.setOverAllRating(overAllRating);

        List<Product> products = productController.search(searchRequest).getContent();



        searchRequest.setName(name.toLowerCase());

        List<Product> productsWithDifferentCase = productController.search(searchRequest).getContent();


        assertThat(products.size(),equalTo(productsWithDifferentCase.size()));



    }

    @Test
    public void whenGetCategoriesCalledItShouldResultInDistinctCategories() {



        List<String> categories = productController.getCategories();


        log.info(categories.toString());

        assertThat(categories.size(),greaterThan(0));



    }



}