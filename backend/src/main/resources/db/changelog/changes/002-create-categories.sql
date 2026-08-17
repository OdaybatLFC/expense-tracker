--liquibase formatted sql

--changeset aleksandar:003

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    icon VARCHAR(100),

    CONSTRAINT chk_categories_type
        CHECK (type IN ('EXPENSE', 'INCOME', 'BOTH'))
);

--changeset aleksandar:003-seed

INSERT INTO categories (code, name, type, icon) VALUES
    ('FOOD', 'Food', 'EXPENSE', 'restaurant'),
    ('RESTAURANTS', 'Restaurants', 'EXPENSE', 'restaurant'),
    ('GROCERIES', 'Groceries', 'EXPENSE', 'shopping-cart'),
    ('TRANSPORT', 'Transport', 'EXPENSE', 'car'),
    ('SHOPPING', 'Shopping', 'EXPENSE', 'shopping-bag'),
    ('ENTERTAINMENT', 'Entertainment', 'EXPENSE', 'film'),
    ('BILLS', 'Bills', 'EXPENSE', 'receipt'),
    ('RENT', 'Rent', 'EXPENSE', 'home'),
    ('SUBSCRIPTIONS', 'Subscriptions', 'EXPENSE', 'repeat'),
    ('HEALTH', 'Health', 'EXPENSE', 'heart'),
    ('SPORTS', 'Sports', 'EXPENSE', 'activity'),
    ('TRAVEL', 'Travel', 'EXPENSE', 'plane'),
    ('SALARY', 'Salary', 'INCOME', 'briefcase'),
    ('FREELANCE', 'Freelance', 'INCOME', 'laptop'),
    ('OTHER', 'Other', 'BOTH', 'more-horizontal');