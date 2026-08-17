# Domain Model

This is the core of the application.

```text
                         ┌──────────────┐
                         │     User     │
                         ├──────────────┤
                         │ id           │
                         │ email        │
                         │ passwordHash │
                         │ name         │
                         │ currency     │
                         │ createdAt    │
                         │ updatedAt    │
                         └──────┬───────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
       ┌───────────┐     ┌──────────────┐   ┌───────────────┐
       │ Merchant  │     │ Transaction  │   │    Budget     │
       └─────┬─────┘     └──────┬───────┘   └───────┬───────┘
             │                  │                   │
             │                  │                   │
             ▼                  ▼                   ▼
       ┌───────────┐       Merchant            Category
       │ Category  │
       └───────────┘
```

## Entity Relationships

### User

```text
User
 │
 ├── 1:N ── Transaction
 │
 ├── 1:N ── Merchant
 │
 ├── 1:N ── Budget
 │
 ├── 1:N ── ShortcutToken
 │
 └── 1:N ── RefreshToken
```

### Merchant

```text
Merchant
 │
 └── N:1 ── Category
```

### Transaction

```text
Transaction
 │
 └── N:1 ── Merchant
```

### Budget

```text
Budget
 │
 └── N:1 ── Category
```
