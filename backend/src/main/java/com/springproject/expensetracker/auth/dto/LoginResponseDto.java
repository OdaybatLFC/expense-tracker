package com.springproject.expensetracker.auth.dto;

import com.springproject.expensetracker.user.entity.Role;

public record LoginResponseDto(

        String token,

        Long userId,

        String email,

        Role role

){}