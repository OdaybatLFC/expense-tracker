package com.springproject.expensetracker.merchant.repository;

import com.springproject.expensetracker.merchant.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MerchantRepository extends JpaRepository<Merchant, Long> {

    Optional<Merchant> findByIdAndUserId(Long id, Long userId);

    Optional<Merchant> findByUserIdAndName(Long userId, String name);

    List<Merchant> findAllByUserId(Long userId);
}