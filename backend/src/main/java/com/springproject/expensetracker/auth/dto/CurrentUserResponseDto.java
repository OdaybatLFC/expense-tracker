package com.springproject.expensetracker.auth.dto;

import com.springproject.expensetracker.auth.entity.Role;

public record CurrentUserResponseDto(

        Long id,
        String email,
        Role role

) {
}