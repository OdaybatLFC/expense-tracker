package com.springproject.expensetracker.transaction.dto;

import com.springproject.expensetracker.category.entity.Category;

public record TransactionCategoryRto(
        String code,
        String name,
        String icon
) {

    public static TransactionCategoryRto from(Category category) {
        return new TransactionCategoryRto(
                category.getCode(),
                category.getName(),
                category.getIcon()
        );
    }
}