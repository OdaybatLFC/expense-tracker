--liquibase formatted sql

--changeset aleksandar:005

CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,
    merchant_id BIGINT,

    type VARCHAR(20) NOT NULL,
    source VARCHAR(20) NOT NULL,

    amount NUMERIC(19, 4) NOT NULL,
    currency VARCHAR(3) NOT NULL,

    original_amount NUMERIC(19, 4),
    original_currency VARCHAR(3),
    exchange_rate NUMERIC(19, 8),

    description VARCHAR(500),
    transaction_date TIMESTAMP NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transactions_merchant
        FOREIGN KEY (merchant_id)
        REFERENCES merchants(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_transactions_type
        CHECK (type IN ('EXPENSE', 'INCOME')),

    CONSTRAINT chk_transactions_source
        CHECK (source IN ('MANUAL', 'SHORTCUT')),

    CONSTRAINT chk_transactions_amount
        CHECK (amount > 0),

    CONSTRAINT chk_transactions_original_amount
        CHECK (
            original_amount IS NULL
            OR original_amount > 0
        )
);

CREATE INDEX idx_transactions_user_id
    ON transactions(user_id);

CREATE INDEX idx_transactions_user_date
    ON transactions(user_id, transaction_date DESC);

CREATE INDEX idx_transactions_user_type
    ON transactions(user_id, type);

CREATE INDEX idx_transactions_merchant_id
    ON transactions(merchant_id);