--liquibase formatted sql

--changeset aleksandar:001

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--changeset aleksandar:002

ALTER TABLE users
    ADD COLUMN name VARCHAR(255) NOT NULL,
    ADD COLUMN default_currency VARCHAR(3) NOT NULL DEFAULT 'EUR';