package com.upgrad.eshop.review;

import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.review.models.ReviewsForProductRequest;
import com.upgrad.eshop.review.models.ReviewRequest;
import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;

import java.util.List;

import static com.upgrad.eshop.utils.StringValidator.isNotEmptyOrNull;

@Service
@Validated
public class ReviewService {


    private ReviewRepository reviewRepository;
    private ProductService productService;

    public ReviewService(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }

    public Review addReview(User user, @Valid ReviewRequest reviewRequest) {


        Long productId = reviewRequest.getProductId();

        Product product= getProduct(productId);

        if(reviewRepository.findOneByUserAndProduct(user,product).isPresent())
            return updateReview(user,reviewRequest);


        Review review = new Review();
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setUser(user);
        review.setProduct(product);

        return saveReviewAndUpdateOverAllRating(review);
    }


    public Review updateReview(User user, ReviewRequest reviewRequest) {
        Long productId = reviewRequest.getProductId();
        Product product= getProduct(productId);
        Review review = reviewRepository.findOneByUserAndProduct(user,product).orElseThrow(()-> new AppException("Invalid Product Id"));

        if(isNotEmptyOrNull(reviewRequest.getComment()))
            review.setComment(reviewRequest.getComment());

        if(reviewRequest.getRating() > 0)
            review.setRating(reviewRequest.getRating());

        return saveReviewAndUpdateOverAllRating(review);



    }


    public Review saveReviewAndUpdateOverAllRating(Review review) {
        Review savedReview = save(review);

        updateOverAllRating(review.getProduct());
        return savedReview;
    }

    public  void updateOverAllRating(Product product){

        Double overAllRatingForProduct = getAverageOfRatingForProduct(product);
        productService.updateOverAllRating(product,overAllRatingForProduct);

    }

    public Double getAverageOfRatingForProduct(Product product) {

        return reviewRepository.findAverageOfRatingForProduct(product.getProductId())
                            .map(result -> result.doubleValue())
                            .orElse(0.0);
    }

    @Transactional
    public Review save(Review review) {

        return reviewRepository.save(review);
    }

    Product getProduct(Long productId) {
        return productService.getProductById(productId).orElseThrow(() -> new AppException("Invalid Product Id"));
    }

    public void removeReview(User user,Long productId) {

        Review review = reviewRepository.findOneByUserAndProduct(user,getProduct(productId)).orElseThrow(()-> new AppException("Invalid Product Id"));


        reviewRepository.deleteById(review.getId());
    }

    public Page<Review> getReviewsForProduct(ReviewsForProductRequest reviewsForProductRequest) {

        Pageable pageable = reviewsForProductRequest.asPageable();
        Product product = getProduct(reviewsForProductRequest.getProductId());
        return reviewRepository.findAllByProduct(product,pageable);
    }


    @Transactional
    public void deleteAllForProduct(Product product) {
        reviewRepository.deleteByProduct(product);
    }

    public List<Review> getReviewsForProduct(Long productId) {
        Product product = getProduct(productId);
        return reviewRepository.findAllByProduct(product);
    }
}
