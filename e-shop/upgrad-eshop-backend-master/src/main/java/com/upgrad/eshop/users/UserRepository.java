package com.upgrad.eshop.users;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserName(String username);
    void deleteByUserName(String username);

    List<User> findAll();

    void deleteById(Long id);

    Optional<User> findById(Long id);


}
