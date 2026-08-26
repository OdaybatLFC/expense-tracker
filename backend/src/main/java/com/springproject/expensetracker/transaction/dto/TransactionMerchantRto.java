package com.springproject.expensetracker.transaction.dto;

import com.springproject.expensetracker.merchant.entity.Merchant;

public record TransactionMerchantRto(
        Long id,
        String name
) {

    public static TransactionMerchantRto from(Merchant merchant) {
        if (merchant == null) {
            return null;
        }

        return new TransactionMerchantRto(
                merchant.getId(),
                merchant.getName()
        );
    }
}