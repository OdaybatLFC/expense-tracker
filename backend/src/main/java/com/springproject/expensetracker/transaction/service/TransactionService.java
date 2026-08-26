package com.springproject.expensetracker.transaction.service;

import com.springproject.expensetracker.category.entity.Category;
import com.springproject.expensetracker.category.repository.CategoryRepository;
import com.springproject.expensetracker.common.dto.PageResponseDto;
import com.springproject.expensetracker.merchant.entity.Merchant;
import com.springproject.expensetracker.merchant.repository.MerchantRepository;
import com.springproject.expensetracker.transaction.dto.CreateTransactionDto;
import com.springproject.expensetracker.transaction.dto.TransactionRto;
import com.springproject.expensetracker.transaction.entity.Transaction;
import com.springproject.expensetracker.transaction.entity.TransactionSource;
import com.springproject.expensetracker.transaction.entity.TransactionType;
import com.springproject.expensetracker.transaction.repository.TransactionRepository;
import com.springproject.expensetracker.user.entity.User;
import com.springproject.expensetracker.user.repository.UserRepository;
import com.springproject.expensetracker.utils.DateUtils;
import com.springproject.expensetracker.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final MerchantRepository merchantRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public TransactionRto createTransaction(
            Long userId,
            CreateTransactionDto request
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"
                ));

        Merchant merchant = merchantRepository
                .findByUser_IdAndName(
                        userId,
                        request.merchantName().trim()
                )
                .orElse(null);

        Category otherCategory = categoryRepository
                .findByCode("OTHER")
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "OTHER category is not configured"
                ));

        Transaction transaction = new Transaction();

        transaction.setUser(user);
        transaction.setMerchant(merchant);
        transaction.setType(request.type());
        transaction.setSource(TransactionSource.MANUAL);
        transaction.setAmount(request.amount());
        transaction.setCurrency(
                request.currency().toUpperCase(Locale.ROOT)
        );
        transaction.setDescription(request.description());
        transaction.setTransactionDate(request.transactionDate());

        Transaction savedTransaction =
                transactionRepository.save(transaction);

        return TransactionRto.from(
                savedTransaction,
                otherCategory
        );
    }

    public PageResponseDto<TransactionRto> getTransactions(
            Long userId,
            TransactionType type,
            String search,
            LocalDate from,
            LocalDate to,
            Pageable pageable
    ) {
        DateUtils.validateDateRange(from, to);

        String normalizedSearch = StringUtils.normalizeSearch(search);

        LocalDateTime fromDateTime = from == null
                ? null
                : from.atStartOfDay();

        /*
         * The upper date boundary is exclusive.
         *
         * For to=2026-08-31:
         * toDateExclusive=2026-09-01T00:00:00
         *
         * This includes every transaction on August 31.
         */
        LocalDateTime toDateExclusive = to == null
                ? null
                : to.plusDays(1).atStartOfDay();

        Page<Transaction> transactions =
                transactionRepository.findForUser(
                        userId,
                        type,
                        normalizedSearch,
                        fromDateTime,
                        toDateExclusive,
                        pageable
                );

        Category otherCategory = categoryRepository
                .findByCode("OTHER")
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "OTHER category is not configured"
                ));

        Page<TransactionRto> response =
                transactions.map(transaction ->
                        TransactionRto.from(
                                transaction,
                                otherCategory
                        )
                );

        return PageResponseDto.from(response);
    }

}