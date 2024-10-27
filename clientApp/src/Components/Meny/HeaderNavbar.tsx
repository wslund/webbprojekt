import {
  Box,
  Flex,
  Image,
  Stack,
  IconButton,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import horseLogo from "../../assets/hästLogo.png";
import horseFarm from "../../assets/horseFarm.png";

const MainNavbar = () => {
  const showLogoInNavbar = useBreakpointValue({ base: false, md: true });

  return (
    <Stack spacing={0} margin="0" padding="0" position="relative">
      <Box
        bg="primary"
        width="100%"
        height="80px"
        position="relative"
        zIndex="1"
      >
        <Flex justify="space-between" align="center" height="100%" paddingX={4}>
          <Flex align="center" justify="center" flex="1">
            {showLogoInNavbar ? (
              <Box
                backgroundColor="primary"
                width="200px"
                height="200px"
                position="absolute"
                bottom="-100px"
                left="50%"
                transform="translateX(-50%)"
                zIndex="2"
                borderRadius="8px"
                overflow="hidden"
              >
                <Link as={RouterLink} to="/Om">
                  <Image
                    src={horseLogo}
                    objectFit="contain"
                    width="110%"
                    height="110%"
                    paddingLeft={"10px"}
                  />
                </Link>
              </Box>
            ) : (
              <Link as={RouterLink} to="/Om">
                <Image
                  src={horseLogo}
                  objectFit="contain"
                  width="50px"
                  height="50px"
                  mr={2}
                  style={{ marginLeft: "90%" }}
                />
              </Link>
            )}
          </Flex>

          <Flex align="center" justify="flex-end">
            <Link href="https://www.instagram.com" isExternal>
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                color="#2D0400"
                className="icon-button"
                mr={2}
                fontSize="24px"
                _hover={{ color: "white" }}
              />
            </Link>
            <Link href="https://www.facebook.com" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebookF />}
                variant="ghost"
                color="#2D0400"
                className="icon-button"
                fontSize="24px"
                _hover={{ color: "white" }}
              />
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Box position="relative" width="100%">
        <Image
          src={horseFarm}
          objectFit="cover"
          width="100%"
          height={"400px"}
          margin="0"
          padding="0"
        />
      </Box>
    </Stack>
  );
};

export default MainNavbar;
