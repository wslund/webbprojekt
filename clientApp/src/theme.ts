import { extendTheme } from "@chakra-ui/react";

// ═══════════════════════════════════════════════════
// Stall Backen — Temafil
// Alla färger, typsnitt, och gemensamma stilar
// ═══════════════════════════════════════════════════

const colors = {
  brand: {
    bg: "#faf9f6",
    dark: "#0a0a0a",
    cream: "#f5f0e8",
    olive: "#3d4a2e",
    oliveLight: "#5a6b42",
    warm: "#c4a77d",
    warmLight: "#e2d5c3",
    text: "#2a2a2a",
    muted: "#7a7a7a",
  },
};

const fonts = {
  heading: `'Cormorant Garamond', Georgia, serif`,
  body: `'DM Sans', 'Helvetica Neue', sans-serif`,
};

// Gemensam easing som används överallt
const ease = "cubic-bezier(0.16,1,0.3,1)";

const theme = extendTheme({
  fonts,
  colors,
  styles: {
    global: {
      "html, body": {
        bg: "brand.bg",
        color: "brand.text",
        overflowX: "hidden",
      },
      "::selection": {
        bg: "brand.olive",
        color: "white",
      },
    },
  },

  // Semantiska tokens — gör det enkelt att byta tema
  semanticTokens: {
    colors: {
      "bg.page": { default: "brand.bg" },
      "bg.card": { default: "white" },
      "bg.section": { default: "brand.cream" },
      "bg.dark": { default: "brand.dark" },
      "text.primary": { default: "brand.text" },
      "text.muted": { default: "brand.muted" },
      "text.accent": { default: "brand.olive" },
      "accent.primary": { default: "brand.olive" },
      "accent.warm": { default: "brand.warm" },
      "border.subtle": { default: "gray.200" },
    },
  },

  // Gemensamma text-stilar
  textStyles: {
    tag: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
    sectionHeading: {
      fontWeight: 300,
      lineHeight: 1.15,
    },
    body: {
      fontSize: "md",
      lineHeight: 1.85,
    },
    cardDate: {
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    },
    cardLink: {
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    formLabel: {
      fontSize: "xs",
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    },
  },

  // Layer styles (bakgrund + border-kombos)
  layerStyles: {
    card: {
      bg: "bg.card",
      border: "1px solid",
      borderColor: "border.subtle",
      borderRadius: "2xl",
    },
    cardHover: {
      bg: "bg.card",
      borderRadius: "xl",
      overflow: "hidden",
      transition: `all 0.5s ${ease}`,
      _hover: { transform: "translateY(-6px)", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" },
    },
  },

  components: {
    Button: {
      baseStyle: {
        fontFamily: "body",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: "full",
      },
      variants: {
        brand: {
          bg: "white",
          color: "brand.dark",
          fontSize: "0.8rem",
          px: 8,
          py: 6,
          _hover: { bg: "brand.warm", color: "white", transform: "translateY(-2px)" },
          transition: `all 0.4s ${ease}`,
        },
        brandOutline: {
          bg: "transparent",
          color: "white",
          fontSize: "0.8rem",
          px: 8,
          py: 6,
          border: "1.5px solid",
          borderColor: "whiteAlpha.400",
          _hover: { borderColor: "white", bg: "whiteAlpha.100", transform: "translateY(-2px)" },
          transition: `all 0.4s ${ease}`,
        },
        brandDark: {
          bg: "brand.olive",
          color: "white",
          fontSize: "0.8rem",
          px: 8,
          py: 6,
          _hover: { bg: "brand.oliveLight", transform: "translateY(-2px)" },
          transition: `all 0.4s ${ease}`,
        },
      },
    },

    FormLabel: {
      baseStyle: {
        fontSize: "xs",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "text.muted",
      },
    },

    Input: {
      variants: {
        brand: {
          field: {
            bg: "brand.bg",
            border: "1.5px solid",
            borderColor: "border.subtle",
            borderRadius: "lg",
            fontSize: "sm",
            _focus: { borderColor: "brand.olive", boxShadow: "0 0 0 3px rgba(61,74,46,0.08)" },
          },
        },
      },
      defaultProps: {
        variant: "brand",
      },
    },

    Textarea: {
      variants: {
        brand: {
          bg: "brand.bg",
          border: "1.5px solid",
          borderColor: "border.subtle",
          borderRadius: "lg",
          fontSize: "sm",
          _focus: { borderColor: "brand.olive", boxShadow: "0 0 0 3px rgba(61,74,46,0.08)" },
        },
      },
      defaultProps: {
        variant: "brand",
      },
    },

    Select: {
      variants: {
        brand: {
          field: {
            bg: "brand.bg",
            border: "1.5px solid",
            borderColor: "border.subtle",
            borderRadius: "lg",
            fontSize: "sm",
            _focus: { borderColor: "brand.olive", boxShadow: "0 0 0 3px rgba(61,74,46,0.08)" },
          },
        },
      },
      defaultProps: {
        variant: "brand",
      },
    },
  },
});

export default theme;
