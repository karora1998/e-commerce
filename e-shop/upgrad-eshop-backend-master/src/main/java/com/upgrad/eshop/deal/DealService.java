package com.upgrad.eshop.deal;

import com.upgrad.eshop.deal.models.DealRequest;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.utils.PaginationRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Optional;

@Service
@Validated
public class DealService {


    private DealRepository dealRepository;

    private ProductService productService;


    public DealService(DealRepository dealRepository, ProductService productService) {
        this.dealRepository = dealRepository;
        this.productService = productService;
    }

    public Page<Deal> getDeals(PaginationRequest paginationRequest) {
        return dealRepository.findAll(paginationRequest.asPageable());


    }

    public Deal addDeal(@Valid DealRequest dealRequest) {
        return productService.getProductById(dealRequest.getProductId())
                .map(product -> addDeal(product, dealRequest.getPrice()))
                .orElseThrow(() -> new AppException("Invalid Product Id"));

    }

    private Deal addDeal(Product product, Double dealPrice) {

        if (product.getPrice() < dealPrice)
            throw new AppException("Deal Price Should be Lower than Product Price");


        Optional<Deal> existingProductDeal = getProductDealFor(product);

        if (existingProductDeal.isPresent())
            return updateDeal(existingProductDeal.get(), product, dealPrice);

        Product updatedProduct = productService.setDealForProduct(product, dealPrice);
        Deal deal = new Deal();
        return saveProductDeal(deal, updatedProduct, dealPrice);


    }

    private Deal saveProductDeal(Deal deal, Product updatedProduct, Double dealPrice) {
        deal.setProduct(updatedProduct);
        deal.setDealPrice(dealPrice);
        return saveDeal(deal);
    }


    @Transactional
    public Deal saveDeal(Deal deal) {
        return dealRepository.save(deal);
    }

    public Deal updateDeal(@Valid DealRequest dealRequest) {

        return updateDeal(dealRequest.getProductId(), dealRequest.getPrice());
    }

    public Deal updateDeal(Long productId, Double dealPrice) {
        Product product = productService.getProductById(productId)
                .orElseThrow(() -> new AppException("Invalid Product Id"));

        Deal deal = getProductDealFor(product)
                .orElseThrow(() -> new AppException("Invalid Product Id"));
        return updateDeal(deal, product, dealPrice);
    }

    private Deal updateDeal(Deal deal, Product product, Double dealPrice) {

        Product updatedProduct = productService.setDealForProduct(product, dealPrice);
        return saveProductDeal(deal, updatedProduct, dealPrice);
    }


    public void removeDeal(Long productId) {
        Product product = productService.getProductById(productId)
                .orElseThrow(() -> new AppException("Invalid Product Id"));

        Deal deal = dealRepository.findOneByProduct(product)
                .orElseThrow(() -> new AppException("Invalid Product Id"));

        productService.removeProductDeal(product);
        removeProductDeal(deal.getId());

    }

    @Transactional
    void removeProductDeal(Long productDealId) {
        dealRepository.deleteById(productDealId);
    }


    public Optional<Deal> getProductDealFor(Product product) {
        return dealRepository.findOneByProduct(product);
    }

}
