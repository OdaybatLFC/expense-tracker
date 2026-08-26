package com.springproject.expensetracker.transaction.dto;

import com.springproject.expensetracker.transaction.entity.TransactionType;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateTransactionDto(

        @NotNull(message = "Type is required")
        TransactionType type,

        @NotNull(message = "Amount is required")
        @DecimalMin(
                value = "0.01",
                message = "Amount must be greater than zero"
        )
        @Digits(
                integer = 17,
                fraction = 2,
                message = "Amount can have a maximum of two decimal places"
        )
        BigDecimal amount,

        @NotBlank(message = "Currency is required")
        @Pattern(
                regexp = "^[A-Za-z]{3}$",
                message = "Currency must be a 3-letter ISO currency code"
        )
        String currency,

        @Size(
                max = 255,
                message = "Merchant name cannot exceed 255 characters"
        )
        String merchantName,

        @Size(
                max = 500,
                message = "Description cannot exceed 500 characters"
        )
        String description,

        @NotNull(message = "Transaction date is required")
        LocalDateTime transactionDate
) {
}