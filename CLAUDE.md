# FlyStack Project Documentation

## Project Overview

**Project Name:** FlyStack

**Purpose:** A real-time item browser and management application for the Flyff MMORPG, showcasing modern React full-stack development patterns with the TanStack ecosystem and Electric SQL for reactive data synchronization.

**Key Features:**
- Real-time item database browser with icon display
- Advanced multi-filter system (search, level range, category, rarity, gender)
- Sortable, paginated data table (20 items per page)
- Reactive data synchronization with Electric SQL
- Responsive design with mobile-friendly UI
- XSRF protection and error handling
- Developer-focused with TanStack devtools

---

## Technology Stack

### Core Framework
- **React** 19.1.1 - UI library
- **TypeScript** 5.7.2 - Type-safe development with strict mode
- **Vite** 6.3.6 - Fast build tool and dev server

### State Management & Data
- **TanStack Router** 1.131.49 - File-based routing with preloading
- **TanStack React Table** 8.21.3 - Headless table library for filtering/sorting
- **TanStack React DB** 0.1.21 - Real-time data query library
- **TanStack Electric DB Collection** 0.1.23 - Electric SQL integration
- **TanStack Devtools & Router Devtools** - Development tools

### Styling
- **Tailwind CSS** 4.0.17 - Utility-first CSS framework
- **DaisyUI** 5.1.13 - Component library built on Tailwind
- **tailwind-merge** 3.4.0 - Smart class merging
- **clsx** 2.1.1 - Classname utility

### API & Validation
- **ky** 1.10.0 - Lightweight HTTP client
- **zod** 4.1.11 - TypeScript-first schema validation and parsing

### UI & Icons
- **lucide-react** 0.487.0 - Modern icon library

### Utilities
- **usehooks-ts** 3.1.1 - Popular React hooks library

### Code Quality & Formatting
- **Biomejs** 2.2.4 - Fast formatter and linter (2-space indentation, single quotes)

---

## Project Structure

```
fly-stack/
├── src/
│   ├── api/                      # API service layer
│   │   ├── http-client.ts        # HTTP client with XSRF, auth, error handling
│   │   └── flyff-service.ts      # Service for Flyff API endpoints
│   │
│   ├── collections/              # Electric SQL collections
│   │   └── item-collection.ts    # Item data collection with preload
│   │
│   ├── components/               # React components
│   │   ├── features/             # Feature-specific components
│   │   │   └── items/            # Item filtering and display
│   │   │       ├── FilterCategory.tsx
│   │   │       |...
│   │   │       └── ItemsTable.tsx
│   │   │
│   │   └── ui/                   # Reusable UI components
│   │       ├── buttons/
│   │       │   └── Button.tsx
│   │       ├── inputs/
│   │       │   └── Input.tsx
│   │       ├── layouts/
│   │       │   ├── Layout.tsx
│   │       │   └── Drawer.tsx
│   │       ├── loaders/
│   │       │   └── LoadingSpinner.tsx
│   │       ├── navigations/
│   │       │   └── Header.tsx
│   │       ├── tables/
│   │       │   ├── DataTable.tsx
│   │       │   ├── DataTableProvider.tsx
│   │       │   └── DataTableContext.tsx
│   │       └── ...
│   │
│   ├── enums/                    # TypeScript enums
│   │   ├── ItemCategoryEnum.ts
│   │   |...
│   │   └── SexEnum.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── items/
│   │   │   ├── use-item-category.ts
│   │   │   | ...
│   │   │   ├── use-item-sex.ts
│   │   │   └── use-items-query.ts
│   │   ├── use-data-table-context.ts
│   │   └── use-filter-state.ts
│   │
│   ├── routes/                   # File-based routes (TanStack Router)
│   │   ├── __root.tsx            # Root layout
│   │   ├── index.tsx             # Home page
│   │   └── items.tsx             # Items page with filters
│   │
│   ├── schemas/                  # Zod validation schemas
│   │   ├── item-schema.ts        # Item data validation
│   │   ├── filter-schema.ts      # Filter state validation
│   │   └── shared-schema.ts      # Common schemas
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Classname merging
│   │   ├── array.ts              # Array utilities
│   │   ├── constants.ts          # App constants
│   │   └── format.ts             # Formatting utilities
│   │
│   ├── main.tsx                  # React entry point
│   ├── router.tsx                # Router configuration
│   ├── style.css                 # Global styles with Tailwind
│   ├── vite-env.d.ts             # Vite type definitions
│   └── routeTree.gen.ts          # Auto-generated (DO NOT EDIT)
│
├── public/                       # Static assets
├── .claude/                      # Claude Code configuration
├── .vscode/                      # VSCode settings
├── .env / .env.example           # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
├── biome.json
├── index.html
└── README.md
```

