--liquibase formatted sql

--changeset aleksandar:004

CREATE TABLE merchants (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_merchants_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_merchants_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_merchants_user_name
        UNIQUE (user_id, name)
);

CREATE INDEX idx_merchants_user_id
    ON merchants(user_id);

CREATE INDEX idx_merchants_category_id
    ON merchants(category_id);