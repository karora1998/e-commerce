package com.upgrad.eshop.review;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.users.User;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {

	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  Long id;


	@ManyToOne(fetch = FetchType.EAGER)
	private User user;


	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="product_id")
	private Product product;
	
	

	private  Integer rating;

	
	

	@Column(length = 7000)
	private String comment ="";
	
	

	 private LocalDateTime updated=LocalDateTime.now();





	@Override
	public String toString() {
		return "Review [id=" + id + ", userId=" + user.getUserName() + ", productId=" + product.getProductId() + ", rating="
				+ rating + ", comment=" + comment + "]";
	}


}
