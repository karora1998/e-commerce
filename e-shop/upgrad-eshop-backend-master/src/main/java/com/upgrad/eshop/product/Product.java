package com.upgrad.eshop.product;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upgrad.eshop.product.models.ProductRequest;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;


@Entity
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long productId;



    @NotNull
    @Size(min = 2)
    private String name;

    @NotNull
    @Size(min = 2)
    private String category;

    @ApiModelProperty(example = "229990.00")
    @NotNull
    @Positive
    private double price;

    private double dealPrice=0;

    @ApiModelProperty(example = "Ninth-generation 8-core Intel Core i9 processor\n" +
            "Stunning 16-inch Retina display with True Tone technology\n" +
            "Touch Bar and Touch ID\n" +
            "AMD Radeon Pro 5500M graphics with GDDR6 memory\n" +
            "Ultrafast SSD\n" +
            "Intel UHD Graphics 630\n" +
            "Six-speaker system with force-cancelling woofers\n" +
            "Four Thunderbolt 3 (USB-C) ports\n" +
            "Up to 11 hours of battery life\n" +
            "802.11ac Wi-Fi")
    @Column(length = 7000)
    @NotNull
    @Size(min = 2)
    private String description;

    @ApiModelProperty(example = "Apple")
    @Size(min = 2)
    private String manufacturer;


    @ApiModelProperty(example = "25")
    @Min(0)
    Integer availableItems;

    @ApiModelProperty(example = "5")
    Double overAllRating;


    @ApiModelProperty(example = "https://www.apple.com/v/macbook-pro/y/images/overview/find_the_right_mbp_16__dgg32ajoxemq_large.jpg")
    String imageUrl;


    private LocalDateTime created=LocalDateTime.now();


    private LocalDateTime updated=LocalDateTime.now();


    public Product(){

    }
    public Product(String name, String category, double price, String description, String manufacturer,String imageUrl) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.manufacturer = manufacturer;
        this.imageUrl=imageUrl;
        this.created=LocalDateTime.now();
        this.updated=LocalDateTime.now();
    }


    public double calculatedPrice(){
        if(dealPrice != 0)
            return dealPrice;
        else
            return price;
    }
    public void markForUpdate() {
        this.updated=LocalDateTime.now();
    }
}
