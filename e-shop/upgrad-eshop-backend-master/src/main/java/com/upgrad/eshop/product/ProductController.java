package com.upgrad.eshop.product;


import com.upgrad.eshop.exception.UpgradResponseStatusException;
import com.upgrad.eshop.product.models.ProductRequest;
import com.upgrad.eshop.product.search.SearchRequest;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import java.util.List;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;


    @GetMapping
    public Page<Product> search(SearchRequest searchRequest) {

        return productService.search(searchRequest);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {

        return productService.getAllCategories();
    }


    @GetMapping("/{id}")
    public Product getItemById(@PathVariable Long id)  {

        return productService.getProductById(id).orElseThrow(() -> asNoContent("No Product Found for Id" + id));

    }


    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    @PostMapping
    public Product addItem(@RequestBody ProductRequest product) {
        try {
            log.info("product addItem ");
            Product result = productService.addProduct(product);

            log.info("product added " + result.toString());
            return result;
        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            throw asConstraintViolation(e);
        }

    }


    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    @PutMapping("/{id}")
    public Product updateItem(@PathVariable Long id, @RequestBody ProductRequest product) {

        try {
            Product result = productService.updateProduct(id, product);
            log.info("product updated " + result.toString());
            return result;
        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }


    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Long id) {

        try {
            productService.removeProduct(id);
            return ResponseEntity.ok("Successfully Deleted");
        } catch (Exception e) {
            throw UpgradResponseStatusException.asBadRequest("Invalid Product Id");
        }

    }

}
