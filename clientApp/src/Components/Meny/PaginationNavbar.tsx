import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import RoutingObject from "../RoutingObject";

const PaginationNavbar = () => {
  return (
    <Box bg="primary" padding="1rem" width="100%">
      <Flex justify="center" align="center">
        {RoutingObject.map((route: any, index: any) => (
          <ChakraLink
            as={Link}
            key={index}
            to={route.path}
            marginRight="2"
            color="textColor"
            fontSize="lg"
            fontFamily="heading"
            _hover={{ color: "gray.300" }}
          >
            {route.name}
          </ChakraLink>
        ))}
      </Flex>
    </Box>
  );
};

export default PaginationNavbar;
