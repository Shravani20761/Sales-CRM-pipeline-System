# Sales CRM Backend

A backend system for a Sales CRM built using Node.js, Express, and PostgreSQL, designed to be hosted on NeonDB. It includes Role-Based Access Control (RBAC), JWT authentication, and structured endpoints for leads, deals, and activity tracking.

## Features

- **Authentication**: JWT-based login and registration using bcrypt for password hashing.
- **RBAC**: Three roles (`admin`, `manager`, `sales_rep`) with different permissions.
- **Leads Management**: Restricted views where sales reps only see their assigned leads.
- **Deals Management**: Managers can approve or reject deals.
- **Activity Logging**: Track `created_lead`, `updated_lead`, `approved_deal`, etc.

## Prerequisites
- Node.js (v14 or newer)
- PostgreSQL Database URL (e.g., from NeonDB)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill out your NeonDB PostgreSQL connection string and a random `JWT_SECRET`.
   ```bash
   copy .env.example .env
   ```

3. **Initialize the Database**
   Run the initialization script to create tables and default roles (`admin`, `manager`, `sales_rep`).
   ```bash
   node initDb.js
   ```

4. **Start the Development Server**
   ```bash
   node server.js
   ```
