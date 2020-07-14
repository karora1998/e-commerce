package com.upgrad.eshop.payment.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RazorPayCompleteRequest {

    private String razorpay_payment_id;
    private String razorpay_order_id;
    private String razorpay_signature;
    private String redirectUrl;

    private RazorPayError error;


    public String getRazorpayOrderId(){
        return razorpay_order_id;
    }
    public String getRazorpayPaymentId(){
        return razorpay_payment_id;
    }
    public String getRazorpaySignature(){
        return razorpay_signature;
    }


}