### Directory Purposes

- **`api/`** - Service layer for HTTP requests and API integration
- **`collections/`** - Electric SQL collections for reactive data management
- **`components/ui/`** - Generic, reusable UI components (Button, Badge, etc.)
- **`components/features/`** - Feature-specific components (Item filtering, display)
- **`enums/`** - Shared enumeration types for categories, rarities, etc.
- **`hooks/`** - Custom React hooks for data fetching and state management
- **`routes/`** - File-based routes using TanStack Router
- **`schemas/`** - Zod schemas for runtime validation and type inference
- **`utils/`** - Utility functions and constants

---

## File Naming Conventions

### Components
- **Case:** PascalCase
- **Format:** `ComponentName.tsx`
- **Examples:** `Button.tsx`, `SearchFilter.tsx`, `DataTable.tsx`
- **Export:** export const for the main component

### Utilities & Helpers
- **Case:** kebab-case
- **Format:** `utility-name.ts`
- **Examples:** `cn.ts`, `array.ts`, `constants.ts`

### Custom Hooks
- **Case:** kebab-case with `use-` prefix
- **Format:** `use-hook-name.ts`
- **Examples:** `use-item-category.ts`, `use-filter-state.ts`

### Routes
- **Case:** lowercase with underscore for layouts
- **Format:** Filename matches URL path
- **Examples:**
  - `__root.tsx` → Root layout (double underscore)
  - `items.tsx` → `/items` route
  - `index.tsx` → `/` route

### Enums
- **Case:** PascalCase with `Enum` suffix
- **Format:** `EnumNameEnum.ts`
- **Examples:** `ItemCategoryEnum.ts`, `SexEnum.ts`
- **Export:** Both enum object and TypeScript type
  ```typescript
  export enum ItemCategory { ... }
  export type ItemCategoryType = ItemCategory;
  ```

### Schemas
- **Case:** kebab-case
- **Format:** `schema-name-schema.ts` or `schema-name.ts`
- **Examples:** `item-schema.ts`, `filter-schema.ts`
- **Export:** Both Zod schema and inferred type
  ```typescript
  export const itemSchema = z.object({ ... });
  export type Item = z.infer<typeof itemSchema>;
  ```

### Collections
- **Case:** kebab-case
- **Format:** `collection-name-collection.ts`
- **Examples:** `item-collection.ts`

### API/Services
- **Case:** kebab-case
- **Format:** `service-name-service.ts` or `entity-name.ts`
- **Examples:** `flyff-service.ts`, `http-client.ts`

---

## Code Conventions

### Import Organization
- **Sorted automatically by Biomejs** (use Biomejs Auto Sort action)
- **Path aliases:** `@/*` maps to `./src/*` (configured in tsconfig.json)
- **Example:**
  ```typescript
  import { cn } from '@/utils/cn';
  import { Button } from '@/components/ui/buttons/Button';
  import { useItemCategory } from '@/hooks/items/use-item-category';
  ```

### Component Structure

**Pattern:** Functional components with TypeScript interfaces

