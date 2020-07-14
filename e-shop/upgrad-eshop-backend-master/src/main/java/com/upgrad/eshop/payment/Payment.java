package com.upgrad.eshop.payment;

import com.upgrad.eshop.payment.models.PaymentStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long orderId;

    private Long amount;

    private PaymentStatus status;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;



}
