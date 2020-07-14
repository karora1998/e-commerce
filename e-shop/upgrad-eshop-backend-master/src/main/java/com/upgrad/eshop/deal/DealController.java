package com.upgrad.eshop.deal;

import com.upgrad.eshop.deal.models.DealRequest;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.utils.PaginationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;


@RestController
@RequestMapping("/deals")
public class DealController {

    @Autowired
    private DealService dealService;


    @GetMapping
    public Page<Deal> getDeals(PaginationRequest paginationRequest) {

        return dealService.getDeals(paginationRequest);


    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public Deal addDeal(@RequestBody DealRequest dealRequest) {

        try {
            return dealService.addDeal(dealRequest);
        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            throw asConstraintViolation(e);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }

    }


    @DeleteMapping("/{productId}")
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public void removeDeal(@PathVariable Long productId) {

        try {
            dealService.removeDeal(productId);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }


    @PutMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public Deal updateDeal(@RequestBody DealRequest dealRequest) {

        try {
            return dealService.updateDeal(dealRequest);

        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            throw asConstraintViolation(e);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }


    }


}
