import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#2E4A2E",
  secondary: "#F5E6CC",
  textColor: "#4A3728",
  background: "#F9F9F9",
  navBar: "#2E4A2E",
  menyText: "#F9F9F9",
  menyTextHoverEffekt: "#F5E6CC",
};

const fonts = {
  heading: "'Roboto', sans-serif",
  body: "'Open Sans', sans-serif",
};

const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      "html, body": {
        background: "background",
        color: "textColor",
        fontFamily: "body",
      },
      a: {
        color: "primary",
        _hover: {
          color: "secondary",
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "primary",
          color: "menyText",
          _hover: {
            bg: "secondary",
            color: "textColor",
          },
        },
        outline: {
          borderColor: "textColor",
          color: "textColor",
          _hover: {
            bg: "secondary",
            color: "primary",
          },
        },
      },
    },
    IconButton: {
      baseStyle: {
        borderRadius: "md",
        color: "textColor",
        _hover: {
          bg: "secondary",
          color: "primary",
          borderColor: "primary",
          borderWidth: "1px",
          borderStyle: "solid",
        },
      },
    },
  },
});

export default theme;
