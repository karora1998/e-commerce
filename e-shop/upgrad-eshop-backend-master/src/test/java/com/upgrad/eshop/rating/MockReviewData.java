package com.upgrad.eshop.rating;

import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.review.models.ReviewRequest;

public class MockReviewData {
    public static final int DEFAULT_RATING = 5;
    public static final String DEFAULT_COMMENT = "Wonderful";

    public static ReviewRequest createSampleReviewRequest(Product product) {
        ReviewRequest reviewRequest = new ReviewRequest();
        reviewRequest.setProductId(product.getProductId());
        reviewRequest.setComment(DEFAULT_COMMENT);
        reviewRequest.setRating(DEFAULT_RATING);
        return reviewRequest;
    }


}
