package com.springproject.expensetracker.category.service;

import com.springproject.expensetracker.category.dto.CategoryDto;
import com.springproject.expensetracker.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAllByOrderByIdAsc()
                .stream()
                .map(CategoryDto::from)
                .toList();
    }
}
