package com.springproject.expensetracker.auth.dto;

import com.springproject.expensetracker.auth.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDto (

        @Email
        @NotBlank
        String email,

        @NotBlank
        @Size(min = 6)
        String password

) {
}
