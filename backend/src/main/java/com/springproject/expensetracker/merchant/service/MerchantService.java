package com.springproject.expensetracker.merchant.service;

import com.springproject.expensetracker.category.entity.Category;
import com.springproject.expensetracker.category.repository.CategoryRepository;
import com.springproject.expensetracker.merchant.dto.MerchantRto;
import com.springproject.expensetracker.merchant.entity.Merchant;
import com.springproject.expensetracker.merchant.repository.MerchantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MerchantService {

    private final MerchantRepository merchantRepository;
    private final CategoryRepository categoryRepository;

    public List<MerchantRto> getMerchants(Long userId, String search) {
        List<Merchant> merchants;

        if (StringUtils.hasText(search)) {
            merchants = merchantRepository
                    .findByUser_IdAndNameContainingIgnoreCaseOrderByNameAsc(
                            userId,
                            search.trim()
                    );
        } else {
            merchants = merchantRepository
                    .findByUser_IdOrderByNameAsc(userId);
        }

        return merchants.stream()
                .map(MerchantRto::from)
                .toList();
    }

    @Transactional
    public MerchantRto updateMerchantCategory(
            Long userId,
            Long merchantId,
            Long categoryId
    ) {
        Merchant merchant = merchantRepository
                .findByIdAndUser_Id(merchantId, userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Merchant not found"
                ));

        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Category not found"
                ));

        merchant.setCategory(category);

        /*
         * No explicit save() is required here.
         * merchantName is a managed entity, so Hibernate dirty checking
         * updates its category_id when the transaction commits.
         */

        return MerchantRto.from(merchant);
    }
}