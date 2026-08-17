# Expense Tracker

A modern personal expense tracking application for iOS, built with React Native and Spring Boot.

The application allows users to track expenses and income manually or automatically through an iPhone Shortcut.

## Overview

The main goal of the application is to make expense tracking as automatic and effortless as possible.

Users can:

- Track expenses and income
- Automatically categorize transactions
- Create transactions manually
- Create transactions through an iPhone Shortcut
- Track budgets
- Analyze spending by category
- View weekly, monthly and yearly analytics
- Manage their profile and preferences
- Use multiple currencies with automatic conversion to their default currency

There are currently no bank, Open Banking or direct bank API integrations.

## Architecture

The application uses a modular monolith architecture.

```text
React Native iOS
       |
       | HTTPS + JWT
       |
       v
Spring Boot REST API
       |
       v
PostgreSQL

# Main Features

## Authentication

- User registration
- Login
- JWT authentication
- Refresh tokens
- Logout
- Role-based authorization

## Home

The home screen provides:

- Current balance
- Total income
- Total expenses
- Monthly budget
- Top spending categories
- Recent transactions

## Transactions

Users can:

- Create transactions
- View transactions
- Search transactions
- Filter by income or expense
- Sort transactions
- Delete transactions

Transactions are immutable after creation.

Transactions can originate from:

- Manual input
- iPhone Shortcut

## Automatic Categorization

Transactions are associated with a merchant.

```text
Transaction
     |
     v
Merchant
     |
     v
Category
```

For example:

| Merchant | Category |
|---|---|
| McDonald's | Restaurants |
| Lidl | Groceries |
| Spotify | Subscriptions |
| Tennis Club | Sports |

If a merchant cannot be recognized, the transaction is assigned to `OTHER`.

Merchants are user-specific because different users may want different classifications.

## Budgets

Users can create budgets for categories using:

- Daily
- Weekly
- Monthly

Budget spending is calculated dynamically from transactions.

## Analytics

Analytics are calculated dynamically and are not stored as separate analytics records.

Available analytics include:

- Weekly analytics
- Monthly analytics
- Yearly analytics
- Total income
- Total expenses
- Net balance
- Income vs. expenses
- Spending by category
- Budget progress

## Currency

Each user has a default currency.

Transactions preserve their original currency and amount while also storing the converted amount in the user's default currency.

### Example

**Original:**

```text
100 USD
```

**Converted:**

```text
85.20 EUR
```

**Exchange rate:**

```text
0.852
```

This allows the application to preserve the original transaction while performing analytics using a consistent currency.

## iPhone Shortcut

The application supports creating transactions through an iPhone Shortcut.

```text
iPhone Shortcut
      |
      | HTTPS
      v
Spring Boot API
      |
      v
Transaction Service
      |
      v
Merchant / Category
      |
      v
Transaction
```

Shortcut-created transactions are marked with:

```text
source = SHORTCUT
```

Manually created transactions use:

```text
source = MANUAL
```

## Database

The application uses PostgreSQL.

Database schema changes are managed using Liquibase.

### Liquibase Changelog Structure

```text
db/changelog/
├── db.changelog-master.yaml
├── 001-create-users.yaml
├── 002-add-user-profile.yaml
├── 003-create-categories.yaml
├── 004-create-merchants.yaml
├── 005-create-transactions.yaml
├── 006-create-budgets.yaml
├── 007-create-refresh-tokens.yaml
└── 008-create-shortcut-tokens.yaml
```

Existing migrations should not be modified after they have been executed.

New schema changes should always be introduced through a new Liquibase changeset.

## Technology Stack

### Backend

- Java 17+
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- PostgreSQL
- Liquibase
- Maven
- JUnit
- Mockito

### Frontend

- React Native
- TypeScript
- Expo
- Axios

## Development

### Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Start the Mobile Application

```bash
cd mobile
npm start
```

## Development Principles

The project follows:

- Clean Code principles
- SOLID principles
- RESTful API design
- Feature-oriented package structure
- DTO-based API contracts
- Database migrations with Liquibase
- Automated testing
- Secure authentication
- Explicit domain boundaries
```̀
