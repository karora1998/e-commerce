package com.upgrad.eshop.order.cart;

import com.upgrad.eshop.order.cart.item.CartItem;
import com.upgrad.eshop.order.cart.item.CartItemRequest;
import com.upgrad.eshop.order.cart.item.CartItemService;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {


    private CartRepository cartRepository;

    private CartItemService cartItemService;
    private static Logger logger = LoggerFactory.getLogger(CartService.class);

    @Autowired
    public CartService(CartRepository cartRepository, CartItemService cartItemService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
    }

    public Cart getCart(User user) {

        return getActiveCartForUserOrCreateNew(user);
    }

    public Cart addToCart(User user, CartItemRequest cartItemRequest) {


        return getActiveCartForUser(user)
                .map(cart -> addToCart(cart, user, cartItemRequest))
                .orElseGet(() -> createNewCartForUserWith(user, cartItemRequest));

    }


    Cart addToCart(Cart cart, User user, CartItemRequest cartItemRequest) {

        Set<CartItem> cartItems = cart.getCartItems();

        if (isItemAlreadyInCart(cartItemRequest, cartItems)) {
            return updateCartItem(user, cartItemRequest);
        }else{
            CartItem cartItem = cartItemService.createFrom(cartItemRequest);
            cartItems.add(cartItem);
            return saveCart(cart);
        }

    }


    private boolean isItemAlreadyInCart(CartItemRequest cartItemRequest, Set<CartItem> cartItems) {
        return cartItemService.isItemAlreadyInCart(cartItemRequest.getProductId(), cartItems);
    }


    public Cart deleteFromCart(User user, Long productId) {

        Cart cart = getActiveCartOrThrowError(user);
        Set<CartItem> cartItems = cart.getCartItems();
        logger.info(cartItems.toString());
        Set<CartItem> updatedItems = cartItemService.getCartItemsOtherThanProductId(productId, cartItems);
        logger.info(updatedItems.toString());
        cart.setCartItems(updatedItems);
        return saveCart(cart);

    }


    public Cart updateCartItem(User user, CartItemRequest cartItemRequest) {

        Cart cart = getActiveCartOrThrowError(user);
        Set<CartItem> updatedItems = cartItemService.updateQuantityFor(cart.getCartItems(), cartItemRequest);

        cart.setCartItems(updatedItems);
        return saveCart(cart);
    }

    public Cart updateCartItemsReadyToShip(User user) {

        Cart cart = getActiveCartOrThrowError(user);
        cart.setStatus(CartStatus.CREATED_AS_ORDER);
        return saveCart(cart);
    }

    public Optional<Cart> getActiveCartForUser(User user) {

        return cartRepository
                .findOneByUserAndStatus(user, CartStatus.ACTIVE);

    }

    public Cart getActiveCartOrThrowError(User user) {

        return getActiveCartForUser(user)
                .orElseThrow(() -> new AppException("No Active Cart Items"));

    }


    public Cart getActiveCartForUserOrCreateNew(User user) {

        return getActiveCartForUser(user)
                .orElseGet(() -> createCartFor(user));
    }

    public Cart createCartFor(User user) {

        Cart cart = new Cart();
        cart.setStatus(CartStatus.ACTIVE);
        cart.setUser(user);
        return saveCart(cart);
    }

    public Cart createNewCartForUserWith(User user, CartItemRequest cartItemRequest) {


        Cart cart = new Cart();
        cart.setStatus(CartStatus.ACTIVE);
        cart.setUser(user);

        Set<CartItem> cartItems = new HashSet<>();
        CartItem cartItem = cartItemService.createFrom(cartItemRequest);
        cartItems.add(cartItem);
        cart.setCartItems(cartItems);
        return saveCart(cart);
    }

    @Transactional
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteAllForUser(User user) {

        getActiveCartForUser(user)
                .ifPresent(cart -> cartRepository.deleteById(cart.getId()));
    }

    public Cart updateCartItemsReadyToShip(User user, Cart cart) {

        cartItemService.updateProductQuantity(cart.getCartItems());

        return updateCartItemsReadyToShip(user);
    }
}
