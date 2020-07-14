package com.upgrad.eshop.deal;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.upgrad.eshop.product.Product;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Deal {
	

	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  Long id;

	
	


    @OneToOne
    private Product product;
	

	private Double dealPrice;

	
}
