import fluentTokens from '@fluentui/tokens';
const { webLightTheme, webDarkTheme } = fluentTokens;
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const SCSS_DIR = path.resolve(__dirname, '../src/styles');

/**
 * Converts camelCase to kebab-case
 * @param {string} str - The camelCase string
 * @returns {string} kebab-case string
 */
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Converts hex color to rgb() format
 * @param {string} hexColor - Hex color (e.g., #0f6cbd or #fff)
 * @returns {string} rgb() string
 */
function hexToRgb(hexColor) {
  let hex = hexColor.replace('#', '');

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r} ${g} ${b})`;
}

/**
 * Converts a color value to modern CSS format with percentage alpha
 * @param {string} color - Color value (hex, rgba, or other)
 * @returns {string} Modern CSS color format
 */
function convertColor(color) {
  // If it's already rgba with old comma format, convert to new space-separated format
  const rgbaMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    if (a !== undefined) {
      // Convert alpha from 0-1 to percentage
      const alphaPercent = (parseFloat(a) * 100).toFixed(1).replace(/\.0$/, '');
      return `rgb(${r} ${g} ${b} / ${alphaPercent}%)`;
    }
    return `rgb(${r} ${g} ${b})`;
  }

  // If it's hex, convert to rgb
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }

  // Return as-is for other formats (transparent, etc.)
  return color;
}

/**
 * Converts px value to rem (base 10px = 1rem)
 * @param {string} value - Value with px unit
 * @returns {string} Value in rem
 */
function pxToRem(value) {
  const match = value.match(/^([\d.]+)px$/);
  if (match) {
    const px = parseFloat(match[1]);
    const rem = px / 10;
    return `${rem}rem`;
  }
  return value;
}

/**
 * Curated list of essential tokens to extract
 */
const CURATED_TOKENS = {
  // Essential colors (backgrounds, foregrounds, brand)
  colors: [
    // Backgrounds
    'colorNeutralBackground1',
    'colorNeutralBackground2',
    'colorNeutralBackground3',
    'colorNeutralBackground4',
    'colorNeutralBackground5',
    'colorNeutralBackground6',

    // Foregrounds (text)
    'colorNeutralForeground1',
    'colorNeutralForeground2',
    'colorNeutralForeground3',
    'colorNeutralForeground4',
    'colorNeutralForegroundDisabled',
    'colorNeutralForegroundInverted',

    // Brand/Accent
    'colorBrandBackground',
    'colorBrandBackgroundHover',
    'colorBrandBackgroundPressed',
    'colorBrandBackgroundSelected',
    'colorBrandForeground1',
    'colorBrandForeground2',

    // Semantic colors
    'colorPaletteGreenBackground3',
    'colorPaletteGreenForeground3',
    'colorPaletteRedBackground3',
    'colorPaletteRedForeground3',
    'colorPaletteYellowBackground3',
    'colorPaletteYellowForeground3',
    'colorPaletteMarigoldBackground3',

    // Strokes/Borders
    'colorNeutralStroke1',
    'colorNeutralStroke2',
    'colorNeutralStrokeAccessible',
    'colorBrandStroke1',
    'colorBrandStroke2',

    // Overlay/Modal
    'colorBackgroundOverlay',
  ],

  // Shadows - include all (only 12 tokens)
  shadows: [
    'shadow2',
    'shadow4',
    'shadow8',
    'shadow16',
    'shadow28',
    'shadow64',
    'shadow2Brand',
    'shadow4Brand',
    'shadow8Brand',
    'shadow16Brand',
    'shadow28Brand',
    'shadow64Brand',
  ],

  // Spacing - common sizes
  spacing: [
    'spacingHorizontalNone',
    'spacingHorizontalXXS',
    'spacingHorizontalXS',
    'spacingHorizontalSNudge',
    'spacingHorizontalS',
    'spacingHorizontalMNudge',
    'spacingHorizontalM',
    'spacingHorizontalL',
    'spacingHorizontalXL',
    'spacingHorizontalXXL',
    'spacingHorizontalXXXL',
    'spacingVerticalNone',
    'spacingVerticalXXS',
    'spacingVerticalXS',
    'spacingVerticalSNudge',
    'spacingVerticalS',
    'spacingVerticalMNudge',
    'spacingVerticalM',
    'spacingVerticalL',
    'spacingVerticalXL',
    'spacingVerticalXXL',
    'spacingVerticalXXXL',
  ],

  // Typography
  typography: [
    // Font sizes
    'fontSizeBase100',
    'fontSizeBase200',
    'fontSizeBase300',
    'fontSizeBase400',
    'fontSizeBase500',
    'fontSizeBase600',
    'fontSizeHero700',
    'fontSizeHero800',
    'fontSizeHero900',
    'fontSizeHero1000',

    // Line heights
    'lineHeightBase100',
    'lineHeightBase200',
    'lineHeightBase300',
    'lineHeightBase400',
    'lineHeightBase500',
    'lineHeightBase600',
    'lineHeightHero700',
    'lineHeightHero800',
    'lineHeightHero900',
    'lineHeightHero1000',

    // Font weights
    'fontWeightRegular',
    'fontWeightMedium',
    'fontWeightSemibold',
    'fontWeightBold',

    // Font families
    'fontFamilyBase',
    'fontFamilyMonospace',
    'fontFamilyNumeric',
  ],

  // Border radius - include all (only 6 tokens)
  borderRadius: [
    'borderRadiusNone',
    'borderRadiusSmall',
    'borderRadiusMedium',
    'borderRadiusLarge',
    'borderRadiusXLarge',
    'borderRadiusCircular',
  ],
};

/**
 * Generate CSS custom properties from curated tokens
 */
function generateThemeFile() {
  let output = `/* Theme Tokens - CSS Custom Properties (Auto-Generated from Fluent UI) */
