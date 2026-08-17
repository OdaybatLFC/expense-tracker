package com.springproject.expensetracker.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name="users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique=true)
    private String email;


    private String password;


    private String firstName;


    private String lastName;


    @Enumerated(EnumType.STRING)
    private Role role;


    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;

    public Collection<? extends GrantedAuthority> getAuthorities(){

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + role.name()
                )
        );
    }

}