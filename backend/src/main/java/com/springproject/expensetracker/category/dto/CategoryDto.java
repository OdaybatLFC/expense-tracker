package com.springproject.expensetracker.category.dto;

import com.springproject.expensetracker.category.entity.Category;
import com.springproject.expensetracker.category.entity.CategoryType;

public record CategoryDto(
        Long id,
        String code,
        String name,
        CategoryType type,
        String icon
) {

    public static CategoryDto from(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getCode(),
                category.getName(),
                category.getType(),
                category.getIcon()
        );
    }
}