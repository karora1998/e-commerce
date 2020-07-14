package com.upgrad.eshop.deal;

import java.util.List;
import java.util.Optional;

import com.upgrad.eshop.product.Product;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends PagingAndSortingRepository<Deal, Long> {
	
	 List<Deal> findAll();

	void deleteById(Long id);

	void deleteByProduct(Product product);

	Optional<Deal> findOneByProduct(Product product);

	


	
	

}

