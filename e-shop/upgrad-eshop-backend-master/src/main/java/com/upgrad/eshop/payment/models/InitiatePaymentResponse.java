package com.upgrad.eshop.payment.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InitiatePaymentResponse {
    String key;
    Long amount;
    String currency="INR";
    String razorpayOrderId;
    String description;
    String username;
    String useremail;
    Long orderId;
    Long paymentId;
}
