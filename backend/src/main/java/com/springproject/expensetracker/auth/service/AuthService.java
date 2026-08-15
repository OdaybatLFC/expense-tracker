package com.springproject.expensetracker.auth.service;

import com.springproject.expensetracker.auth.dto.*;
import com.springproject.expensetracker.auth.entity.User;
import com.springproject.expensetracker.auth.exception.EmailAlreadyExistsException;
import com.springproject.expensetracker.auth.exception.InvalidCredentialsException;
import com.springproject.expensetracker.auth.repository.UserRepository;
import com.springproject.expensetracker.auth.security.UserPrincipal;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;



    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);


        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword()
        )) {
            throw new InvalidCredentialsException();
        }


        UserPrincipal principal = new UserPrincipal(user);


        String token = jwtService.generateToken(principal);


        return new LoginResponseDto(
                token,
                principal.getId(),
                principal.getEmail(),
                principal.getRole()
        );
    }

    @Transactional
    public RegisterResponseDto register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(request.email());
        }

        User user = new User();

        user.setEmail(request.email());

        user.setPassword(
                passwordEncoder.encode(request.password())
        );

        user.setRole(request.role());

        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        return new RegisterResponseDto(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

}
