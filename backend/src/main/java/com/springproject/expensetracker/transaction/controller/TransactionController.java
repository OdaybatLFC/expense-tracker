package com.springproject.expensetracker.transaction.controller;

import com.springproject.expensetracker.common.dto.PageResponseDto;
import com.springproject.expensetracker.transaction.dto.CreateTransactionDto;
import com.springproject.expensetracker.transaction.dto.TransactionRto;
import com.springproject.expensetracker.transaction.entity.TransactionType;
import com.springproject.expensetracker.transaction.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionRto createTransaction(
            @Valid @RequestBody CreateTransactionDto request,
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        return transactionService.createTransaction(
                userId,
                request
        );
    }

    @GetMapping
    public PageResponseDto<TransactionRto> getTransactions(
            @AuthenticationPrincipal(expression = "id") Long userId,

            @RequestParam(required = false)
            TransactionType type,

            @RequestParam(required = false)
            String search,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate from,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate to,

            @PageableDefault(size = 20)
            Pageable pageable
    ) {
        return transactionService.getTransactions(
                userId,
                type,
                search,
                from,
                to,
                pageable
        );
    }
}