# Contributing to Portfolio OS

Thank you for your interest in contributing to Portfolio OS! This is an open-source project, and we welcome contributions from developers, designers, and enthusiasts. Whether you're fixing bugs, adding features, improving documentation, or enhancing the design, your contributions are valuable.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms. We are committed to providing a welcoming and inclusive environment for all contributors.

**Be respectful, constructive, and considerate of others. Harassment, discrimination, and inappropriate behavior will not be tolerated.**

---

## Ways to Contribute

### 🐛 Report Bugs
Found a bug? Please open an issue with:
- **Title:** Clear, descriptive bug title
- **Description:** What happened and what you expected
- **Steps to Reproduce:** Detailed steps to recreate the issue
- **Environment:** OS, browser, Node version, etc.
- **Screenshots/Videos:** If applicable

**Label:** `bug`

**[Report a Bug](https://github.com/NatsuDrag9/portfolio-os/issues/new?template=bug_report.md)**

### ✨ Suggest Features
Have a great idea? Open an issue with:
- **Clear description** of the feature and its benefits
- **Use cases** and how it would improve the project
- **Example implementations** (if you have ideas)
- **Related issues** (if any)

**Label:** `enhancement`

**[Request a Feature](https://github.com/NatsuDrag9/portfolio-os/issues/new?template=feature_request.md)**

### 📝 Improve Documentation
- Fix typos and unclear explanations
- Add examples or clarifications
- Create new guides or tutorials
- Improve README or wiki pages

**Label:** `documentation`

### 🎨 UI/UX Improvements
- Design refinements
- Accessibility improvements
- Performance optimizations
- Component enhancements

**Label:** `design` or `performance`

### ✅ Submit Code Changes
- Bug fixes
- New features (discuss in an issue first)
- Refactoring
- Tests

---

## Getting Started

### Prerequisites
- **Node.js:** >= 18.12
- **Package Manager:** Yarn or npm
- **Git:** For version control

### Local Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/portfolio-os.git
   cd portfolio-os
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```
   Visit `http://localhost:5173` (or the displayed port)

5. **Run Storybook (for component development)**
   ```bash
   yarn storybook
   ```
   Visit `http://localhost:6006` for interactive component documentation

---

## Development Workflow

### Branch Naming Conventions
- **Features:** `feature/descriptive-name`
- **Bug fixes:** `fix/bug-description`
- **Chores:** `chore/task-description`
- **Docs:** `docs/documentation-title`

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting (no logic changes)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `ci:` CI/CD configuration changes

**Examples:**
```
feat(portfolio): add dark mode toggle
fix(navbar): resolve navigation link highlighting issue
docs(setup): improve installation instructions
perf(store): optimize Zustand state selectors
```

### Code Style Guidelines

1. **TypeScript**
   - Use strict type checking
   - Avoid `any` types
   - Export types from appropriate files
   - Use meaningful variable names

2. **React Components**
   - Use functional components with hooks
   - Keep components focused and reusable
   - Use descriptive prop names
   - Add JSDoc comments for complex logic
   - Extract magic numbers/strings to constants

3. **Styling**
   - Use SCSS for component styles
   - Follow BEM naming convention: `.component__element--modifier`
   - Use Sass variables from `src/styles/_helpers`
   - Keep styles scoped to components

4. **Zustand Store**
   - Create separate slices for different domains
   - Use descriptive action names
   - Document store structure with comments
   - Keep state normalized

5. **File Organization**
   ```
   FeatureName/
   ├── FeatureName.tsx       # Component
   ├── FeatureName.scss      # Styles
   ├── FeatureName.stories.tsx # Storybook
   ├── types.ts              # TypeScript types (if needed)
   └── constants.ts          # Feature constants
   ```

---

## Pull Request Process

### Before Submitting

1. **Sync with main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests and build**
   ```bash
   yarn build
   yarn lint
   # yarn test (if tests exist)
   ```

3. **Test your changes**
   - Manually test in dev environment
   - Test in Storybook for components
   - Check responsiveness (mobile/desktop)
   - Test with keyboard navigation (accessibility)

### Creating a Pull Request

**Title Format:** Follow conventional commits
- `feat: add feature name`
- `fix: resolve issue description`
- `docs: update documentation`

**Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #<issue-number>

## Testing
How to test the changes:
1. Step 1
2. Step 2

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No console errors or warnings
- [ ] Responsive design verified
- [ ] Storybook updated (if component changes)
```

### Review Process

- At least one approval required
- Address all requested changes
- Keep discussions professional and constructive
- Rebase and force-push only if necessary

---

## Testing Guidelines

### Component Testing
- Add Storybook stories for new components
- Test different props and states
- Test edge cases and error states

### Manual Testing
- Test in Chrome, Firefox, Safari
- Test on mobile devices
- Test accessibility with keyboard navigation
- Test with screen readers (if applicable)

---

## Documentation Guidelines

- Use clear, concise language
- Add code examples where helpful
- Include links to related files or sections
- Update relevant documentation when making changes
- Add JSDoc comments to complex functions

---

## Project Resources

For more information, see:
- [Architecture & Design](../docs/ARCHITECTURE.md)
- [Helper Scripts](../docs/HELPER_SCRIPTS.md)
- [Troubleshooting Guide](../docs/TROUBLESHOOTING.md)
- [Project README](../README.md)

---

## Getting Help

- **Questions:** Open a discussion or issue labeled `question`
- **Issues:** Check existing issues before creating new ones
- **Community:** Be respectful and helpful to other contributors

---

## Recognition

Contributors are recognized in:
- Project README
- GitHub contributors page
- Release notes (for significant contributions)

Thank you for contributing to Portfolio OS! 🎉
