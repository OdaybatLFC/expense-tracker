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
