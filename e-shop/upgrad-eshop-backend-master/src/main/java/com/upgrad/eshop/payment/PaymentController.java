package com.upgrad.eshop.payment;


import com.razorpay.RazorpayException;
import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.payment.models.InitiatePaymentResponse;
import com.upgrad.eshop.payment.models.PaymentRequest;
import com.upgrad.eshop.payment.models.RazorPayCompleteRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.exception.PaymentFailedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asServerError;

@RestController
@RequestMapping("/payments")
public class PaymentController {


    private PaymentService paymentService;
    private UserLoggedInService userLoggedInService;



    @Autowired
    public PaymentController(PaymentService paymentService,UserLoggedInService userLoggedInService) {
        this.paymentService = paymentService;
        this.userLoggedInService = userLoggedInService;

    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    public InitiatePaymentResponse initiatePayment(@RequestBody PaymentRequest paymentRequest) {

        try {

        User user = userLoggedInService.getLoggedInUser();
        return paymentService.initiatePayment(user,paymentRequest);
        }catch (RazorpayException e){
            throw asServerError(e.getMessage());
        } catch (AppException e){
            throw asBadRequest(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @GetMapping("/byorder/{orderid}")
    public InitiatePaymentResponse retrievePayment(@PathVariable Long orderid) {


            try {

        User user = userLoggedInService.getLoggedInUser();
        return paymentService.retrievePayment(user,orderid);
        } catch (AppException e){
            throw asBadRequest(e.getMessage());
        }
    }

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);


    @PostMapping("/razorpay/oncomplete")
    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    public ResponseEntity<?> onPaymentComplete(@RequestBody RazorPayCompleteRequest razorPayCompleteRequest) {
        log.info("========razorPayCompleteRequest " + razorPayCompleteRequest.toString());

        try {
            paymentService.updatePaymentInformation(razorPayCompleteRequest);
            return ResponseEntity.ok("Succesfully Completed");
        } catch (PaymentFailedException e) {
            e.printStackTrace();
            throw asBadRequest("Payment Failed - " + e.getMessage());
        }catch (AppException e) {
            e.printStackTrace();
            throw asBadRequest("Payment Error - " + e.getMessage());

        }

    }


}
