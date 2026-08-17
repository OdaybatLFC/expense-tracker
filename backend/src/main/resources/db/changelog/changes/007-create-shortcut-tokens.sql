--liquibase formatted sql

--changeset aleksandar:008

CREATE TABLE shortcut_tokens (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,

    token_hash VARCHAR(255) NOT NULL UNIQUE,

    expires_at TIMESTAMP,
    revoked_at TIMESTAMP,
    last_used_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_shortcut_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_shortcut_tokens_user_id
    ON shortcut_tokens(user_id);

CREATE INDEX idx_shortcut_tokens_expires_at
    ON shortcut_tokens(expires_at);