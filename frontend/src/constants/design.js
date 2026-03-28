/**
 * Key Visual Design Tokens
 * Based on BPOM x acaraki Jamu Festival Key Visual (June 2026)
 * Fonts sourced from /Downloads/Fonts
 */

// ==================== FONTS ====================
export const FONTS = {
  // Display font - used for "acaraki" logo and main titles
  // Source: S&S Nickson One.otf
  DISPLAY: '"SS Nickson One", cursive',

  // Body font - used for all other text
  // Source: Museo font family (100, 300, 500, 700, 900 weights)
  BODY: 'Museo, sans-serif',

  // Font weights
  WEIGHTS: {
    THIN: 100,
    LIGHT: 300,
    REGULAR: 500,
    BOLD: 700,
    BLACK: 900,
  },
};

// ==================== COLORS ====================
export const COLORS = {
  // Primary colors from Key Visual
  PRIMARY: {
    BEIGE: '#E8DCC8',        // Base/background - soft beige with floral patterns
    BEIGE_LIGHT: '#F5F0E6',  // Light beige variant
    BROWN: '#5C4033',         // Primary brown - text, silhouettes, ornaments
    BROWN_DARK: '#3C2A20',   // Dark brown - secondary text
    GOLD: '#D4A84B',          // Gold/Yellow - highlights, dates, key text
    GOLD_DARK: '#B8923A',    // Dark gold variant
  },

  // Nature/Wellness theme colors
  NATURE: {
    GREEN: '#4A7C59',        // Main green - cloud motifs, silhouettes
    GREEN_LIGHT: '#7BA37B',  // Light green - accents
    GREEN_DARK: '#2E5A3D',   // Dark green - deep foliage
  },

  // Neutral colors
  NEUTRAL: {
    CREAM: '#FAF7F2',        // Off-white
    TAN: '#D4C4A8',          // Earthy tan
  },

  // Brand colors (kept from original)
  BRAND: {
    ORANGE: '#FCA311',       // Original brand orange
    RED: '#C94C3E',          // Accent red
  },
};

// ==================== TYPOGRAPHY ====================
export const TYPOGRAPHY = {
  // Font families as CSS strings
  fontFamilies: {
    display: FONTS.DISPLAY,
    body: FONTS.BODY,
    museo: FONTS.BODY,
    ssNickson: FONTS.DISPLAY,
  },

  // Common text styles
  styles: {
    // Hero title - "acaraki"
  heroTitle: 'text-4xl md:text-6xl lg:text-7xl',

  // Festival title - "JAMU FESTIVAL"
  festivalTitle: 'text-3xl md:text-5xl lg:text-6xl',

  // Body text
  body: 'text-base md:text-lg',

  // Navigation
  nav: 'text-sm md:text-base',

  // Buttons
  button: 'text-sm md:text-base font-bold',
  },
};

// ==================== SPACING ====================
export const SPACING = {
  // Container padding
  container: {
    mobile: 'px-4',
    tablet: 'px-6',
    desktop: 'px-8',
  },

  // Section padding
  section: {
    mobile: 'py-10',
    tablet: 'py-16',
    desktop: 'py-20',
  },
};

// ==================== EXPORT DEFAULTS ====================
export default {
  FONTS,
  COLORS,
  TYPOGRAPHY,
  SPACING,
};
