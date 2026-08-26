package com.springproject.expensetracker.transaction.repository;

import com.springproject.expensetracker.transaction.entity.Transaction;
import com.springproject.expensetracker.transaction.entity.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByIdAndUserId(
            Long id,
            Long userId
    );

    @Query(
            value = """
                    SELECT t
                    FROM Transaction t
                    LEFT JOIN FETCH t.merchant m
                    LEFT JOIN FETCH m.category c
                    WHERE t.user.id = :userId
                      AND (:type IS NULL OR t.type = :type)
                      AND (
                            :search IS NULL
                            OR LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%'))
                            OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))
                          )
                      AND (
                            :fromDate IS NULL
                            OR t.transactionDate >= :fromDate
                          )
                      AND (
                            :toDateExclusive IS NULL
                            OR t.transactionDate < :toDateExclusive
                          )
                    ORDER BY t.transactionDate DESC, t.id DESC
                    """,
            countQuery = """
                    SELECT COUNT(t)
                    FROM Transaction t
                    LEFT JOIN t.merchant m
                    WHERE t.user.id = :userId
                      AND (:type IS NULL OR t.type = :type)
                      AND (
                            :search IS NULL
                            OR LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%'))
                            OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))
                          )
                      AND (
                            :fromDate IS NULL
                            OR t.transactionDate >= :fromDate
                          )
                      AND (
                            :toDateExclusive IS NULL
                            OR t.transactionDate < :toDateExclusive
                          )
                    """
    )
    Page<Transaction> findForUser(
            @Param("userId") Long userId,
            @Param("type") TransactionType type,
            @Param("search") String search,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDateExclusive") LocalDateTime toDateExclusive,
            Pageable pageable
    );

    void deleteByIdAndUserId(
            Long id,
            Long userId
    );
}
