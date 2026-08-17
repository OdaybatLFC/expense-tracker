package com.springproject.expensetracker.transaction.repository;

import com.springproject.expensetracker.transaction.entity.Transaction;
import com.springproject.expensetracker.transaction.entity.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByIdAndUserId(
            Long id,
            Long userId
    );

    Page<Transaction> findAllByUserId(
            Long userId,
            Pageable pageable
    );

    Page<Transaction> findAllByUserIdAndType(
            Long userId,
            TransactionType type,
            Pageable pageable
    );

    Page<Transaction> findAllByUserIdAndTransactionDateBetween(
            Long userId,
            LocalDateTime from,
            LocalDateTime to,
            Pageable pageable
    );

    void deleteByIdAndUserId(
            Long id,
            Long userId
    );
}
