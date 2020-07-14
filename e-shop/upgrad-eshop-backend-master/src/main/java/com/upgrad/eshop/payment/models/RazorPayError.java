package com.upgrad.eshop.payment.models;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RazorPayError {
    String field;
    String description;
}
