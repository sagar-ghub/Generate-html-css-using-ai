# Project Setup Guide

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Superset of JavaScript for static typing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadcnUI**: Pre-built UI components built on Tailwind CSS.
- **NextAuth.js**: Authentication solution for Next.js.
- **Prisma**: Type-safe ORM for PostgreSQL.
- **PostgreSQL**: Relational database for data storage.
- **Vercel's AI SDK**: Integration with AI/GenAI capabilities for dynamic HTML/CSS generation.

## Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- **PostgreSQL Database** (Supabase or NeonDB recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
DATABASE_URL=your_postgres_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Prisma Setup

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```
2. **Run Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Pages

- **/auth/signin**: Sign-in page using NextAuth.js.
- **/chat**: Chat interface for HTML/CSS code generation.

## Authentication Setup

Using **NextAuth.js** with **Credentials Provider** for email/password authentication. You can also add social providers if needed.

## Using Vercel's AI SDK

Integrate the AI SDK for generating HTML/CSS:

- Configure the API endpoint and request handling in the `/api` directory.
- Ensure proper API key management via environment variables.

## Additional Information

- **Tailwind CSS**: Used for fast and consistent styling.
- **ShadcnUI**: Provides pre-built, customizable UI components for rapid development.
- **Prisma**: Simplifies database interactions with a clean, type-safe API.
- **Vercel**: Deployed on Vercel for seamless CI/CD and hosting.

## Commands

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run start`**: Start the production server.
- **`npx prisma studio`**: Launch Prisma Studio for database management.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for discussion.

---

**Note**: Ensure that all sensitive information (like API keys) is securely stored and not committed to the repository.
