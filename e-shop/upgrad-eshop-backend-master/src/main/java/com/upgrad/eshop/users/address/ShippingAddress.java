package com.upgrad.eshop.users.address;

import com.upgrad.eshop.users.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ShippingAddress {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  Long id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;
    private String street;
    private String landmark;
    private String city;
    private String state;
    private String zipcode;
    private String phone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "USER_ADDRESS", joinColumns = {
            @JoinColumn(name = "ADDRESS_ID") }, inverseJoinColumns = {
            @JoinColumn(name = "USER_ID") })
    private User user;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ShippingAddress{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", street='" + street + '\'' +
                ", landmark='" + landmark + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", phone='" + phone + '\'' +
                ", user=" + user +
                '}';
    }
}