/* Generated on: ${new Date().toISOString()} */

/* =================================================================
   Light Theme (Default)
   ================================================================= */

:root {
`;

  // --- COLORS (Light) ---
  output += '  /* Colors - Backgrounds */\n';
  CURATED_TOKENS.colors
    .filter(
      (k) =>
        k.includes('Background') &&
        !k.includes('Brand') &&
        !k.includes('Palette') &&
        !k.includes('Overlay')
    )
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Foregrounds (Text) */\n';
  CURATED_TOKENS.colors
    .filter(
      (k) =>
        k.includes('Foreground') &&
        !k.includes('Brand') &&
        !k.includes('Palette')
    )
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Brand/Accent */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Brand'))
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Semantic (Success, Error, Warning) */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Palette'))
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Strokes/Borders */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Stroke') && !k.includes('Brand'))
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Overlay */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Overlay'))
    .forEach((key) => {
      const value = convertColor(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  // --- SHADOWS (Light) ---
  output += '\n  /* Shadows */\n';
  CURATED_TOKENS.shadows.forEach((key) => {
    let value = webLightTheme[key];
    // Convert rgba colors in shadow values to modern format
    value = value.replace(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g,
      (match, r, g, b, a) => {
        if (a !== undefined) {
          const alphaPercent = (parseFloat(a) * 100)
            .toFixed(1)
            .replace(/\.0$/, '');
          return `rgb(${r} ${g} ${b} / ${alphaPercent}%)`;
        }
        return `rgb(${r} ${g} ${b})`;
      }
    );
    output += `  --${camelToKebab(key)}: ${value};\n`;
  });

  // --- SPACING (Universal) ---
  output += '\n  /* Spacing (Universal - not theme-specific) */\n';
  CURATED_TOKENS.spacing.forEach((key) => {
    const value = pxToRem(webLightTheme[key]);
    output += `  --${camelToKebab(key)}: ${value};\n`;
  });

  // --- TYPOGRAPHY (Universal) ---
  output += '\n  /* Typography - Font Sizes (Universal) */\n';
  CURATED_TOKENS.typography
    .filter((k) => k.startsWith('fontSize'))
    .forEach((key) => {
      const value = pxToRem(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Typography - Line Heights (Universal) */\n';
  CURATED_TOKENS.typography
    .filter((k) => k.startsWith('lineHeight'))
    .forEach((key) => {
      const value = pxToRem(webLightTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Typography - Font Weights (Universal) */\n';
  CURATED_TOKENS.typography
    .filter((k) => k.startsWith('fontWeight'))
    .forEach((key) => {
      const value = webLightTheme[key];
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output +=
    '\n  /* Typography - Font Families (Universal) */\n  /* stylelint-disable value-keyword-case */\n';
  CURATED_TOKENS.typography
    .filter((k) => k.startsWith('fontFamily'))
    .forEach((key) => {
      const value = webLightTheme[key];
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });
  output += '  /* stylelint-enable value-keyword-case */\n';

  // --- BORDER RADIUS (Universal) ---
  output += '\n  /* Border Radius (Universal) */\n';
  CURATED_TOKENS.borderRadius.forEach((key) => {
    const value = pxToRem(webLightTheme[key]);
    output += `  --${camelToKebab(key)}: ${value};\n`;
  });

  output += '}\n\n';

  // --- DARK THEME ---
  output += `/* =================================================================
   Dark Theme (Override with .dark-theme class)
   ================================================================= */

.dark-theme {
`;

  // --- COLORS (Dark) ---
  output += '  /* Colors - Backgrounds */\n';
  CURATED_TOKENS.colors
    .filter(
      (k) =>
        k.includes('Background') &&
        !k.includes('Brand') &&
        !k.includes('Palette') &&
        !k.includes('Overlay')
    )
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Foregrounds (Text) */\n';
  CURATED_TOKENS.colors
    .filter(
      (k) =>
        k.includes('Foreground') &&
        !k.includes('Brand') &&
        !k.includes('Palette')
    )
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Brand/Accent */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Brand'))
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Semantic (Success, Error, Warning) */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Palette'))
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Strokes/Borders */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Stroke') && !k.includes('Brand'))
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  output += '\n  /* Colors - Overlay */\n';
  CURATED_TOKENS.colors
    .filter((k) => k.includes('Overlay'))
    .forEach((key) => {
      const value = convertColor(webDarkTheme[key]);
      output += `  --${camelToKebab(key)}: ${value};\n`;
    });

  // --- SHADOWS (Dark) ---
  output += '\n  /* Shadows */\n';
  CURATED_TOKENS.shadows.forEach((key) => {
    let value = webDarkTheme[key];
    // Convert rgba colors in shadow values to modern format
    value = value.replace(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g,
      (match, r, g, b, a) => {
        if (a !== undefined) {
          const alphaPercent = (parseFloat(a) * 100)
            .toFixed(1)
            .replace(/\.0$/, '');
          return `rgb(${r} ${g} ${b} / ${alphaPercent}%)`;
        }
        return `rgb(${r} ${g} ${b})`;
      }
    );
    output += `  --${camelToKebab(key)}: ${value};\n`;
  });

  output += '}\n';

  return output;
}

// --- Generate and write _theme.scss ---
console.log('🎨 Generating CSS custom properties from Fluent UI tokens...\n');

const themeContent = generateThemeFile();
const themeFilePath = path.join(SCSS_DIR, '_theme.scss');

fs.writeFileSync(themeFilePath, themeContent);

console.log('✅ Generated: _theme.scss');
console.log(
  `   📊 Total CSS custom properties: ~${CURATED_TOKENS.colors.length + CURATED_TOKENS.shadows.length + CURATED_TOKENS.spacing.length + CURATED_TOKENS.typography.length + CURATED_TOKENS.borderRadius.length} variables`
);
console.log('   🎨 Colors: ~35 properties per theme');
console.log('   📦 Spacing: 22 properties');
console.log('   ✏️  Typography: 28 properties');
console.log('   🔲 Border Radius: 6 properties');
console.log('   💫 Shadows: 12 properties');

console.log('\n💡 Usage in SCSS:');
console.log('   background: var(--color-neutral-background-1);');
console.log('   color: var(--color-neutral-foreground-1);');
console.log('   padding: var(--spacing-horizontal-m);');
console.log('   font-size: var(--font-size-base-300);');
console.log('   border-radius: var(--border-radius-medium);');
console.log('   box-shadow: var(--shadow-4);');

console.log('\n🌓 Theme Switching:');
console.log('   document.documentElement.classList.toggle("dark-theme");');

console.log('\n✅ Setup complete!');
