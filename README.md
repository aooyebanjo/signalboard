# SignalBoard

SignalBoard is a data-driven web application built with Next.js, React, and TypeScript that brings together information from multiple external APIs through a unified, responsive interface.

The project demonstrates modern frontend engineering practices, including typed API boundaries, server and client component composition, runtime data validation, asynchronous data fetching and caching, pagination, prefetching, reusable component architecture, responsive design, and automated testing.

## Key Features

### Technology News

Browse technology stories sourced from Hacker News through a responsive, data-driven interface.

Key capabilities include:

- Incremental, paginated story loading with TanStack Query
- Server-state management and caching with TanStack Query
- Story prefetching to improve navigation responsiveness
- Server-side API routes for external API integration
- Runtime API response validation with Zod
- Responsive story cards
- Individual story detail views
- Loading and error-state handling

### Developer Profiles

Explore GitHub developer profiles and their public repositories through an interface backed by the GitHub REST API.

Key capabilities include:

- Developer profile lookup by GitHub username
- GitHub REST API integration
- Repository browsing
- Page-by-page repository pagination
- Pagination state derived from GitHub `Link` response headers
- Typed API responses
- Runtime API response validation
- Loading and error-state handling

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | Application framework, App Router, and server-side API routes |
| React 19 | Component-based user interface |
| TypeScript | Static type checking and application contracts |
| TanStack Query | Server-state management, caching, pagination, and prefetching |
| Zod | Runtime schema validation for external API data |
| Tailwind CSS 4 | Responsive, utility-first styling |
| Vitest | Unit testing |
| React Testing Library | Component testing and user-focused UI testing |
| Lucide React | UI icons |
| date-fns | Date formatting and manipulation |

## Architecture

SignalBoard uses a feature-oriented architecture that separates application routing, shared UI, feature-specific logic, data access, runtime validation, and reusable infrastructure.

```text
signalboard/
├── app/          # Next.js routes, layouts, pages, and API route handlers
├── components/   # Shared layout and reusable UI components
├── features/     # Feature-specific application code
├── hooks/        # Shared React and data-fetching hooks
├── lib/          # Shared utilities and error-handling infrastructure
├── providers/    # Application-level React providers
└── test/         # Test configuration and shared test infrastructure

features/
├── developers/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── schemas/
│   ├── types/
│   └── utils/
└── stories/
    ├── api/
    ├── components/
    ├── schemas/
    ├── types/
    └── utils/


## Data & API Architecture

SignalBoard uses Next.js API route handlers as an application boundary between the browser and external services.

For example, Technology stories follow this request flow:

```text
React UI
   ↓
TanStack Query
   ↓
SignalBoard API client
   ↓
Next.js API route
   ↓
External Hacker News API
   ↓
Runtime validation and data mapping
   ↓
SignalBoard domain model
   ↓
Validated API response
   ↓
TanStack Query cache
   ↓
React UI
```

External API responses are treated as untrusted data and validated at runtime with Zod before being mapped into application-specific domain models. API responses consumed by the client are also validated before being used by the UI.

This approach keeps third-party API structures from leaking directly into presentation components and establishes clear boundaries between external data, server-side integration, client-side data access, and the user interface.

Server-only integrations are explicitly isolated from client-side code, while shared API error handling provides consistent responses for validation failures, unavailable upstream services, and unexpected errors.


## Data Fetching, Caching & Prefetching

SignalBoard uses TanStack Query to manage asynchronous server state, caching, pagination, and prefetching.

Technology stories are loaded with an infinite query. TanStack Query stores the loaded pages as part of the infinite query cache, and additional pages are requested as the user loads more stories.

Story detail navigation uses the query cache to reduce unnecessary loading. When a story is already available in the cached story list, that data can be used as the initial data for its detail query while preserving the original cache timestamp.

SignalBoard also prefetches individual story details when a user hovers over or keyboard-focuses a story link. The prefetched data is stored under the story's detail query key so it can already be available in the cache when the user navigates to the story.

```text
Story List
   │
   ├── Cached list data ──────────────┐
   │                                  ↓
   │                         Detail query initial data
   │
   └── Hover / keyboard focus
                 ↓
          Prefetch detail query
                 ↓
          TanStack Query cache
                 ↓
            Story Detail
