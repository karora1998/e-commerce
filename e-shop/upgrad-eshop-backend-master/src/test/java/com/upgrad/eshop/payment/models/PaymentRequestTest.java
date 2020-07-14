package com.upgrad.eshop.payment.models;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PaymentRequestTest {

    @Test
    public void testPaiseValue(){

        PaymentRequest paymentRequest = new PaymentRequest();

                assertEquals(paymentRequest.covertAsPaise(12L),1200L);

    }
}