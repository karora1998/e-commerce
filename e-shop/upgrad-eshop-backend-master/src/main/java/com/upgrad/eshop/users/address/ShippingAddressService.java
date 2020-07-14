package com.upgrad.eshop.users.address;

import com.upgrad.eshop.users.User;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;


@Service
@Validated
public class ShippingAddressService {


    private ShippingAddressRepository shippingAddressRepository;


    @Autowired
    public ShippingAddressService(ShippingAddressRepository shippingAddressRepository) {
        this.shippingAddressRepository = shippingAddressRepository;
    }

    private static final Logger log = LoggerFactory.getLogger(ShippingAddressService.class);
    public ShippingAddress addAddress(User user, @Valid ShippingAddressRequest shippingAddressRequest) {

        ShippingAddress shippingAddress = fromShippingAddressRequest(shippingAddressRequest);
        shippingAddress.setUser(user);
        ShippingAddress updatedAddress = shippingAddressRepository.save(shippingAddress);
        log.info("saving address " + updatedAddress.toString());
        return updatedAddress;

    }

    public List<ShippingAddress> findAllByUser(User user) {

        return shippingAddressRepository.findAllByUser(user);

    }

    ShippingAddress fromShippingAddressRequest(ShippingAddressRequest shippingAddressRequest) {
        ShippingAddress shippingAddress = new ShippingAddress();
        updateValuesFromRequest(shippingAddress, shippingAddressRequest);
        return shippingAddress;
    }

    void updateValuesFromRequest(ShippingAddress shippingAddress, ShippingAddressRequest shippingAddressRequest) {
        shippingAddress.setCity(shippingAddressRequest.getCity());
        shippingAddress.setLandmark(shippingAddressRequest.getLandmark());
        shippingAddress.setPhone(shippingAddressRequest.getPhone());
        shippingAddress.setState(shippingAddressRequest.getState());
        shippingAddress.setStreet(shippingAddressRequest.getStreet());
        shippingAddress.setZipcode(shippingAddressRequest.getZipcode());
        shippingAddress.setName(shippingAddressRequest.getName());
    }

    public ShippingAddress updateAddress(Long addressId,User user, @Valid ShippingAddressRequest shippingAddressRequest) {

        return shippingAddressRepository.findByUserAndId(user,addressId)
                .map(shippingAddress -> {
                    updateValuesFromRequest(shippingAddress, shippingAddressRequest);
                    return shippingAddressRepository.save(shippingAddress);

                }).orElseThrow(() -> new AppException("Invalid Address ID"));


    }


    @Transactional
    public void deleteAddress(User user,Long id) {

        shippingAddressRepository.deleteByUserAndId(user,id);


    }

    public ShippingAddress findByUserAndId(User user, Long addressId) {

        return shippingAddressRepository.findByUserAndId(user,addressId)
               .orElseThrow(() -> new AppException("Invalid Address ID"));

    }
}
