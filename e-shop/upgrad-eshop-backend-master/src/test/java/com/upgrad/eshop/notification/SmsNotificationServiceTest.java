package com.upgrad.eshop.notification;

import com.twilio.rest.api.v2010.account.Message;
import org.junit.Ignore;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class SmsNotificationServiceTest {

    @Autowired
    SmsNotificationService smsNotificationService;

    private static final Logger log = LoggerFactory.getLogger(SmsNotificationServiceTest.class);

    @Test

    public void OrderSucessNotifySMSTest(){

        String productName = "Mi Portable Wireless..";
        String subject = String.format("Your Order for %s has been sucessfully placed",productName);
        Message message= smsNotificationService.sendSMS("+919629150400","Mi Portable Wireless Optical Mouse Rs 500 has been placed sucessfully to the Delivery Address Eb Colony, Adampakkam, Chennai" );
        log.info(message.toString());
        assertNotNull(message);
    }



}