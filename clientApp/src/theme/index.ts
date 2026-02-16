
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e6f6f4",
      100: "#bfe8e3",
      200: "#96d9d1",
      300: "#6ccbbe",
      400: "#43bdac",
      500: "#2aa392",
      600: "#1f7e70",
      700: "#155a4f",
      800: "#0b362f",
      900: "#001311",
    },
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.900",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: 600,
      },
    },
    Link: {
      baseStyle: {
        _hover: { textDecoration: "none" },
      },
    },
  },
});
