package com.upgrad.eshop.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import com.upgrad.eshop.order.OrderService;
import com.upgrad.eshop.payment.config.UpgradPaymentValidator;
import com.upgrad.eshop.payment.models.InitiatePaymentResponse;
import com.upgrad.eshop.payment.models.PaymentRequest;
import com.upgrad.eshop.payment.models.PaymentStatus;
import com.upgrad.eshop.payment.models.RazorPayCompleteRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.exception.PaymentFailedException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {


    private RazorpayClient razorpayClient;

    private PaymentRepository paymentRepository;

    UpgradPaymentValidator upgradPaymentValidator;

    OrderService orderService;


    private static Logger logger = LoggerFactory.getLogger(PaymentService.class);

    @Autowired
    public PaymentService(OrderService orderService,RazorpayClient razorpayClient, PaymentRepository paymentRepository, UpgradPaymentValidator upgradPaymentValidator) {
        this.razorpayClient = razorpayClient;
        this.paymentRepository = paymentRepository;
        this.upgradPaymentValidator = upgradPaymentValidator;
        this.orderService = orderService;
    }

    public void removeActiveOrderAndPaymentForUser( User user) {

        com.upgrad.eshop.order.Order existingOrder = orderService.findActiveOrderByUser(user);

        if(null != existingOrder) {

            Payment payment =getPayment(existingOrder.getId());
            if(null != payment){
                paymentRepository.deleteById(payment.getId());
            }


            orderService.deleteById(existingOrder.getId());

        }


    }
    public InitiatePaymentResponse initiatePayment(User user, PaymentRequest paymentRequest) throws RazorpayException {

        Payment payment =getPayment(paymentRequest.getOrderId());
        com.upgrad.eshop.order.Order order = orderService.findByUserAndId(user, paymentRequest.getOrderId());
        Long amount = order.getFinalAmount().longValue();

        if(shouldCreateNewPaymentRequest(payment, amount)) {

            if(null != payment)
                paymentRepository.deleteById(payment.getId());


            String razorPayOrderId = getRazorPayOrderId(paymentRequest, amount);
             payment = createPaymentWith(paymentRequest, amount, razorPayOrderId);
            orderService.initiatePayment(user, paymentRequest.getOrderId());
        }

        return createInitiatePaymentResponse(user, payment);



    }

    public boolean shouldCreateNewPaymentRequest(Payment payment, Long amount) {
        return null == payment || null == payment.getRazorpayOrderId() || payment.getAmount() != amount;
    }

    public InitiatePaymentResponse retrievePayment(User user, Long orderId)  {

        Payment payment = getPayment(orderId);
      if(null != payment)

        return createInitiatePaymentResponse(user, payment);
      else
          throw new AppException("Order does not have payment Info");

    }

    public Payment getPayment(Long orderId) {
        Payment payment = paymentRepository.findOneByOrderId(orderId).orElse(null);


        return payment;
    }

    private Payment createPaymentWith(PaymentRequest paymentRequest,Long amount, String razorPayOrderId) {
        Payment payment = new Payment();
        payment.setRazorpayOrderId(razorPayOrderId);
        payment.setOrderId(paymentRequest.getOrderId());
        payment.setAmount(amount);
        return savePayment(payment);
    }

    private Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    private String getRazorPayOrderId(PaymentRequest paymentRequest,Long amount) throws RazorpayException {
        JSONObject request = paymentRequest.asOrderRequest(amount);
        logger.info("request" + request.toString());
        Order razorPayOrder = razorpayClient.Orders.create(request);
        logger.info("response" +razorPayOrder.toJson().toString());
        return razorPayOrder.get("id");
    }


    public void updatePaymentInformation(RazorPayCompleteRequest razorPayCompleteRequest)  throws PaymentFailedException{

        upgradPaymentValidator.validateSignature(razorPayCompleteRequest);
        Payment payment = paymentRepository.findOneByRazorpayOrderId(razorPayCompleteRequest.getRazorpayOrderId()).orElseThrow(()->new AppException("Invalid Payment Credentials"));

        if(null != razorPayCompleteRequest.getError()){
            saveCompletedPayment(razorPayCompleteRequest, payment, PaymentStatus.FAILED);
            throw new PaymentFailedException(razorPayCompleteRequest.getError().toString());
        }else{
            saveCompletedPayment(razorPayCompleteRequest, payment, PaymentStatus.SUCCESS);
            orderService.onPaymentCompleteForOrder(payment.getOrderId());
        }

    }


    void saveCompletedPayment(RazorPayCompleteRequest razorPayCompleteRequest, Payment payment, PaymentStatus paymentStatus) {
        payment.setRazorpayPaymentId(razorPayCompleteRequest.getRazorpayPaymentId());
        payment.setRazorpaySignature(razorPayCompleteRequest.getRazorpaySignature());
        payment.setStatus(paymentStatus);
        savePayment(payment);
    }

    private InitiatePaymentResponse createInitiatePaymentResponse(User user, Payment payment) {
        InitiatePaymentResponse initiatePaymentResponse = new InitiatePaymentResponse();
        initiatePaymentResponse.setAmount(payment.getAmount());
        initiatePaymentResponse.setOrderId(payment.getOrderId());
        initiatePaymentResponse.setUsername(user.getFirstName());
        initiatePaymentResponse.setUseremail(user.getEmail());
        initiatePaymentResponse.setDescription("Payment for Order " + payment.getOrderId());
        initiatePaymentResponse.setKey(upgradPaymentValidator.getKey());
        initiatePaymentResponse.setRazorpayOrderId(payment.getRazorpayOrderId());
        return initiatePaymentResponse;
    }


}
