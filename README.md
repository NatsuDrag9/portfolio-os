# portfolio-os

A Windows 11-inspired desktop environment built with React, TypeScript, and Zustand. Features a functional taskbar, start menu, draggable windows, and real-time settings management. Includes app launcher system, window instance management with zIndex tracking, and quick actions panel. Demonstrates advanced React patterns, state management, component architecture, and UI/UX design through an interactive, pixel-perfect operating system simulation.

## Getting Started

Clone the repo

```
git clone https://github.com/NatsuDrag9/portfolio-os
```

Run the app

```
cd portfolio-os

yarn install

yarn dev

yarn storybook

```

### Customizing Your Portfolio

To use this template with your own portfolio details, follow these steps:

1. **Clone and install dependencies:**

   ```
   git clone https://github.com/NatsuDrag9/portfolio-os
   cd portfolio-os
   yarn install
   ```

2. **Update your portfolio content in** `src/constants/portfolioConstants.ts`:
   - `ABOUT_ME_DETAILS` - Your personal info, education, and background
   - `WORK_EXPERIENCE_DETAILS` - Your employment history
   - `SKILLS` - Your technical skills and tools
   - `PROJECTS_DATA` - Your portfolio projects with links and descriptions

3. **Update sidebar information in** `src/apps/default/Portfolio/Sidebar/constants.ts`:
   - `NAME` and `DESIGNATION` - Your name and job title
   - `SIDEBAR_CARD_DATA` - Your email and location
   - `SIDEBAR_SOCIAL_LINKS` - Links to your GitHub, LinkedIn, and other profiles

4. **Replace images:**
   - Profile picture: `src/assets/images/specifics/devi-ma.svg`
   - Project screenshots: `src/assets/images/specifics/*.png` (update references in `PROJECTS_DATA`)

5. **Add your resume:**
   - Replace the PDF in `public/docs/` with your resume
   - Update the file path in `src/apps/default/DownloadableResume/DownloadableResume.tsx`

6. **Update global links in** `src/constants/appConstants.ts`:
   - `GITHUB_LINK` - Your GitHub profile URL
   - `PORTFOLIO_LINK` - Your portfolio domain (if deployed)

**Key Files for Customization:**

- `src/constants/portfolioConstants.ts` - Portfolio content (about, experience, skills, projects)
- `src/apps/default/Portfolio/Sidebar/constants.ts` - Name, title, and social links
- `src/assets/images/specifics/` - Profile picture and project screenshots
- `public/docs/` - Resume PDF file

## Project Structure

```
portfolio-os/
├── src/
│   ├── apps/
│   │   ├── default/                    # Portfolio application modules
│   │   │   ├── AboutMe/                # About section with education
│   │   │   ├── Portfolio/              # Main portfolio container & navigation
│   │   │   ├── Projects/               # Portfolio projects showcase
│   │   │   ├── Skills/                 # Technical skills section
│   │   │   ├── WorkExperience/         # Work history section
│   │   │   ├── DownloadableResume/     # Resume download component
│   │   │   ├── FileExplorer/           # File system UI
│   │   │   └── Github/                 # GitHub integration app
│   │   └── recommended/                # OS system applications
│   ├── assets/
│   │   └── images/
│   │       ├── specifics/              # Portfolio images & project screenshots
│   │       └── generics/               # Generic UI assets & wallpapers
│   ├── components/                     # Reusable UI components
│   ├── constants/                      # Configuration & constants
│   │   ├── portfolioConstants.ts       # Main portfolio content (PRIMARY FILE)
│   │   └── appConstants.ts             # Global app links
│   ├── definitions/                    # TypeScript type definitions
│   ├── styles/                         # Global SASS styles
│   ├── store/                          # Zustand state management
│   └── App.tsx                         # Main application entry point
├── public/
│   ├── docs/                           # Resume PDF files
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## System Requirements

| Technology | Version  |
| ---------- | -------- |
| Node.js    | >= 18.12 |
| React      | ^19.2.0  |
| TypeScript | ~5.9.3   |
| Vite       | ^6.0.0   |
| Storybook  | 8.6.14   |

## Deployment to GitHub Pages

This project is configured to deploy both your portfolio and Storybook to GitHub Pages from a single build.

### Setup

1. **Update your GitHub repository URL in package.json** (optional, if not using default):
   The `gh-pages` package will automatically detect your repository from git config.

2. **Ensure GitHub Pages is enabled:**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "Deploy from a branch"
   - Choose the `gh-pages` branch as the source

### Deployment Commands

**Option 1: Automatic deployment**

```bash
yarn deploy:gh-pages
```

This command:

- Builds your portfolio application
- Builds Storybook component library
- Combines them (portfolio at `/`, Storybook at `/storybook/`)
- Automatically pushes to the `gh-pages` branch

**Option 2: Manual deployment**

```bash
yarn build:deploy        # Builds and prepares dist/ folder
# Then manually push dist/ to gh-pages branch
```

### Access Your Deployed Site

After deployment completes:

- **Portfolio:** `https://yourusername.github.io/portfolio-os/`
- **Storybook:** `https://yourusername.github.io/portfolio-os/storybook/`

### Local Preview Before Deployment

Test your build locally before deploying:

```bash
yarn build:deploy
yarn preview
```

## Documentation

**For Employers & Recruiters:**
Visit the live portfolio at your deployed URL to explore the interactive Windows 11-inspired interface and view projects, experience, and skills.

**For Developers:**

- **Component Library:** Run `yarn storybook` to view interactive component documentation with various states and use cases
- **Customization Guide:** See [Customizing Your Portfolio](#customizing-your-portfolio) section above
- **GitHub Repository:** [NatsuDrag9/portfolio-os](https://github.com/NatsuDrag9/portfolio-os)

## Credits and References

**Inspired By**
Vova Ushenko's portfolio - [link](https://www.vovacodes.ca/)
Dustin Brett's portfolio - [link](https://dustinbrett.com/)

**Design**
Special thanks to [Jai Kishan](https://www.linkedin.com/in/jai-kishan-kuntumalla-906717156/) and [Satya Sai Teja](https://www.linkedin.com/in/kssaiteja/) for their feedback on UI and design.
