# Node.js Project Setup

This is a Node.js project using PostgreSQL as the database. Below are the steps to set up the project locally.

## Prerequisites

- Node.js (= 18.x)
- pnpm (>= 8.x)
- PostgreSQL (installed and running)

## Steps to Set Up

### 1. Clone the Repository

First, clone the project repository:

```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Install Dependencies
After navigating into the project directory, install the required dependencies using pnpm:

```bash
cd server
pnpm install
```

### 3. Create Environment File
Create a .env.dev file in the root of your project and add the following environment variables:

```bash
NODE_ENV='development'
PORT=8000
PG_USER='user_name'
PG_HOST='host'
PG_DB_NAME='dbname'
PG_PASSWORD='password'
DIALECT='postgres'
```
Make sure to replace the placeholders (user_name, host, dbname, and password) with your actual PostgreSQL database credentials.

4. Run the Server
To start the development server, run the following command:

```bash
pnpm run dev
```
The server should now be running at http://localhost:8000.