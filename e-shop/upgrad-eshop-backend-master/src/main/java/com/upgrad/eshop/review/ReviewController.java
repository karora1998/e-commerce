package com.upgrad.eshop.review;

import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.review.models.ReviewRequest;
import com.upgrad.eshop.review.models.ReviewsForProductRequest;
import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import java.util.List;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;


@RestController
@RequestMapping("/reviews")
public class ReviewController {


    private ReviewService reviewService;

    private UserLoggedInService userLoggedInService;

    public ReviewController(ReviewService reviewService, UserLoggedInService userLoggedInService) {
        this.reviewService = reviewService;
        this.userLoggedInService = userLoggedInService;
    }

    @GetMapping
    public Page<Review> getReviewsForPrdouct(ReviewsForProductRequest reviewsForProductRequest) {

        try {
            return reviewService.getReviewsForProduct(reviewsForProductRequest);

        } catch (
                AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @GetMapping("/{productId}")
    public List<Review> getReviewsForProduct(@PathVariable Long productId) {

        try {
            return reviewService.getReviewsForProduct(productId);

        } catch (
                AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }


    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @PostMapping
    public Review addReview(@RequestBody ReviewRequest reviewRequest) {
        try {
            User user = userLoggedInService.getLoggedInUser();
            return reviewService.addReview(user, reviewRequest);
        } catch (
                ConstraintViolationException e) {
            e.printStackTrace();
            throw asConstraintViolation(e);
        } catch (
                AppException e) {
            throw asBadRequest(e.getMessage());
        }


    }


    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @DeleteMapping("/{productId}")
    public void removeRating(@PathVariable Long productId) {
        try {
            User user = userLoggedInService.getLoggedInUser();
            reviewService.removeReview(user,productId);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }


    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @PutMapping
    public Review updateReview(@RequestBody ReviewRequest reviewRequest) {
        try {
            User user = userLoggedInService.getLoggedInUser();
            return reviewService.updateReview(user, reviewRequest);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }


    }


}
