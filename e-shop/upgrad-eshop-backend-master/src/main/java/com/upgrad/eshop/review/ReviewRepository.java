package com.upgrad.eshop.review;

import java.util.List;
import java.util.Optional;

import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;






	
@Repository
public interface ReviewRepository extends PagingAndSortingRepository<Review, Long> {
	
	 List<Review> findAll();

	 Page<Review> findAllByProduct(Product product,Pageable pageable);

	 Optional<Review> findOneByUserAndProduct(User user, Product product);

	void deleteById(Long ratingId);
	void deleteByProduct(Product product);

	List<Review> findAllByProduct(Product product);


	@Query("select AVG(r.rating) FROM Review r  where r.product.productId = :productId")
	Optional<Double> findAverageOfRatingForProduct(@Param("productId") Long productId);




}
