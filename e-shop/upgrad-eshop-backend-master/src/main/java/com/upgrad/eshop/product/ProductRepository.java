package com.upgrad.eshop.product;

import java.util.List;
import java.util.Optional;

import com.upgrad.eshop.product.search.SearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ProductRepository extends JpaRepository<Product,Long>, SearchRepository {


	Optional<Product> findById(Long id);



	void deleteById(Long id);



	List<Product> findByCategory(String category);


	@Query("SELECT DISTINCT p.category FROM Product p")
	List<String> findDistinctCategories();



	
	List<Product> findByName(String name);
	
	List<Product> findByNameLike(String name);
}
