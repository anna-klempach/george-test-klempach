# General information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node version `20.10.0`.

This project uses `typescript`.

`SCSS` is used as CSS preprocessor.

Unit tests are created using `Jest`, `react-testing-library`.

`react-router-dom` is used for routing within the project.

`Prettier` is used as static code formatter.

`API` is served from [mocky url](https://run.mocky.io/v3/ac5ad8ce-2283-4f81-aa27-fb90ec5af0bc).

## SRC folder structure

### `api`

Api configuration.

### `pages`

Project pages. Get data from API calls.

### `components`

Individual components. Consume data from parent components.

### `mocks`

Mock data for tests.

### `models`

API and inner project models.

### `services`

Helper functions for api calls and calculations for individual components/pages.

### `styles`

Shared styles for the whole project. Include:

- `base.scss` - base styles, shared styles
- `mixins.scss` - scss mixins
- `variables.scss` - scss variables
- `reset.scss` - reset file for default browser styles.

### `utils`

Project utils (e.g. test utils).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. Jest comfiguration is located in `jest` property in `package.json`.

### `npm run test:once`

Launches the test runner once in CI mode.

### `npm run test:coverage`

Launches the test coverage in the interactive watch mode for changed files. Test coverage includes files with `*.service`, `*.component`, `*.api` postfixes.

### `npm run test:coverage:all`

Launches the test coverage for all files in the interactive watch mode. Test coverage includes files with `*.service`, `*.component`, `*.api` postfixes.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs eslint check. Linter configuration is located in `eslintConfig` property in `package.json` file.

### `npm run format`

Runs prettier format. Linter configuration is located in `.prettierrc`.

## Libraries

### `axios`

Axios is used for api calls. Configuration is located in `src/api/main.api.ts`. Interceptors are added for success and error callbacks.

### `husky`

Pre-commit hook using husky is added. It is located in `.husky/pre-commit`. Includes the following commands:

`npm run lint`

`npm run format`

`npm run test:once`

### `prettier`

Prettier formatter for static code formatting. Basic configuration is in `.prettierrc`.

### `react-error-boundary`

Provides Error boundary component.

### `react-router-dom`

Used for project routing. The main page is located on `/main` route. All other routes are redirected to main page.

### `countries-list`

Library to help with generating countries' names.

### `react-world-flags`

Library for world flags.

### `sweetalert`

Provides alert component for response error interceptor.
