# 💼 Asset Tracker – MVP & Roadmap

A web application to track investments, visualize performance, and calculate metrics like XIRR, invested value, and current value. Built with **Next.js**, **DynamoDB**, and deployed on **Vercel**.

---

## 🚀 MVP Scope (Phase 1)

### 🔧 Tech Stack
- **Frontend**: Next.js (Vercel Hosting)
- **Backend**: Serverless API routes (Next.js API)
- **Database**: AWS DynamoDB (Free Tier)
- **Authentication**: NextAuth (google authentication for now)
- **Cache**: Plan to separate endpoints/events for caching `invested_value`, `current_value`, `xirr`, and chart data.

### 📦 Features
- Multi-user support with secure authentication.
- CRUD for assets linked to user-specific accounts.
- Metrics calculation:
  - Invested Value
  - Current Value
  - XIRR
- Basic dashboard with charts (e.g., line chart of portfolio value).
- Transaction events stored as time series per asset/account.
- Third-party NAV APIs planned for updating market values (manual for MVP).

---

## 📅 Future Enhancements (Phase 2+)

### 👥 Collaboration
- Shared portfolios (view/edit access)
- Comments or tagging feature for assets

### 📊 Advanced Reporting
- Capital gains tracking
- Tax impact estimation
- Goal-based planning (e.g., retirement, school)

### 💰 Monetization
- Freemium subscription model (basic vs premium features)
- Affiliate integration with brokers (e.g., Zerodha, Groww)
- API-as-a-service for B2B fintech usage
- White-labeled dashboard for advisors

### 📡 Integrations
- Auto NAV sync via 3rd-party APIs
- Export data to CSV/PDF
- Push notifications for value dips or profit thresholds

### 🛡️ Compliance & Security
- Align with India's DPDP Act and/or GDPR
- Secure storage with encryption-at-rest
- Data minimization: no PAN/Aadhaar unless mandatory
- Add disclaimers to clarify no investment advice offered

---

## ⚠️ Notes
- AWS DynamoDB Free Tier should be sufficient for early usage (up to 25 GB, 200M+ requests/month).
- Will switch to provisioned throughput or multi-region replication if scale demands.
- Plan caching layer or DAX if needed for performance.

---
### 📚 Table Schema - Assets

| **Attribute**        | **Type**          | **Description**                                          |
| -------------------- | ----------------- | -------------------------------------------------------- |
| **AssetId**          | String (PK)       | Unique identifier for each asset.                        |
| **UserId**           | String            | (Optional) The user who owns the asset.                  |
| **AssetName**        | String            | Name/description of the asset (e.g., "Equity Fund").     |
| **AssetType**        | String            | Type of asset (e.g., "Equity", "Bond", "Real Estate").   |
| **InvestmentAmount** | Number            | The current value or amount of the asset.                |
| **Quantity**         | Number            | Quantity of the asset (e.g., number of units, shares).   |
| **DateAcquired**     | String (ISO 8601) | Date the asset was acquired.                             |
| **AssetValue**       | Number            | Current value of the asset (could be updated over time). |
| **Category**         | String            | Category of the asset (e.g., "Stocks", "Bonds").         |




**Primary Key:**

    Partition Key (PK): AssetId (Unique identifier for each asset)

    Sort Key (SK): UserId (Optional, if multi-user support is needed)

**Indexes:**

    Global Secondary Index (GSI):

        Index on UserId and AssetType for fast lookups of assets by user or type.


### 📚 Table Schema - User

| **Attribute**      | **Type**          | **Description**                                        |
| ------------------ | ----------------- | ------------------------------------------------------ |
| **UserId**         | String (PK)       | Unique identifier for the user.                        |
| **Email**          | String            | User’s email address (can be used for authentication). |
| **Name**           | String            | User’s name.                                           |
| **AccountBalance** | Number            | The total balance of assets the user has.              |
| **DateJoined**     | String (ISO 8601) | Date when the user registered.                         |



**Primary Key:**

    Partition Key (PK): UserId



### 📚 Table Schema - Transactions

| **Attribute**          | **Type**          | **Description**                                          |
| ---------------------- | ----------------- | -------------------------------------------------------- |
| **TransactionId**      | String (PK)       | Unique identifier for each transaction.                  |
| **AssetId**            | String (FK)       | The ID of the asset involved in the transaction.         |
| **UserId**             | String (FK)       | The user who initiated the transaction (if multi-user).  |
| **TransactionType**    | String            | Type of transaction (e.g., "Buy", "Sell", "Adjustment"). |
| **Amount**             | Number            | The amount of money involved in the transaction.         |
| **QuantityChanged**    | Number            | Quantity of the asset added or removed.                  |
| **TransactionDate**    | String (ISO 8601) | Date and time the transaction occurred.                  |
| **TransactionDetails** | String            | Any additional details regarding the transaction.        |

**Primary Key:**
    
    Partition Key (PK): TransactionId (Unique identifier for each transaction)

Sort Key (SK) (Optional, depending on access patterns):

    You can use AssetId or UserId as the sort key to enable queries related to a specific asset or user.

Indexes

    Global Secondary Index (GSI) on AssetId and TransactionDate:

        GSI Partition Key: AssetId (allows querying transactions by asset)

        GSI Sort Key: TransactionDate (allows ordering transactions by date)

    GSI on UserId and TransactionDate (Optional):

        GSI Partition Key: UserId (useful for querying all transactions by a user)

        GSI Sort Key: TransactionDate (ordering transactions for a specific user)