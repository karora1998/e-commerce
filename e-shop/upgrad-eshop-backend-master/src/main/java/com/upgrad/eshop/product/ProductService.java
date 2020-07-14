package com.upgrad.eshop.product;

import java.util.List;
import java.util.Optional;


import com.upgrad.eshop.product.models.ProductRequest;
import com.upgrad.eshop.product.search.SearchRequest;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;

import static com.upgrad.eshop.utils.StringValidator.isNotEmptyOrNull;

@Service
@Validated
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    private static Logger logger = LoggerFactory.getLogger(ProductService.class);


    public List<Product> findAll() {

        return productRepository.findAll();
    }


    public Optional<Product> getProductById(Long id) {

        return productRepository.findById(id);
    }



    public Product addProduct(ProductRequest productRequest) {

        return saveProduct(createProductFrom(productRequest));

    }

    public Product createProductFrom(ProductRequest productRequest) {
        Product product = new Product();
         createProductFrom(product, productRequest);
         return product;
    }

    public void createProductFrom(Product existingProduct, ProductRequest productRequest) {

        if (isNotEmptyOrNull(productRequest.getName()))
            existingProduct.setName(productRequest.getName());


        if (isNotEmptyOrNull(productRequest.getAvailableItems()))
            existingProduct.setAvailableItems(productRequest.getAvailableItems());


        if (isNotEmptyOrNull(productRequest.getCategory()))
            existingProduct.setCategory(productRequest.getCategory());

        if (isNotEmptyOrNull(productRequest.getDescription()))
            existingProduct.setDescription(productRequest.getDescription());


        if (isNotEmptyOrNull(productRequest.getManufacturer()))
            existingProduct.setManufacturer(productRequest.getManufacturer());

        if (isNotEmptyOrNull(productRequest.getImageUrl()))
            existingProduct.setImageUrl(productRequest.getImageUrl());

        if (productRequest.getPrice() > 0)
            existingProduct.setPrice(productRequest.getPrice());



    }

    public Product updateOverAllRating(Product product,Double overAllRating){

        product.setOverAllRating(overAllRating);
        return saveProduct(product);
    }

    public Product saveProductFromRequest(Product product, ProductRequest productRequest) {

         createProductFrom(product, productRequest);
        return saveProduct(product);

    }

    @Transactional
    public Product saveProduct(@Valid Product result) {


       Product savedProduct = productRepository.save(result);

        return savedProduct;
    }


    @Transactional
    public Product setDealForProduct(Product product, Double dealPrice) {
        product.setDealPrice(dealPrice);
        return saveProduct(product);
    }

    public Product removeProductDeal(Product product) {
        product.setDealPrice(0L);
        return saveProduct(product);
    }

    public Product updateProduct(Long id, ProductRequest productRequest) {

        return productRepository.findById(id)
                .map(product -> {
                    product.markForUpdate();
                    return saveProductFromRequest(product, productRequest);
                })
                .orElseThrow(() -> new AppException("Invalid Product Id"));
    }


    public Product removeItems(Long id, Integer count) {

        return productRepository.findById(id)
                .map(product -> {
                    product.setAvailableItems(product.getAvailableItems()- count);
                    return saveProduct(product);
                })
                .orElseThrow(() -> new AppException("Invalid Product Id to removeItemsFromStock"));
    }


    public boolean canPurchaseItems(Long id, Integer count) {

        return productRepository.findById(id)
                .map(product -> product.getAvailableItems() > count)
                .orElseThrow(() -> new AppException("Invalid Product Id to check hasItemsInStockOn"));
    }

    @Transactional
    public void removeProduct(Long itemId) {

        //We should just remove available items , so that the product wont be displayed
        //Deleting product requires removing it from existing order as well, which is a bad design
        getProductById(itemId).ifPresent(product -> {
            product.setAvailableItems(0);
            saveProduct(product);
        });

    }

    public Page<Product> search(SearchRequest input) {
        return productRepository.searchProduct(input);
    }


    @Transactional
    public List<Product>  addAll(List<Product> products) {

      return productRepository.saveAll(products);
    }


    public Product getProductByName(String productName) {
        return productRepository.findByName(productName).
                stream()
                .findFirst()
                .orElseGet(null);

    }


    public List<String> getAllCategories() {
        return productRepository.findDistinctCategories();
    }
}
