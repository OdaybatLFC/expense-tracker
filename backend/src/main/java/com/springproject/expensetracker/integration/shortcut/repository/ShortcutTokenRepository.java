package com.springproject.expensetracker.integration.shortcut.repository;

import com.springproject.expensetracker.integration.shortcut.entity.ShortcutToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShortcutTokenRepository
        extends JpaRepository<ShortcutToken, Long> {

    Optional<ShortcutToken> findByTokenHash(String tokenHash);

    Optional<ShortcutToken> findByIdAndUserId(
            Long id,
            Long userId
    );
}