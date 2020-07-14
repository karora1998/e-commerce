package com.upgrad.eshop.rating;

import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.review.Review;
import com.upgrad.eshop.review.ReviewService;
import com.upgrad.eshop.review.models.ReviewRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import com.upgrad.eshop.mocks.MockDataGenerator;

import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static com.upgrad.eshop.rating.MockReviewData.createSampleReviewRequest;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class ReviewServiceIntegrationTest {

    @Autowired
    ReviewService reviewService;

    @Autowired
    MockDataGenerator mockDataGenerator;

    @Autowired
    UserService userService;

    @Test
    public void gettingOverAllRatingFOrNoReviewsShouldReturnZero(){


        Product product = mockDataGenerator.getFirstProduct();
        reviewService.deleteAllForProduct(product);

        Double result = reviewService.getAverageOfRatingForProduct(product);

        assertThat(result,equalTo(0.0));
    }
    @Test
    public void gettingOverAllRatingForASingleRatingShouldReturnSingleRatingAsAverage(){

        Product product = mockDataGenerator.getRandomProduct();
       User userX= userService.addUser(createRegisterRequestWith("UserX", "password"));
       User userY= userService.addUser(createRegisterRequestWith("UserY", "password"));
        ReviewRequest reviewRequest = createSampleReviewRequest(product);

       Review review= reviewService.addReview(userX,reviewRequest);
        Double result = reviewService.getAverageOfRatingForProduct(product);

        assertThat(result,equalTo(reviewRequest.getRating().doubleValue()));
    }

    @Test
    public void gettingOverAllRatingForAProductWithTwoUsersRatingShouldReturnSingleRatingAsAverage(){

        Product product = mockDataGenerator.getRandomProduct();
       User userX= userService.addUser(createRegisterRequestWith("UserX-new", "password"));
       User userY= userService.addUser(createRegisterRequestWith("UserY-new", "password"));
        ReviewRequest reviewRequestX = createSampleReviewRequest(product);
        reviewRequestX.setRating(5);



       Review reviewx= reviewService.addReview(userX,reviewRequestX);

        ReviewRequest reviewRequest = createSampleReviewRequest(product);
        reviewRequest.setRating(2);
       Review reviewy= reviewService.addReview(userY,reviewRequest);

        Double expectedResult = (Double.valueOf(reviewx.getRating()) + Double.valueOf(reviewy.getRating()) )/2;
        Double result = reviewService.getAverageOfRatingForProduct(product);


        assertThat(result,equalTo(expectedResult));
    }
}