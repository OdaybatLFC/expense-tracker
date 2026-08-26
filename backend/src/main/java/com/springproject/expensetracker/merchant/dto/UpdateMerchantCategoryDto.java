package com.springproject.expensetracker.merchant.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateMerchantCategoryDto(
        @NotNull(message = "categoryId is required")
        Long categoryId
) {
}