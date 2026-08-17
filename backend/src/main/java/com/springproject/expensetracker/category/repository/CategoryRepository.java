package com.springproject.expensetracker.category.repository;

import com.springproject.expensetracker.category.entity.Category;
import com.springproject.expensetracker.category.entity.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByCode(String code);

    List<Category> findByType(CategoryType type);
}