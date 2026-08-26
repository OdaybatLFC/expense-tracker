package com.springproject.expensetracker.transaction.dto;

import com.springproject.expensetracker.category.entity.Category;
import com.springproject.expensetracker.transaction.entity.Transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionRto(
        Long id,
        String type,
        String source,
        BigDecimal amount,
        String currency,
        TransactionMerchantRto merchant,
        TransactionCategoryRto category,
        String description,
        LocalDateTime transactionDate
) {

    public static TransactionRto from(
            Transaction transaction,
            Category fallbackCategory
    ) {
        Category category = transaction.getMerchant() != null
                ? transaction.getMerchant().getCategory()
                : fallbackCategory;

        return new TransactionRto(
                transaction.getId(),
                transaction.getType().name(),
                transaction.getSource().name(),
                transaction.getAmount(),
                transaction.getCurrency(),
                TransactionMerchantRto.from(
                        transaction.getMerchant()
                ),
                TransactionCategoryRto.from(category),
                transaction.getDescription(),
                transaction.getTransactionDate()
        );
    }
}