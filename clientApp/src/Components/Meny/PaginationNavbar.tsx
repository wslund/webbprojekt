import { Link } from "react-router-dom"; // Importera Link från react-router-dom
import { Box, Flex, Link as ChakraLink, Spacer } from "@chakra-ui/react"; // Importera Chakra UI Link
import RoutingObject from "../RoutingObject";

const PaginationNavbar = () => {
  return (
    <Box bg="gray.200" padding="1rem" width="100%">
      <Flex>
        {/* Dynamiskt skapa länkar från RoutingObject */}
        {RoutingObject.map((route: any, index: any) => (
          <ChakraLink
            as={Link} // Använd Link från react-router-dom
            key={index}
            to={route.path} // Dynamisk routing-länk
            marginRight="2"
            color="blue.500"
          >
            {route.name}
          </ChakraLink>
        ))}
        <Spacer />
      </Flex>
    </Box>
  );
};

export default PaginationNavbar;
