\# Expense Tracker



A full-stack Expense Tracker application built with \*\*ASP.NET Core Web API\*\*, \*\*Entity Framework Core\*\*, \*\*SQL Server LocalDB\*\*, \*\*JWT Authentication\*\*, and \*\*Angular\*\*.



The application allows users to register, log in, manage income and expense transactions, view financial summaries, and track spending by categories.



\---



\## Features



\### Authentication

\- User registration

\- User login

\- JWT-based authentication

\- Protected API endpoints

\- Token-based frontend authorization

\- Logout functionality



\### Dashboard

\- Total income calculation

\- Total expense calculation

\- Current balance calculation

\- Recent transactions table

\- User-specific data display



\### Transactions

\- Add income and expense transactions

\- Edit existing transactions

\- Delete transactions

\- Filter transactions by:

&#x20; - All

&#x20; - Income

&#x20; - Expense

\- Transaction fields:

&#x20; - Title

&#x20; - Amount

&#x20; - Type

&#x20; - Category

&#x20; - Date

&#x20; - Description



\### Categories / Reports

\- Expense grouping by category

\- Total amount per category

\- Percentage calculation per category



\---



\## Tech Stack



\### Backend

\- ASP.NET Core Web API

\- Entity Framework Core

\- SQL Server LocalDB

\- JWT Authentication

\- Dependency Injection

\- DTOs

\- Services

\- Middleware

\- REST API



\### Frontend

\- Angular

\- TypeScript

\- HTML

\- CSS

\- Angular Standalone Components

\- Angular Router

\- Angular Services

\- HTTP Client

\- JWT Interceptor

\- Signals



\### Database

\- SQL Server LocalDB

\- Entity Framework Core Migrations



\---



\## Project Structure



```text

ExpenseTracker

│

├── backend

│   ├── ExpenseTracker.slnx

│   └── ExpenseTracker

│       ├── Controllers

│       ├── Data

│       ├── DTOs

│       ├── Middlewares

│       ├── Migrations

│       ├── Models

│       ├── Services

│       ├── appsettings.json

│       └── Program.cs

│

├── frontend

│   ├── public

│   └── src

│       └── app

│           ├── core

│           │   ├── services

│           │   └── interceptors

│           ├── pages

│           │   ├── login

│           │   ├── register

│           │   ├── dashboard

│           │   ├── transactions

│           │   └── categories

│           ├── app.config.ts

│           ├── app.routes.ts

│           └── app.ts

│

├── .gitignore

└── README.md

```



\---



\## Backend Setup



\### Requirements



\- .NET SDK

\- SQL Server LocalDB

\- Visual Studio

\- Entity Framework Core tools



\### Run Backend



Go to the backend project folder:



```bash

cd backend/ExpenseTracker

```



Restore packages:



```bash

dotnet restore

```



Apply database migrations:



```bash

dotnet ef database update

```



Run the API:



```bash

dotnet run --launch-profile https

```



Backend will run on:



```text

https://localhost:7027

```



\---



\## Frontend Setup



\### Requirements



\- Node.js

\- npm

\- Angular CLI



\### Run Frontend



Go to the frontend folder:



```bash

cd frontend

```



Install dependencies:



```bash

npm install

```



Run Angular app:



```bash

ng serve --port 4200

```



Frontend will run on:



```text

http://localhost:4200

```



\---



\## Configuration



\### Backend Connection String



The backend uses SQL Server LocalDB.



Example:



```json

{

&#x20; "ConnectionStrings": {

&#x20;   "DefaultConnection": "Server=(localdb)\\\\MSSQLLocalDB;Database=ExpenseTrackerDb;Trusted\_Connection=True;TrustServerCertificate=True;"

&#x20; }

}

```



\### JWT Configuration



Example:



```json

{

&#x20; "Jwt": {

&#x20;   "Key": "YOUR\_SUPER\_SECRET\_KEY",

&#x20;   "Issuer": "ExpenseTrackerApi",

&#x20;   "Audience": "ExpenseTrackerClient",

&#x20;   "ExpiresInMinutes": 1440

&#x20; }

}

```



\---



\## API Endpoints



\### Authentication



| Method | Endpoint | Description |

|---|---|---|

| POST | `/api/auth/register` | Register new user |

| POST | `/api/auth/login` | Login user |

| GET | `/api/auth/me` | Get current authenticated user |



\### Transactions



| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/transactions` | Get all user transactions |

| GET | `/api/transactions?type=1` | Get income transactions |

| GET | `/api/transactions?type=2` | Get expense transactions |

| POST | `/api/transactions` | Create transaction |

| PUT | `/api/transactions/{id}` | Update transaction |

| DELETE | `/api/transactions/{id}` | Delete transaction |

| GET | `/api/transactions/balance` | Get income, expense and balance |

| GET | `/api/transactions/expenses-by-category` | Get expenses grouped by category |



\---



\## Main Backend Concepts Used



\- Controllers

\- DTOs

\- Services

\- Dependency Injection

\- Entity Framework Core

\- DbContext

\- Migrations

\- Relationships

\- JWT Authentication

\- Authorization

\- Middleware

\- CORS

\- REST API

\- HTTP status codes



\---



\## Main Frontend Concepts Used



\- Angular standalone components

\- Angular routing

\- Angular services

\- HTTP Client

\- JWT interceptor

\- Template binding

\- Two-way binding with `ngModel`

\- Signals

\- Conditional rendering

\- Lists rendering

\- Component-based UI structure



