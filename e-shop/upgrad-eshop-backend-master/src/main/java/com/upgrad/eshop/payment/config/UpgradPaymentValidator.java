package com.upgrad.eshop.payment.config;

import com.upgrad.eshop.payment.models.RazorPayCompleteRequest;
import com.upgrad.eshop.exception.AppException;
import lombok.Getter;
import lombok.Setter;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;


@Getter
@Setter
public class UpgradPaymentValidator {


    String secret;
    String key;



    public UpgradPaymentValidator(String key, String secret) {
        this.secret = secret;
        this.key=key;
    }


    public void validateSignature(RazorPayCompleteRequest razorPayCompleteRequest){



        String razorpayOrderId=razorPayCompleteRequest.getRazorpayOrderId();
         String razorpayPaymentId=razorPayCompleteRequest.getRazorpayPaymentId();
        String razorpaySignature=razorPayCompleteRequest.getRazorpaySignature();

        String generated_signature = calculateSignature(razorpayOrderId, razorpayPaymentId, secret);

        if( generated_signature.equals(razorpaySignature) == false)
            throw new  AppException("Invalid Razor Pay Signature");
    }



    public String calculateSignature(String razorpayOrderId, String razorpayPaymentId, String secret) {

        String data = razorpayOrderId + "|" + razorpayPaymentId;

        String HMAC_SHA256_ALGORITHM = "HmacSHA256";
        String result;
        try {

            // get an hmac_sha256 key from the raw secret bytes
            SecretKeySpec signingKey = new SecretKeySpec(secret.getBytes(), HMAC_SHA256_ALGORITHM);

            // get an hmac_sha256 Mac instance and initialize with the signing key
            Mac mac = Mac.getInstance(HMAC_SHA256_ALGORITHM);
            mac.init(signingKey);

            // compute the hmac on input data bytes
            byte[] rawHmac = mac.doFinal(data.getBytes());

            // base64-encode the hmac
            result = DatatypeConverter.printHexBinary(rawHmac).toLowerCase();

        } catch (Exception e) {
            throw new AppException("Failed to generate HMAC : " + e.getMessage(),e);
        }
        return result;
    }
}
