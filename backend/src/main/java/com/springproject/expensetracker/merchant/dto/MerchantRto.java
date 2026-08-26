package com.springproject.expensetracker.merchant.dto;

import com.springproject.expensetracker.merchant.entity.Merchant;

public record MerchantRto(
        Long id,
        String name,
        MerchantCategoryRto category
) {

    public static MerchantRto from(Merchant merchant) {
        return new MerchantRto(
                merchant.getId(),
                merchant.getName(),
                MerchantCategoryRto.from(merchant.getCategory())
        );
    }
}