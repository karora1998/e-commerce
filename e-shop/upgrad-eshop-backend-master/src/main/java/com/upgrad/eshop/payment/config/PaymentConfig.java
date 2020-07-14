package com.upgrad.eshop.payment.config;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.upgrad.eshop.exception.AppException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaymentConfig {


    @Value("${payment.razorpay.key_id}")
    String apiKey;

    @Value("${payment.razorpay.key_secret}")
    String secret;

    @Bean
    public RazorpayClient getRazorpayClient() {

        try {
            return new RazorpayClient(this.apiKey, this.secret);
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new AppException("Unable to Set Payment Configuration");
        }

    }

    @Bean
    public UpgradPaymentValidator getPaymentValidator() {


        return new UpgradPaymentValidator(this.apiKey,this.secret);

    }

}
