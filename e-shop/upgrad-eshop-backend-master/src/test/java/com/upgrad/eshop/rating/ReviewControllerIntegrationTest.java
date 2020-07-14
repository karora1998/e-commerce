package com.upgrad.eshop.rating;

import com.upgrad.eshop.exception.UpgradResponseStatusException;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.review.Review;
import com.upgrad.eshop.review.ReviewController;
import com.upgrad.eshop.review.models.ReviewRequest;
import com.upgrad.eshop.review.models.ReviewsForProductRequest;
import com.upgrad.eshop.users.UserService;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.PostConstruct;

import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static com.upgrad.eshop.rating.MockReviewData.createSampleReviewRequest;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
public class ReviewControllerIntegrationTest {

    public static final String TEST_USER_REVIEW = "test-user-review";


    @Autowired
    ReviewController reviewController;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    MockDataGenerator mockDataGenerator;


    @PostConstruct
    public void insertMockUsers() {

        try {

            userService.addUser(createRegisterRequestWith(TEST_USER_REVIEW, "password"));
        } catch (Throwable ignore) {

        }
    }


    @Test
    @WithUserDetails(value = TEST_USER_REVIEW)
    public void addReview_shouldInsertNewEntry() {


        Product product = getFirstProduct();

        ReviewRequest reviewRequest = createSampleReviewRequest(product);
        Review review = reviewController.addReview(reviewRequest);


        assertNotNull(review);
        assertNotNull(review.getId());
        assertThat(review.getComment(), equalTo(reviewRequest.getComment()));

    }

    @Test
    @WithUserDetails(value = TEST_USER_REVIEW)
    public void getRatingsWithInvalidProductId_ShouldThrowException() {


        long productId = 9898L;
        assertThrows(UpgradResponseStatusException.class, () -> {
            getReviewsForPrdouct(productId);
        });

    }

    Page<Review> getReviewsForPrdouct(long productId) {
        return reviewController.getReviewsForPrdouct(new ReviewsForProductRequest(productId));
    }


    @Test
    @WithUserDetails(value = TEST_USER_REVIEW)
    public void getRatings_Success() {

        Product product = mockDataGenerator.getRandomProduct();

        createSampleReviewFor(product);


        Page<Review> ratings = getReviewsForPrdouct(product.getProductId());

        assertNotNull(ratings);
        assertNotNull(ratings.getContent());
        assertThat(ratings.getContent().size(), greaterThanOrEqualTo(1));
        assertOverAllRating(product, 5);

    }

    @Test
    @WithUserDetails(value = TEST_USER_REVIEW)
    public void updateRating_Success() {

        Product product = mockDataGenerator.getRandomProduct();

        ReviewRequest reviewRequest = createSampleReviewRequest(product);

        Review createdReview = reviewController.addReview(reviewRequest);

        ReviewRequest updatedReviewRequest = createSampleReviewRequest(product);

        int updatedRating = 3;
        updatedReviewRequest.setRating(updatedRating);
        updatedReviewRequest.setComment(null);

        Review updatedReview = reviewController.updateReview(updatedReviewRequest);

        assertNotNull(updatedReview);
        assertNotNull(updatedReview.getId());

        assertThat(updatedReview.getRating(), equalTo(updatedReviewRequest.getRating()));
        assertThat(updatedReview.getId(), equalTo(createdReview.getId()));
        assertThat(updatedReview.getComment(), equalTo(createdReview.getComment()));

        assertOverAllRating(product, updatedRating);


    }


    @Test
    @WithUserDetails(value = TEST_USER_REVIEW)
    public void removeRatings_shouldNotThrowException() {
        Product product = getFirstProduct();

        ReviewRequest reviewRequest = createSampleReviewRequest(product);
        Review reviewForUser = reviewController.addReview(reviewRequest);

        reviewController.removeRating(reviewForUser.getProduct().getProductId());

        Page<Review> reviews = getReviewsForPrdouct(product.getProductId());

        long reviewCountForUser = reviews.getContent().stream()
                .filter(review -> review.getUser().getUserName().equals(TEST_USER_REVIEW) == false)
                .count();

        assertThat(reviewCountForUser, equalTo(0L));
    }


    Review createSampleReviewFor(Product product) {
        ReviewRequest reviewRequest = createSampleReviewRequest(product);
        return reviewController.addReview(reviewRequest);
    }


    void assertOverAllRating(Product product, int updatedRating) {
        assertThat(productService.getProductById(product.getProductId()).get().getOverAllRating().intValue(), equalTo(updatedRating));
    }


    Product getFirstProduct() {
        return mockDataGenerator.getFirstProduct();
    }
}
