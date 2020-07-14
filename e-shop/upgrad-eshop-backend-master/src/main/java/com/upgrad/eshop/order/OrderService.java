package com.upgrad.eshop.order;


import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.coupon.CouponService;
import com.upgrad.eshop.notification.EmailNotificationService;
import com.upgrad.eshop.notification.SmsNotificationService;
import com.upgrad.eshop.order.cart.Cart;
import com.upgrad.eshop.order.cart.CartService;
import com.upgrad.eshop.order.models.ApplyCouponRequest;
import com.upgrad.eshop.order.models.OrderRequest;
import com.upgrad.eshop.order.models.OrderStatus;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.address.ShippingAddress;
import com.upgrad.eshop.users.address.ShippingAddressService;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.utils.PaginationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.*;

import static com.upgrad.eshop.utils.StringValidator.isNotEmptyOrNull;

@Service
@Validated
public class OrderService {


    private OrderRepository orderRepository;
    private CartService cartService;
    private ShippingAddressService shippingAddressService;
    EmailNotificationService emailNotificationService;
    SmsNotificationService smsNotificationService;
    CouponService couponService;


    @Autowired
    public OrderService(SmsNotificationService smsNotificationService, CouponService couponService, EmailNotificationService emailNotificationService, OrderRepository orderRepository, CartService cartService, ShippingAddressService shippingAddressService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.shippingAddressService = shippingAddressService;
        this.emailNotificationService = emailNotificationService;
        this.couponService = couponService;
        this.smsNotificationService=smsNotificationService;
    }

    private static Logger logger = LoggerFactory.getLogger(OrderService.class);

    public OrderService() {

    }

    public Order findActiveOrderByUser(User user) {
        Set<OrderStatus> orderStatuses = new HashSet<>();
        orderStatuses.add(OrderStatus.NEW);
        orderStatuses.add(OrderStatus.WAITING_FOR_PAYMENT);
        return orderRepository.findByUserAndStatusIn(user,orderStatuses).orElse(null);
    }


    public Order createOrder(User user,@Valid OrderRequest orderRequest ) {


        ShippingAddress shippingAddress =shippingAddressService.findByUserAndId(user,orderRequest.getAddressId());

       Order existingOrder = findActiveOrderByUser(user);
        Cart cart= cartService.getActiveCartOrThrowError(user);

        if(null != existingOrder) {
            return updateOrderWith(shippingAddress,existingOrder,cart);
        }


        Order order = createOrderWith(user,shippingAddress, cart);
        return saveOrder(order);
    }

    public Order createOrderWith(User user,ShippingAddress shippingAddress, Cart cart) {
        Order order = new Order();

        order.setUser(user);

        updateCartWith(shippingAddress, cart, order);

        return order;
    }

    public void updateCartWith(ShippingAddress shippingAddress, Cart cart, Order order) {
        order.setCart(cart);
        Double amount = calculateCartAmount(cart);
        order.setAmount(amount);
        order.setFinalAmount(amount);
        order.setShippingAddress(shippingAddress);
        order.setStatus(OrderStatus.NEW);
    }

    public Order updateOrderWith(ShippingAddress shippingAddress, Order order, Cart cart) {
        updateCartWith(shippingAddress, cart, order);
        return saveOrder(order);
    }

    Double calculateCartAmount(Cart cart){

        return  cart.getCartItems()
                .stream()
                .mapToDouble(cartItem -> cartItem.getProduct().getPrice() * cartItem.getQuantity())
                .sum();

    }


    public Page<Order> findAll(PaginationRequest paginationRequest) {

        return orderRepository.findAll(paginationRequest.asPageable());
    }


    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public Order applyCoupon(User user,@Valid ApplyCouponRequest applyCouponRequest){

        log.info("applyCouponRequest.getOrderId()" + applyCouponRequest.getOrderId());
        log.info("applyCouponRequest.user" + user.getUserName());

        Order order = findByUserAndId(user,applyCouponRequest.getOrderId());
        Coupon coupon= couponService.getOneByCouponCode(applyCouponRequest.getCouponCode()).orElseThrow(()-> new AppException("Invalid Coupon Code"));
        Double finalAmount = calculateFinalAmountAfterApplyingCoupon(order, coupon);


        Coupon updatedCoupon= couponService.markCouponAsApplied(coupon);
        Set<Coupon> coupons = getUpdatedCouponsForOrder(order, updatedCoupon);


        order.setFinalAmount(finalAmount);
        order.setCoupons(coupons);
        return saveOrder(order);



    }

     Set<Coupon> getUpdatedCouponsForOrder(Order order, Coupon updatedCoupon) {
        Set<Coupon> coupons= order.getCoupons();
        if(null == coupons )
            coupons= new HashSet<>();
        coupons.add(updatedCoupon);
        return coupons;
    }

     Double calculateFinalAmountAfterApplyingCoupon(Order order, Coupon coupon) {
        long existingCouponAmount = getCouponValue(order);
        Long totalCartAmount = order.getAmount().longValue();

        Long  updatedCouponAmount = existingCouponAmount + coupon.getAmount();
        Double finalAmount = Double.valueOf((totalCartAmount-updatedCouponAmount));


        if(updatedCouponAmount > totalCartAmount)
            throw new AppException("Cannot apply coupon, Amount is higher");
        return finalAmount;
    }

     long getCouponValue(Order order) {
        return order.getCoupons().stream()
                .mapToLong(coupon->coupon.getAmount())
                .sum();
    }

    public Order findByUserAndId(User user,Long orderId) {

        return orderRepository.findByUserAndId(user,orderId).orElseThrow(()-> new AppException("Invalid Order Id"));
    }


    List<Order> findAllByUser(User user) {
        return orderRepository.findAllByUserOrderByOrderDateDesc(user);
    }

    public Order onPaymentCompleteForOrder(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new AppException("Invalid Order Id"));
        User user = order.getUser();
        Order updatedOrder = setOrderStatusToCompleted(order, user);
        sendNotifications(user, updatedOrder);

        return updatedOrder;
    }

    public Order setOrderStatusToCompleted(Order order, User user) {
        Cart cart= cartService.updateCartItemsReadyToShip(user,order.getCart());
        order.setStatus(OrderStatus.PAYMENT_COMPLETED);
        order.setCart(cart);
        return saveOrder(order);
    }

    public void sendNotifications(User user, Order updatedOrder) {
        emailNotificationService.sendOrderNotification(updatedOrder,user);

        if(isNotEmptyOrNull(user.getPhoneNumber()))
            smsNotificationService.sendOrderNotification(updatedOrder,user);
    }




    public Order cancelOrderByUserAndId( User user,Long id) {

        Order order = findByUserAndId(user,id);
        order.setStatus(OrderStatus.CANCELLED);
        return saveOrder(order);
    }

    public Order initiatePayment(User user, Long id) {

        Order order = findByUserAndId(user,id);
        order.setStatus(OrderStatus.WAITING_FOR_PAYMENT);
        return saveOrder(order);
    }

    private Order saveOrder(Order order) {
        return orderRepository.save(order);
    }


    public Page<Order> findAllByUserWithPagination(User user, PaginationRequest paginationRequest) {
        return orderRepository.findAllByUser(user,paginationRequest.asPageable());
    }


    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }
}
