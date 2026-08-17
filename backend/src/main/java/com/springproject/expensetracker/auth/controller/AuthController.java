package com.springproject.expensetracker.auth.controller;

import com.springproject.expensetracker.auth.dto.*;
import com.springproject.expensetracker.auth.security.UserPrincipal;
import com.springproject.expensetracker.auth.service.AuthService;
import com.springproject.expensetracker.user.dto.CurrentUserResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;


    @PostMapping("/login")
    public LoginResponseDto login(
            @RequestBody LoginRequestDto request
    ){

        return authService.login(request);

    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponseDto register(
            @Valid
            @RequestBody RegisterRequestDto request
    ) {

        return authService.register(request);

    }

    @GetMapping("/me")
    public CurrentUserResponseDto me(
            @AuthenticationPrincipal UserPrincipal user
    ) {

        return new CurrentUserResponseDto(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

    }

}
