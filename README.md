[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

# Buy Wise

Buy Wise is a web application that helps users make informed purchase decisions by calculating how much time they need to work to afford an item. It promotes mindful spending by visualizing the time cost of purchases relative to your salary.

## Features

- Calculate work time required for any purchase based on your salary
- Track purchase decisions (buy vs. don't buy)
- View spending statistics and patterns
- Monitor money and time saved from avoided purchases
- User authentication and personalized settings
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Tailwind CSS, TanStack Query, Vite
- **Backend**: Hono, Drizzle ORM, Better Auth
- **Runtime**: Bun.js
- **Database**: Turso (SQLite)
- **API**: oRPC for type-safe client-server communication

## Installation

### Prerequisites

- [Bun](https://bun.sh)
- [Turso](https://turso.tech) database

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/FelixAlexK/buy-wise.git
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

   ```bash
   cd frontend
   bun install
   ```

   ```bash
   cd backend
   bun install
   ```

3. Configure environment variables:

   ```
   Create a .env file in the backend directory with the following:
    TURSO_DATABASE_URL='libsql://...'
    TURSO_AUTH_TOKEN='...'
    CORS_ORIGIN='http://localhost:5173'
   ```

   Create a .env file in the frontend directory with the following:

   ```
   VITE_SERVER_URL='http://localhost:3000'
   ```

4. Start application:

   ```bash
   bun dev
   ```

## Usage

- Frontend: Accessible at http://localhost:5173/.
- Backend: API endpoints are available at http://localhost:3000/api and RPC at http://localhost:3000/rpc.

## Folder Structure

```
buy-wise/
├── backend/                    # Backend API and database logic
│   ├── src/
│   │   ├── db/                # Database schemas and connection
│   │   ├── lib/               # Authentication and utilities
│   │   ├── routers/           # API route handlers
│   │   ├── services/          # Business logic services
│   │   └── validators/        # Zod validation schemas
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── lib/               # Client-side utilities
│   │   └── utils/             # Helper functions
├── README.md                   # Project documentation

```

## How It Works

1. **Set Your Settings**: Enter your monthly salary and weekly working hours
2. **Enter Purchase Amount**: Input the price of an item you're considering
3. **See Time Cost**: The app calculates how many hours/days you need to work to afford it
4. **Make Decision**: Choose to buy or skip the purchase
5. **Track Progress**: View statistics on money saved and time preserved

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Future Development

We have ambitious plans for Buy Wise! Check out these documents:

- **[IDEAS.md](IDEAS.md)** - Comprehensive list of development ideas organized by category
- **[ROADMAP.md](ROADMAP.md)** - Phased implementation timeline with priorities

Contributions and feedback on these ideas are welcome!

## License

This project is licensed under the MIT License.

## Notes on Turso Database

- Turso is a cloud-hosted SQLite database service that provides edge replication and scaling.
- The database configuration is handled in the [`drizzle.config.ts`](backend/drizzle.config.ts) file.
- For more information, visit the [Turso documentation](https://docs.turso.tech/).
