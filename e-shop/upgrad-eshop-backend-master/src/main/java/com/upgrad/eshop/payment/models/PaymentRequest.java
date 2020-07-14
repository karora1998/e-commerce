package com.upgrad.eshop.payment.models;

import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;

@Getter
@Setter
public class PaymentRequest {


    public Long orderId;



   public Long  covertAsPaise(Long amount) {
        String result = "" + amount;

        if (result.indexOf('.') > 0) {
            result = result.replace(".", "");
        } else {
            result = result + "00";
        }
        return Long.parseLong(result);
    }


    public JSONObject asOrderRequest(Long amount){

        JSONObject paymentRequest = new JSONObject();
        paymentRequest.put("amount", covertAsPaise(amount));
        paymentRequest.put("currency", "INR");
        paymentRequest.put("receipt", String.valueOf(orderId));
        paymentRequest.put("payment_capture", true);
        //notes
        return paymentRequest;

    }


}
