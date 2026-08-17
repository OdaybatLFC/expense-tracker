--liquibase formatted sql

--changeset aleksandar:006

CREATE TABLE budgets (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    amount NUMERIC(19, 4) NOT NULL,
    period VARCHAR(20) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_budgets_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_budgets_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_budgets_amount
        CHECK (amount > 0),

    CONSTRAINT chk_budgets_period
        CHECK (period IN ('DAILY', 'WEEKLY', 'MONTHLY')),

    CONSTRAINT uq_budgets_user_category_period
        UNIQUE (user_id, category_id, period)
);

CREATE INDEX idx_budgets_user_id
    ON budgets(user_id);