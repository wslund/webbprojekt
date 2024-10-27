import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#EFE6D9",
  secondary: "#FFFFFF",
  textColor: "black",
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
        background: "primary",
        color: "textColor",
        fontFamily: "body",
      },
      a: {
        color: "primary",
        _hover: {
          color: "secondary",
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
          color: "secondary",
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
        _hover: {
          bg: "white",
          borderColor: "white",
          borderWidth: "2px",
          borderStyle: "solid",
          color: "primary",
        },
      },
    },
  },
});

export default theme;
