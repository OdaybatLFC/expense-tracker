package com.springproject.expensetracker.budget.repository;

import com.springproject.expensetracker.budget.entity.Budget;
import com.springproject.expensetracker.budget.entity.BudgetPeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findAllByUserId(Long userId);

    Optional<Budget> findByIdAndUserId(
            Long id,
            Long userId
    );

    Optional<Budget> findByUserIdAndCategoryIdAndPeriod(
            Long userId,
            Long categoryId,
            BudgetPeriod period
    );
}