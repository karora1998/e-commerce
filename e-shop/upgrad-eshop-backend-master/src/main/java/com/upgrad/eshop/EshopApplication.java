package com.upgrad.eshop;

import com.upgrad.eshop.config.AppInitializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;


@SpringBootApplication
@EnableCaching
public class EshopApplication {



    public static void main(String[] args) {
        SpringApplication.run(EshopApplication.class, args);
    }


}
