package com.springproject.expensetracker.merchant.controller;

import com.springproject.expensetracker.merchant.dto.MerchantRto;
import com.springproject.expensetracker.merchant.dto.UpdateMerchantCategoryDto;
import com.springproject.expensetracker.merchant.service.MerchantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/merchants")
public class MerchantController {

    private final MerchantService merchantService;

    @GetMapping
    public List<MerchantRto> getMerchants(
            @RequestParam(required = false) String search,
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        return merchantService.getMerchants(
                userId,
                search
        );
    }

    @PatchMapping("/{merchantId}/category")
    public MerchantRto updateMerchantCategory(
            @PathVariable Long merchantId,
            @Valid @RequestBody UpdateMerchantCategoryDto request,
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        return merchantService.updateMerchantCategory(
                userId,
                merchantId,
                request.categoryId()
        );
    }
}