```typescript
import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn('btn', variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Key Points:**
- Props interface extends `HTMLAttributes<ElementType>` for semantic elements
- Use destructuring with spread `...props` for proper HTML attribute forwarding
- Provide sensible defaults with `??` operators

### Styling Approach

**Strategy:** Tailwind CSS utility-first with DaisyUI components

**Patterns:**

1. **Class Merging with `cn()`:**
   ```typescript
   import { cn } from '@/utils/cn'; // Uses tailwind-merge + clsx

   className={cn('btn', variantClass, sizeClass, className)}
   ```

2. **Variant Mapping with Record:**
   ```typescript
   const variantClasses: Record<BadgeVariant, string> = {
     outline: 'badge-outline',
     dash: 'badge-dash',
     solid: 'badge-solid',
   };

   className={cn('badge', variantClasses[variant])}
   ```

3. **DaisyUI Components:**
   - Use DaisyUI class names: `btn`, `badge`, `input`, `drawer`, `table`, etc.
   - Avoid inline Tailwind duplication—let DaisyUI handle base styles
   - Extend with Tailwind utilities for custom spacing/sizing: `btn btn-lg px-6`

4. **Global Styles:**
   - Located in `src/style.css`
   - Tailwind directives: `@tailwind`, custom CSS variables
   - Import in `src/main.tsx`

### State Management

**Collection with `@tanstack/react-db`:**
```typescript
export const itemCollection = createCollection(
  electricCollectionOptions({
    id: 'items',
    shapeOptions: {
      url: flyffService.urls.items,
      fetchClient: flyffService.httpClient.asFetch,
    },
    schema: itemSchema,
    getKey: (item) => item.id,
  }),
);
```

**Reactive Data with `useLiveQuery`:**
```typescript
const items = useLiveQuery(itemCollection);
```

### Data Fetching & Validation

**Service Layer Pattern:**
```typescript
// services/flyff-service.ts
export class FlyffService {
  static async getItems(): Promise<Item[]> {
    const response = await httpClient.get('/items');
    return itemSchema.array().parse(response);
  }
}
```

**Schema Validation with Zod:**
```typescript
import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number().min(1).max(165),
  category: z.enum(['weapon', 'armor', 'misc']),
});

export type Item = z.infer<typeof itemSchema>;
```

**HTTP Client:**
```typescript
// Singleton HttpClient with XSRF, auth, error handling
import ky from 'ky';

const httpClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [addXsrfToken, attachAuthToken],
    afterResponse: [handleErrorResponse],
  },
});
```

### Custom Hooks

**Pattern:** Return computed values or query results

```typescript
// hooks/items/use-item-category.ts
import { useCallback } from 'react';
import { ItemCategory } from '@/enums/ItemCategoryEnum';

export const useItemCategory = (): string[] => {
  return useCallback(() => Object.values(ItemCategory), [])();
};
```

**Data Query Hook:**
```typescript
export const useItemsQuery = (filters: FilterState) => {
  const items = useLiveQuery(itemCollection);

  return useMemo(() => {
    return items.filter(item =>
      item.name.includes(filters.search) &&
      item.level >= filters.minLevel &&
      item.level <= filters.maxLevel
    );
  }, [items, filters]);
};
```

### Context & Providers

**Pattern:** Provider + Hook combo

```typescript
// DataTableProvider.tsx
const DataTableContext = createContext<DataTableContextType | null>(null);

export const DataTableProvider = ({ children, table }) => (
  <DataTableContext.Provider value={{ table }}>
    {children}
  </DataTableContext.Provider>
);

// useDataTableContext.ts
export const useDataTableContext = () => {
  const context = useContext(DataTableContext);
  if (!context) throw new Error('Must be used within DataTableProvider');
  return context;
};
```

### Filter Pattern

**Reusable Filters:**
```typescript
interface FilterProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export const FilterCategory = ({ value, onChange }: FilterProps) => {
  const categories = useItemCategory();
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {categories.map(cat => <option key={cat}>{cat}</option>)}
    </select>
  );
};
```

**Integration with TanStack Table:**
```typescript
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

table.setColumnFilters([
  { id: 'category', value: selectedCategory },
  { id: 'level', value: [minLevel, maxLevel] },
]);
```

### Type Safety

**Practices:**
- **Strict Mode:** Enabled in tsconfig.json (`"strict": true`)
- **Infer from Schemas:** Always use `z.infer<>` for Zod types
- **Generic Components:** Use generics for reusable components
  ```typescript
  interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
  }
  ```
- **No `any`:** Avoid `any` type; use `unknown` if needed
- **Prop Validation:** Validate at component boundaries only

### Routing (File-Based with TanStack Router)

**Root Layout:**
```typescript
// routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Layout } from '@/components/ui/layouts/Layout';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
```

**Page Route:**
```typescript
// routes/items.tsx
import { createFileRoute } from '@tanstack/react-router';
import { itemCollection } from '@/collections/item-collection';
import ItemsPage from '@/components/features/items/ItemsPage';

