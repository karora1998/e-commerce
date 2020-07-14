package com.upgrad.eshop.product.models;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
public class ProductRequest {

    @ApiModelProperty(example = "New Apple MacBook Pro (16-inch, 16GB RAM, 1TB Storage, 2.3GHz Intel Core i9) - Silver")
    private String name;

    @ApiModelProperty(example = "Laptops")
    private String category;

    @ApiModelProperty(example = "229990.00")
    private double price;



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
    private String description;

    @ApiModelProperty(example = "Apple")
    private String manufacturer;


    @ApiModelProperty(example = "25")
    Integer availableItems;

    @ApiModelProperty(example = "https://www.apple.com/v/macbook-pro/y/images/overview/find_the_right_mbp_16__dgg32ajoxemq_large.jpg")
    String imageUrl;


    public ProductRequest(){

    }
    public ProductRequest(String name, String category, double price, String description, String manufacturer, Integer availableItems, String imageUrl) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.manufacturer = manufacturer;
        this.availableItems = availableItems;
        this.imageUrl = imageUrl;
    }
}
