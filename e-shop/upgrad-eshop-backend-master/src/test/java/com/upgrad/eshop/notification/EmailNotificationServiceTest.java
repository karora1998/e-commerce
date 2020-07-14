package com.upgrad.eshop.notification;

import com.upgrad.eshop.exception.AppException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doThrow;


@RunWith(MockitoJUnitRunner.class)
public class EmailNotificationServiceTest {

    @Mock
    JavaMailSender javaMailSender;

    @Test(expected = AppException.class)
    public void sendingEmailWithMessageShouldSentTheEmailWithoutException() {

        doAnswer((i) -> {
            throw  new MessagingException("error createMimeMessage");
        }).when(javaMailSender).createMimeMessage();


        EmailNotificationService emailNotificationService = new EmailNotificationService(javaMailSender);
        emailNotificationService.sendEmail("test@upgrad.com", "Wireless receiver", "Mi Portable Wireless Optical Mouse Rs 500 has been placed sucessfully to the Delivery Address Eb Colony, Adampakkam, Chennai");


    }

}