# Frontend Tech Stack
Documentation of all dependencies used in the urbansystemfrontend project, what they do, and why they were chosen.

# Core Framework
PackageVersionPurposereact^19UI component libraryreact-dom^19React renderer for the browsertypescript^5Static type checkingvite^6Build tool and dev server@vitejs/plugin-reactlatestVite plugin for React (fast refresh, JSX)
Why: React + Vite is the modern standard for SPAs. Vite's dev server starts instantly and HMR is near-instant compared to Webpack-based tools. TypeScript is non-negotiable for any maintainable codebase — it catches bugs at compile time and makes refactoring safe.

# Styling
PackageVersionPurposetailwindcss^4Utility-first CSS framework@tailwindcss/vite^4Vite plugin for Tailwind v4 (replaces PostCSS config)
Why: Tailwind eliminates the need to write and name custom CSS classes. Tailwind v4 uses a Vite plugin and a single CSS import — no tailwind.config.js required. Styles are co-located with components, making them easy to read and change.

# UI Components
PackageVersionPurpose@radix-ui/*latestHeadless, accessible UI primitives (installed via shadcn)lucide-reactlatestIcon library used by shadcn/ui componentsclsxlatestUtility for conditionally joining class namestailwind-mergelatestMerges Tailwind classes without conflicts

shadcn/ui components live in src/components/ui/ and are owned by this project — they are not a dependency in package.json. They are copied in via pnpm dlx shadcn@latest add <component>.

Why: shadcn/ui gives us fully accessible, unstyled components built on Radix UI that we own and can customise freely. This is preferred over a component library like MUI or Chakra because we are not locked into someone else's design system. tailwind-merge + clsx are required by the cn() utility that all shadcn components use.

# Routing
PackageVersionPurpose@tanstack/react-router^1Type-safe, file-based client-side routing@tanstack/router-pluginlatestVite plugin for file-based route generation
Why: TanStack Router provides fully type-safe routing — route paths, params, and search params are all typed. The Vite plugin auto-generates a routeTree.gen.ts from files in src/routes/, eliminating manual route registration.

# Server State & Data Fetching
PackageVersionPurpose@tanstack/react-query^5Async state management, caching, and data fetching@tanstack/react-query-devtools^5Dev-only query inspector (not included in production build)
Why: TanStack Query handles all server-side state — fetching, caching, background refetching, loading/error states, and pagination. This removes the need to manually manage useEffect + useState for API calls. It replaces the "fetch in useEffect" antipattern entirely.

# Client State Management
PackageVersionPurposezustand^5Lightweight global client state
Why: For UI state that doesn't come from the server (e.g. sidebar open/closed, selected filters, modal state), Zustand is simple and boilerplate-free. It does not require a Provider wrapper and its API is minimal. Redux is overkill for this use case.

# Internationalization (i18n)
PackageVersionPurposei18nextlatestCore internationalization engine for translations, plurals, and formattingreact-i18nextlatestReact bindings providing the useTranslation hooki18next-browser-languagedetectorlatestAutomatically detects and persists the user's preferred language (browser settings/localStorage)
Why: These libraries allow the application to support multiple languages (e.g., English and Albanian) efficiently. `i18next` handles complex localization rules natively. `react-i18next` connects the translation state directly to React preventing the need to manually re-render text changes, and the browser detector safely persists language choices across sessions.

# Forms & Validation
PackageVersionPurposereact-hook-form^7Performant form state managementzod^3Schema-based runtime validation@hookform/resolvers^3Connects Zod schemas to React Hook Form
Why: React Hook Form avoids re-rendering the component on every keystroke, making forms fast. Zod schemas serve as the single source of truth for validation rules — z.infer<typeof schema> automatically generates the matching TypeScript type, so there is no duplication between runtime validation and type definitions.

# Code Quality
PackageVersionPurposeeslint^9Static code analysiseslint-config-prettierlatestDisables ESLint rules that conflict with Prettier@typescript-eslint/parserlatestAllows ESLint to parse TypeScript@typescript-eslint/eslint-pluginlatestTypeScript-specific lint rulesprettier^3Opinionated code formatterprettier-plugin-tailwindcsslatestAuto-sorts Tailwind classes on save
Why: ESLint catches logical errors and enforces code conventions. Prettier handles all formatting decisions so they are never debated in code review. The Tailwind plugin ensures class names are always in a consistent, predictable order.

# Git Hooks
PackageVersionPurposehusky^9Runs scripts on git events (pre-commit, commit-msg)lint-stagedlatestRuns linters only on staged files
Why: Husky + lint-staged ensure that no un-linted or un-formatted code can be committed. Running linters only on staged files (via lint-staged) keeps the pre-commit hook fast regardless of project size.

# Testing
PackageVersionPurposevitest^2Unit and integration test runner@vitest/ui^2Browser-based test dashboard@testing-library/reactlatestComponent testing utilities@testing-library/user-eventlatestSimulates realistic user interactions@testing-library/jest-domlatestCustom DOM matchers (e.g. toBeInTheDocument)jsdomlatestSimulated browser environment for tests
Why: Vitest reuses the Vite config — no separate babel or jest config needed. Testing Library encourages testing components the way users actually interact with them (by text, role, label) rather than by implementation details like class names or internal state.

# Type Support
PackageVersionPurpose@types/nodelatestTypeScript types for Node.js globals (path, __dirname)
Why: Required for path.resolve(__dirname, ...) in vite.config.ts when configuring the @ path alias.

# Path Aliases
The @ alias is configured in both tsconfig.app.json and vite.config.ts:
@/components  →  src/components
@/lib         →  src/lib
@/hooks       →  src/hooks
This keeps imports clean and refactorable — moving a file does not require updating relative import paths across the codebase.

Adding a New shadcn/ui Component
shadcn components are not installed via pnpm add. Use the CLI:
bashpnpm dlx shadcn@latest add <component-name>
# e.g.
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add data-table