```

These strategies allow the UI to reuse data that has already been retrieved while still allowing TanStack Query to determine when cached data should be refreshed.


## Runtime Validation & Type Safety

SignalBoard combines TypeScript with Zod to protect both compile-time and runtime data boundaries.

TypeScript provides static typing throughout the application, while data received from APIs is initially treated as `unknown`. Zod schemas validate external responses before the data is used by the application.

For example, Hacker News responses are validated before being mapped from the external API representation into SignalBoard's internal `Story` model. Query parameters and responses from SignalBoard's own API routes are also validated at runtime.

This provides two complementary layers of protection:

- **TypeScript** — catches type-related issues during development and compilation.
- **Zod** — verifies that data received at runtime actually matches the structure the application expects.

Keeping external API models separate from internal application models also allows SignalBoard to normalize third-party data before it reaches UI components.


## Testing

SignalBoard uses Vitest and React Testing Library to test behavior across API routes, UI interactions, pagination logic, data transformations, and domain calculations.

The test suite includes:

- **API route tests** — verify response status, pagination behavior, error handling, and interaction with external-service abstractions.
- **Component tests** — exercise user-facing behavior such as loading additional pages, displaying error states, and retrying failed requests.
- **Utility tests** — verify pagination calculations and transformation of external API data into SignalBoard domain models.
- **Domain logic tests** — verify derived developer insights such as repository totals, language counts, most-starred repositories, and recently updated repositories.

External API dependencies are mocked where appropriate so application behavior can be tested independently of live third-party services.

Tests can be run with:

```bash
npm test

or as a single non-watch run:

```bash
npm run test:run

## Getting Started

### Prerequisites

Before running SignalBoard locally, make sure you have:

- Node.js installed
- npm installed
- A GitHub account
- A Geoapify account

### Clone the Repository

```bash
git clone https://github.com/aooyebanjo/signalboard.git
cd signalboard
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy the provided `.env.example` file to a new `.env.local` file in the root of the project.

```text
signalboard/
├── .env.example
├── .env.local
├── app/
├── components/
├── features/
├── package.json
└── ...
```

Add the following environment variables:

```env
GITHUB_TOKEN=your_github_token
GEOAPIFY_API_KEY=your_geoapify_api_key
```

Do not commit `.env.local` or your API credentials to source control.

The committed `.env.example` file documents the environment variables required by the application without containing secret values.

#### GitHub Token

SignalBoard uses the GitHub REST API for developer profiles, repositories, and developer insights.

To create a GitHub personal access token:

1. Sign in to GitHub.
2. Open **Settings**.
3. Select **Developer settings**.
4. Select **Personal access tokens**.
5. Select **Fine-grained tokens**.
6. Select **Generate new token**.
7. Give the token an appropriate name and expiration.
8. Grant only the permissions required for the resources you intend to access.
9. Generate the token and add it to `.env.local` as `GITHUB_TOKEN`.

GitHub documentation:

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

#### Geoapify API Key

SignalBoard uses Geoapify for location search functionality.

To obtain an API key:

1. Create or sign in to a Geoapify account.
2. Open **MyProjects**.
3. Create a project.
4. Open the project's **API Keys** section.
5. Copy the generated API key.
6. Add it to `.env.local` as `GEOAPIFY_API_KEY`.

Geoapify API key documentation:

https://myprojects.geoapify.com/help/api-keys/

### Run the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

in your browser.

## Testing the Developer Search

The Developer feature accepts GitHub usernames and retrieves public profile and repository information through the GitHub REST API.

A useful starting account for testing is:

| Username | Notes |
| --- | --- |
| `octocat` | GitHub's well-known example/test account used throughout GitHub's API documentation |

You can also test the feature with other valid public GitHub usernames.

For error-state testing, enter a username that does not exist. SignalBoard should handle the GitHub `404` response and display the appropriate application error state.

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm test
```

Runs the Vitest test runner.

```bash
npm run test:run
```

Runs the test suite once without watch mode.

## Project Status

SignalBoard is an actively developed portfolio project focused on demonstrating modern frontend engineering practices with React, TypeScript, and Next.js.

Current functionality includes:

- Technology news powered by the Hacker News API
- GitHub developer profile and repository exploration
- Developer insights derived from repository data
- Paginated and cached server-state management
- Runtime API validation and normalized domain models
- Automated testing across API routes, UI behavior, and application logic

Additional features and refinements will continue to be added as the project evolves.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
