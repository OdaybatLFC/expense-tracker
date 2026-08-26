package com.springproject.expensetracker.merchant.dto;

import com.springproject.expensetracker.category.entity.Category;

public record MerchantCategoryRto(
        Long id,
        String code,
        String name,
        String icon
) {

    public static MerchantCategoryRto from(Category category) {
        return new MerchantCategoryRto(
                category.getId(),
                category.getCode(),
                category.getName(),
                category.getIcon()
        );
    }
}
