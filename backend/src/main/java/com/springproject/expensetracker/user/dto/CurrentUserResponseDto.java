package com.springproject.expensetracker.user.dto;

import com.springproject.expensetracker.user.entity.Role;

public record CurrentUserResponseDto(

        Long id,
        String email,
        String firstName,
        Role role

) {
}