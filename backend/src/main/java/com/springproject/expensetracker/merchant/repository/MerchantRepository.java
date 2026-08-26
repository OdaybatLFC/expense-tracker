package com.springproject.expensetracker.merchant.repository;

import com.springproject.expensetracker.merchant.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MerchantRepository extends JpaRepository<Merchant, Long> {

    List<Merchant> findByUser_IdOrderByNameAsc(Long userId);

    List<Merchant> findByUser_IdAndNameContainingIgnoreCaseOrderByNameAsc(
            Long userId,
            String name
    );

    Optional<Merchant> findByIdAndUser_Id(
            Long merchantId,
            Long userId
    );

    Optional<Merchant> findByUser_IdAndName(
            Long userId,
            String name
    );
}