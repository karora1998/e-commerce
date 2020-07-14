package com.upgrad.eshop.notification;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.order.Order;
import com.upgrad.eshop.users.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class SmsNotificationService {

    private static Logger log = LoggerFactory.getLogger(SmsNotificationService.class);


    @Value("${twilio_account_sid}")
    private String ACCOUNT_SID;

    @Value("${twilio_auth_token}")
    private String AUTH_TOKEN;

    @Value("${twilio_phone_number}")
    private String FROM_NUMBER;

    public Message sendSMS(String contact, String message) {

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message smsMessage = Message.creator(new com.twilio.type.PhoneNumber(contact), new com.twilio.type.PhoneNumber(FROM_NUMBER), message).create();
        log.info("SMS has been sent to " + contact);
        return smsMessage;


    }
    public void sendOrderNotification(Order order, User user){
        try {

            String subject = "Order Placed SuccessFully for " + order.getId();
            Message message =sendSMS(user.getPhoneNumber(), subject);
            log.info(message.toString());
        }catch (Throwable e){
            log.error(e.getMessage(),e);
        }

    }
}
