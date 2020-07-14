package com.upgrad.eshop.order.cart.item;

import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.Min;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartItemService {


    private CartItemRepository cartItemRepository;

    private ProductService productService;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository, ProductService productService) {
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
    }


    private static Logger logger = LoggerFactory.getLogger(CartItemService.class);


    public CartItem createFrom(CartItemRequest cartItemRequest) {


        Product product = getProductById(cartItemRequest.getProductId());
        validateQuantityWithAvailability(cartItemRequest.getQuantity(), product.getAvailableItems());

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItemRequest.getQuantity());
        return saveCartItem(cartItem);

    }

    private void validateQuantityWithAvailability(Integer quantity, @Min(1) Integer availableItems) {
        if(quantity > availableItems)
            throw new AppException("Quantity not available");
    }

    public Set<CartItem> updateQuantityFor(Set<CartItem> cartItems, CartItemRequest cartItemRequest) {
        return cartItems
                .stream()
                .map(cartItem ->  modifyQuantityOnCartItem(cartItemRequest, cartItem))
                .collect(Collectors.toSet());

    }

    private CartItem modifyQuantityOnCartItem(CartItemRequest cartItemRequest, CartItem cartItem) {
        if( cartItem.getProduct().getProductId() == cartItemRequest.getProductId()){
            validateQuantityWithAvailability(cartItemRequest.getQuantity(),cartItem.getProduct().getAvailableItems());
            cartItem.setQuantity(cartItemRequest.getQuantity());
        }
        return cartItem;
    }

    @Transactional
    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }



    private Product getProductById(Long productId) {

        return productService
                .getProductById(productId)
                .orElseThrow(() -> new AppException("Invalid Product Id"));
    }


    private static final Logger log = LoggerFactory.getLogger(CartItemService.class);
    public Set<CartItem> getCartItemsOtherThanProductId(Long productId, Set<CartItem> cartItems){

        return cartItems
                .stream()
                .filter(cartItem ->!cartItem.getProduct().getProductId().equals(productId))
                .collect(Collectors.toSet());

    }

    public boolean isItemAlreadyInCart(Long productId, Set<CartItem> cartItems) {
        return cartItems
                .stream()
                .filter(cartItem -> cartItem.getProduct().getProductId() == productId)
                .count() > 0;
    }

    public void updateProductQuantity(Set<CartItem> cartItems) {
        cartItems.stream().forEach(cartItem -> productService.removeItems(cartItem.getProduct().getProductId(),cartItem.getQuantity()));
    }
}
