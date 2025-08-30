# Cypress Testing Setup

This repository now includes a complete Cypress testing setup with GitHub Actions CI/CD integration.

## Local Development

### Prerequisites
- Node.js (LTS version recommended)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The server will be available at `http://localhost:3000`

3. Run Cypress tests:
   ```bash
   # Run tests in headless mode
   npm test
   
   # Open Cypress interactive mode
   npm run test:open
   ```

## GitHub Actions CI

The workflow automatically runs when:
- Code is pushed to the `main` branch
- A pull request is opened against the `main` branch

### Workflow Features
- ✅ Uses Ubuntu latest environment
- ✅ Sets up Node.js LTS
- ✅ Caches npm dependencies for faster builds
- ✅ Starts development server automatically
- ✅ Runs Cypress tests in headless Chrome
- ✅ Saves screenshots and videos as artifacts if tests fail

## Tests

The test suite includes:
- Homepage functionality validation
- Navigation between pages
- Course listing page verification
- DataTables functionality
- CSS styling checks
- External library loading verification

## Files Added
- `.github/workflows/cypress-ci.yml` - GitHub Actions workflow
- `package.json` - Node.js project configuration
- `cypress.config.js` - Cypress configuration
- `cypress/e2e/website.cy.js` - Test specifications
- `.gitignore` - Git ignore rules for artifacts

## Debugging Failed Tests
If tests fail in CI, download the artifacts from the GitHub Actions run to see:
- Screenshots of failed test states
- Video recordings of test execution