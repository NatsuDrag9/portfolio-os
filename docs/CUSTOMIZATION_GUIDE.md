# Customization Guide

This guide walks you through personalizing Portfolio OS with your own information, images, and content.

---

## Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/NatsuDrag9/portfolio-os.git
cd portfolio-os
yarn install
yarn dev
```

Visit `http://localhost:5173` to see your local development environment.

---

## Step-by-Step Customization

### Step 1: Update Portfolio Content

The primary file for customization is **`src/constants/portfolioConstants.ts`**. This file contains all the content displayed in your portfolio.

#### 1.1 Personal Information (`ABOUT_ME_DETAILS`)

```typescript
export const ABOUT_ME_DETAILS = {
  name: 'Your Name',
  education: [
    {
      institution: 'University Name',
      degree: 'Degree Name',
      duration: '2020 - 2024',
      description: 'Optional description of your studies',
    },
    // Add more education entries
  ],
  otherActitvities: [
    {
      title: 'Activity/Certification',
      description: 'Details about the activity',
    },
    // Add more activities
  ],
  quote: 'Your favorite quote or motto',
};
```

#### 1.2 Work Experience (`WORK_EXPERIENCE_DETAILS`)

```typescript
export const WORK_EXPERIENCE_DETAILS = [
  {
    company: 'Company Name',
    position: 'Job Title',
    duration: 'Jan 2023 - Present',
    description: 'Brief description of your role and responsibilities',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
  },
  // Add more positions
];
```

#### 1.3 Technical Skills (`SKILLS`)

```typescript
export const SKILLS = {
  items: [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'SCSS', 'Vite'],
    },
    {
      category: 'State Management',
      skills: ['Zustand', 'React Hooks'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Storybook'],
    },
    // Add more categories
  ],
};
```

#### 1.4 Projects (`PROJECTS_DATA`)

```typescript
export const PROJECTS_DATA = [
  {
    id: 'project-1',
    title: 'Project Name',
    description: 'Brief description of what the project does',
    image: '/assets/images/specifics/project-1.png', // See Step 3
    technologies: ['React', 'TypeScript', 'Zustand'],
    links: {
      live: 'https://project-demo.com',
      github: 'https://github.com/yourname/project',
      figma: 'https://figma.com/...',
    },
  },
  // Add more projects
];
```

---

### Step 2: Update Sidebar Information

Edit **`src/apps/default/Portfolio/Sidebar/constants.ts`**:

```typescript
export const NAME = 'Your Full Name';
export const DESIGNATION = 'Your Job Title';

export const SIDEBAR_CARD_DATA = [
  {
    icon: MailRegular, // From Fluent UI Icons
    label: 'Email',
    value: 'your.email@example.com',
  },
  {
    icon: LocationRegular,
    label: 'Location',
    value: 'City, Country',
  },
];

export const SIDEBAR_SOCIAL_LINKS = [
  {
    icon: GithubLogo,
    label: 'GitHub',
    url: 'https://github.com/yourname',
  },
  {
    icon: LinkedInLogo,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourname',
  },
  {
    icon: GlobeRegular,
    label: 'Website',
    url: 'https://yourwebsite.com',
  },
  // Add more social links
];
```

---

### Step 3: Replace Images

#### 3.1 Profile Picture

Replace the file at: **`src/assets/images/specifics/devi-ma.svg`**

**Recommendations:**
- Format: PNG, SVG, or JPG
- Size: ~200x200px (square)
- Keep it professional
- Ensure good visibility on both light and dark backgrounds

#### 3.2 Project Screenshots

Place project screenshots in: **`src/assets/images/specifics/`**

Naming convention:
```
project-1.png
project-2.png
project-3.png
// etc.
```

**Recommendations:**
- Format: PNG or JPG
- Size: ~500x300px (landscape)
- Showcase the best features
- Include full page or key component screenshot
- High contrast and clarity

#### 3.3 Wallpaper (Optional)

Replace wallpaper in: **`src/assets/images/generics/wallpapers/`**

---

### Step 4: Add Your Resume

#### 4.1 Add Resume PDF

