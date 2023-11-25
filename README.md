# Angular-template

## creation

This template is base on the base angular CLI project
What is added ?

- ESLint & Prettier setup
- Tailwind

```bash
ng new  frontend --package-manager=pnpm --ssr=true --style=css
```

#### tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```bash
pnpm add -D prettier-plugin-tailwindcss
```

`tailwind.config`

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bgc: "rgba(var(--color-background), <alpha-value>)",
        fgc: "rgba(var(--color-foreground), <alpha-value>)",
        content: "rgba(var(--color-content), <alpha-value>)",

        accent: {
          1: "rgba(var(--color-accent-main), <alpha-value>)",
          2: "rgba(var(--color-accent-alt), <alpha-value>)",
          like: "rgba(var(--color-accent-like), <alpha-value>)",
          Com: "rgba(var(--color-accent-com), <alpha-value>)",
        },
        message: {
          info: "rgba(var(--color-info), <alpha-value>)",
          error: "rgba(var(--color-error), <alpha-value>)",
          warning: "rgba(var(--color-warning), <alpha-value>)",
          success: "rgba(var(--color-success), <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
```

`styles.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: 250, 240, 230;
    --color-foreground: 40, 35, 35;
    --color-content: 40, 35, 35;

    --color-accent-main: 230, 195, 190;
    --color-accent-alt: 250, 200, 45;
    --color-accent-like: 239, 72, 72;
    --color-accent-com: 1, 166, 111;
    --color-info: 60, 144, 209;
    --color-error: 232, 89, 89;
    --color-warning: 237, 153, 29;
    --color-success: 22, 163, 73;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: 40, 35, 35;
      --color-foreground: 250, 240, 230;
      --color-content: 250, 240, 230;
      --color-primary: 252, 252, 252;
      --color-secondary: 224, 224, 224;
      --color-primary-foreground: 16, 16, 16;
      --color-secondary-foreground: 32, 32, 32;
    }
  }
}
```

#### ESLint & Prettier

```bash
ng add @angular-eslint/schematics
```

```bash
pnpm add -D prettier
```

`.prettierrc.json`

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "always",
  "quoteProps": "as-needed",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`

```r
# See http://help.github.com/ignore-files/ for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db
```

```bash
pnpm add -D prettier-eslint eslint-config-prettier eslint-plugin-prettier
```

## UI library

#### Material

```bash
ng add @angular/material
```

## Clone

Create a new repository from this template.

```bash
## gh on windows
winget install --id GitHub.cli
```

```bash
## create project and clone from template
gh repo create <repo-name> --template https://github.com/liolle/Angular-template.git --private --clone
```

## Routing

We need a few thighs for routing to work (router outlet help us do that).

```typescript
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [],
  selector: "app-root",
  template: `<router-outlet> </router-outlet>`,
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
}
```

Now that we have a dispatcher we need to tell him what page should be displayed for a given route.

We can add that logic into the app.routes.ts file (see doc form more complex routing logic).

```typescript
const routes: Routes = [
  { path: "first-component", component: FirstComponent },
  { path: "second-component", component: SecondComponent },
  { path: "", redirectTo: "/first-component", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];
```

See [Routing](https://angular.io/guide/router) for more complex routing strategies.

## Angular CLI

#### Adding elements

<https://angular.io/cli/generate>

- Ex.

  ```bash
    ng g c <path>
  ```

## Deployment

### Vercel (Frontend)

#### 3-2 setup

The idea is to have 3 branch :

- <strong>main</strong> : Code deployed on production L1 & L2 tests passed.
- <strong>test</strong> : Branch used L1 tests.
- <strong>dev</strong> : Should be the only branch where we can push code.

And 2 deployed environments

- <strong>Preview</strong> : Environment to test by hand.
- <strong>Production</strong> : Prod

#### Prerequisite

- Create a Vercel [API Token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token)
- Run vercel login

```bash
npx vercel login
```

- Run vercel link.

```bash
npx vercel link
```

- Extract VERCEL_ORG_ID, and VERCEL_PROJECT_ID in the `.vercel/project.json` file.

- Inside GitHub, add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as [secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

#### Brach rules

Key rules

- Block direct push on test and main
- Create auto pull request when test pass

Set workflow permissions Workflow permissions (in settings -> actions)

#### Github actions

- Trigger L1 tests on every push on the dev branch.
- Auto pull request into test branch.
- Deploy preview on preview pr accepted
- Run e2e tests on preview env some how
- Auto pr to main if test L2 tests pass
- Auto deploy production on pr accepted

### Hostinger (Backend)

#### Docker - Docker swarm setup
