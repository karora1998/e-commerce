package com.upgrad.eshop.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class PaginationRequest {

  public   Integer pageNo=0;
    public   Integer pageSize=10;
    public  String sortBy="";
    public  Sort.Direction direction =Sort.Direction.DESC;

    public PaginationRequest(){

    }

    public Pageable asPageable(){

        if(sortBy.isEmpty())
            return PageRequest.of(pageNo,pageSize);
        else
            return PageRequest.of(pageNo,pageSize, Sort.by(direction,sortBy));

    }

}