1. Place your resume PDF in: **`public/Rohit_Resume_Frontend_2.pdf`**
2. Or use any filename and update the path in Portfolio.tsx

#### 4.2 Update Resume Path (if using different filename)

Edit **`src/apps/default/Portfolio/Portfolio.tsx`**:

```typescript
const handleSectionChange = (id: string | number) => {
  if (id === 'portfolio-resume') {
    const resumePath = '/portfolio-os/YOUR_RESUME_FILENAME.pdf'; // Update this
    // ... rest of code
  }
  setActiveSection(id as PortfolioSectionId);
};
```

**Important:** The path must include the `/portfolio-os/` prefix because that's your app's base URL.

---

### Step 5: Update Global Links

Edit **`src/constants/appConstants.ts`**:

```typescript
export const GITHUB_LINK = 'https://github.com/yourname';
export const PORTFOLIO_LINK = 'https://yourusername.github.io/portfolio-os/';
```

---

## Content Guidelines

### About Me Section

- **Quote:** Keep it short and meaningful (1 sentence)
- **Education:** Include degree, institution, and dates
- **Activities:** Mention certifications, hackathons, or volunteering

### Work Experience

- **Description:** Focus on achievements and impact, not just duties
- **Technologies:** List tools/languages you actually used
- **Duration:** Use clear format like "Jan 2023 - Present" or "Jan 2023 - Dec 2023"

### Skills

- **Categories:** Group related skills (Frontend, Backend, DevOps, etc.)
- **Relevance:** List skills that showcase your strengths
- **Order:** Put most relevant/proficient skills first

### Projects

- **Description:** Explain the problem you solved
- **Technologies:** List the tech stack you used
- **Images:** Use high-quality, professional screenshots
- **Links:** Provide working links to live demo and source code

---

## Asset Best Practices

### Image Optimization

- **Compress images** before adding to avoid large bundle size
- **Use appropriate formats:**
  - PNG: For graphics with transparency (like profile picture)
  - JPG: For photos and complex images (project screenshots)
  - SVG: For icons and simple illustrations
- **Dimensions:** Follow recommended sizes (see Step 3)

### File Naming

Use consistent, descriptive names:
- ✅ `profile-picture.png`
- ✅ `project-ecommerce-dashboard.png`
- ❌ `img1.png`
- ❌ `screenshot.png`

---

## Testing Your Changes

### 1. Local Preview

```bash
yarn dev
```

Visit `http://localhost:5173` and verify your changes in the Portfolio section.

### 2. Storybook Preview (for components)

```bash
yarn storybook
```

Check component rendering with your new data.

### 3. Production Build

```bash
yarn build
yarn preview
```

Test the production build locally before deployment.

### 4. Check Different Screens

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Ensure responsiveness across all breakpoints.

---

## Common Customization Tasks

### Change Colors/Theme

1. Global styles are in `src/styles/_variables.scss`
2. Component styles are in each component's `.scss` file
3. Use the SCSS helper variables from `_helpers.scss`

```scss
// Example: Change primary color
$primary-color: #your-color;
```

### Add Social Media Links

In `src/apps/default/Portfolio/Sidebar/constants.ts`:

```typescript
import { TwitterLogo } from '@fluentui/react-icons'; // Import icon

export const SIDEBAR_SOCIAL_LINKS = [
  // ... existing links
  {
    icon: TwitterLogo,
    label: 'Twitter',
    url: 'https://twitter.com/yourname',
  },
];
```

### Add More Projects

In `src/constants/portfolioConstants.ts`:

```typescript
export const PROJECTS_DATA = [
  // ... existing projects
  {
    id: 'project-new',
    title: 'New Project',
    description: 'Description',
    image: '/assets/images/specifics/project-new.png',
    technologies: ['Tech1', 'Tech2'],
    links: {
      live: 'https://link',
      github: 'https://github.com/...',
    },
  },
];
```

---

## Deployment

Once customized, deploy your portfolio:

```bash
yarn deploy:gh-pages
```

This will:
1. Build your portfolio
2. Build Storybook
3. Deploy both to GitHub Pages

Your portfolio will be live at: `https://yourusername.github.io/portfolio-os/`

---