export const Route = createFileRoute('/items')({
  loader: () => itemCollection.preload(),
  component: ItemsPage,
});
```

**Router Configuration:**
```typescript
// router.tsx
import { RootRoute, Router } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // Auto-generated

export const router = new Router({ routeTree });
```

### Error Handling

- Use try-catch in async functions
- Validate input with Zod before processing
- Return error boundaries in components
- Log errors for debugging with descriptive messages

### Code Quality Standards

- **Formatter:** Biomejs (2-space indentation, single quotes)
- **Run:** `npx biome check --write src/`
- **Linting:** Built into Biomejs
- **No console.log in production:** Use proper logging
- **Comments:** Only for non-obvious logic; avoid obvious comments

---

## Development Workflow

### Running the Project
```bash
npm install
npm run dev      # Start dev server with Vite
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run Biomejs linter
npm run format   # Auto-format with Biomejs
```

### Adding New Features

1. **Create schema** in `src/schemas/`
2. **Create enum** if needed in `src/enums/`
3. **Create service method** in `src/api/`
4. **Create hook** in `src/hooks/` if needed
5. **Create component** in `src/components/`
6. **Add route** if needed in `src/routes/`
7. **Format with Biomejs** before committing

### Environment Setup
- Copy `.env.example` to `.env`
- Configure `VITE_API_URL` for backend
- Restart dev server after .env changes

---

## Git & Commit Workflow

Do not use Claude as Co-Authored and do not mention commits are generated by Claude.

### Conventional Commits

This project follows the **Conventional Commits** specification for clear and semantic version control history.

**Format:**
```
<type>(<scope>): <description>

<body>

<footer>
```

**Commit Types:**
- **feat:** A new feature (triggers minor version bump)
- **fix:** A bug fix (triggers patch version bump)
- **refactor:** Code restructuring without changing behavior
- **style:** Code style changes (formatting, semicolons, etc.)
- **docs:** Documentation changes
- **test:** Adding or updating tests
- **chore:** Maintenance tasks, dependencies, build config
- **perf:** Performance improvements
- **ci:** CI/CD configuration changes

**Examples:**
```bash
# New feature
git commit -m "feat(items): add item search by name"

# Bug fix with scope
git commit -m "fix(filter): reset search state on category change"

# Refactoring
git commit -m "refactor(hooks): extract item filtering logic to custom hook"

# Multiple lines
git commit -m "feat(table): add sorting by level column

- Integrate TanStack Table columnSort state
- Update ItemsTable to handle sort direction
- Add visual indicators for active sort"
```

**Best Practices:**
- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize the description
- No period at the end of the description
- Keep descriptions concise (50 chars or less)
- Use body for detailed explanations (when needed)
- Reference issues in footer: `Closes #123` or `Fixes #456`

### Git Workflow

**Branch Naming:**
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-name`
- Refactoring: `refactor/scope-name`
- Documentation: `docs/topic-name`
- Example: `feat/electric-sql-tanstack-db`, `fix/filter-reset-bug`

**Commit Best Practices:**
- Make atomic commits (one logical change per commit)
- Commit frequently to maintain clear history
- Don't mix refactoring with features in the same commit
- Use meaningful messages that explain the "why" not just "what"

**Branch Strategy:**
- Main branch: `main` (stable, deployable code)
- Feature branches: branch from `main`
- Create pull requests for code review before merging

---

## Key Architectural Decisions

1. **File-Based Routing:** TanStack Router provides automatic code splitting and preloading
2. **Reactive Data:** Electric SQL + React DB for real-time synchronization without polling
3. **Headless Table:** TanStack React Table separates logic from UI for maximum flexibility
4. **Service Layer:** Centralized API calls with validation and error handling
5. **Schema-Driven:** Zod schemas serve as source of truth for data shapes
6. **Utility-First CSS:** Tailwind CSS reduces custom CSS and improves consistency
7. **Context for Sharing:** Use context for table state and filter coordination, not global state

---

## Notes for Claude Code

This documentation helps Claude Code understand:
- The project's architecture and patterns
- File organization and naming conventions
- Preferred styling and component approaches
- Type safety practices
- Best practices for adding new features

When modifying or extending this project, refer to existing patterns and maintain consistency with the established conventions.
