package com.upgrad.eshop.notification;

import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.order.Order;
import com.upgrad.eshop.users.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class EmailNotificationService {

    private static Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    public JavaMailSender javaMailSender;


    public EmailNotificationService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String emailAddress, String subject, String message) {
        try{

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            String htmlMsg = String.format("<h3>%s</h3>", message);
            helper.setText(htmlMsg, true);
            helper.setTo(emailAddress);
            helper.setSubject(subject);

            javaMailSender.send(mimeMessage);
            log.info("Email has been sent!");


        } catch (MessagingException e) {
            log.error(e.getMessage(), e);
            throw new AppException(e.getMessage(),e);
        }

    }


    public void sendOrderNotification(Order order, User user){
        try {

            String subject = "Order Placed SuccessFully for " + order.getId();
            String message = composeMessage(order, user);

            sendEmail(user.getEmail(), subject, message);
        }catch (AppException e){
            log.error(e.getMessage(),e);
        }

    }
    String composeMessage(Order order, User user) {
        StringBuffer message= new StringBuffer("");
        message.append("Dear " + user.getFirstName() +",\n");
        message.append("\t Your Order Number is  " + order.getId() +".\n");
        message.append("\t You have " + order.getCart().getCartItems().size() +" items.\n");
        message.append("\t We will deliver as soon as possible\n\n");
        message.append("\t Looking Forward Serving you\n\n");
        message.append("\t Upgrad Ecommerce Team\n");
        return message.toString();
    }
}
