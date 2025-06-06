import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  IconButton,
  Link,
  useBreakpointValue,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import horseFarm from "../../assets/horseFarm.png";
import newHorseLogo from "../../assets/stall_backen_logo2.svg";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface RouteItem {
  path: string;
  name: string;
  element: JSX.Element;
  hidden?: boolean;
  protected?: boolean;
}

interface MainNavbarProps {
  routes: RouteItem[];
}

const MainNavbar: React.FC<MainNavbarProps> = ({ routes }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newScale = Math.max(0.85, 1 - window.scrollY / 550);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleRoutes = routes.filter((route) => !route.hidden);

  return (
    <Stack spacing={0} margin="0" padding="0" position="relative">
      <Box
        bg="navBar"
        width="100%"
        height="90px"
        position="fixed"
        top="0"
        zIndex="1"
      >
        <Flex justify="space-between" align="center" height="100%" paddingX={4}>
          <Flex align="center" flex="1" marginRight="20px" position="relative">
            {isMobile ? (
              <Box display="flex" alignItems="center">
                <Image
                  src={newHorseLogo}
                  alt="Stall Backen Logo"
                  width="80px"
                  height="44px"
                  objectFit="contain"
                  marginLeft="10px"
                />
                <Box display="flex" alignItems="center" ml={4}>
                  <Link
                    href="https://www.instagram.com/malma_stallbacken/"
                    isExternal
                  >
                    <IconButton
                      aria-label="Instagram"
                      icon={<FaInstagram />}
                      variant="ghost"
                      color="textColor"
                      className="icon-button"
                      mr={2}
                      fontSize="28px"
                      _hover={{ color: "menyTextHoverEffekt" }}
                    />
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box
                bg="navBar"
                width="280px"
                height="170px"
                position="absolute"
                bottom="-130px"
                left="50%"
                transform={`translateX(-50%) scale(${scale})`}
                zIndex="2"
                borderRadius="2px"
                overflow="hidden"
                textAlign="center"
                transition="transform 0.2s ease-out"
              >
                <Link as={RouterLink} to="/Om">
                  <Image
                    src={newHorseLogo}
                    alt="Stall Backen Logo"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    position="absolute"
                    top="0"
                    left="0"
                  />
                </Link>
              </Box>
            )}
          </Flex>
          {!isMobile && (
            <Flex align="center" justify="center" flex="1" marginY="0">
              {visibleRoutes.map((route, index) => (
                <Link
                  as={RouterLink}
                  key={index}
                  to={route.path}
                  marginRight="4"
                  color="menyText"
                  fontSize="lg"
                  fontFamily="heading"
                  _hover={{ color: "menyTextHoverEffekt" }}
                >
                  {route.name}
                </Link>
              ))}
            </Flex>
          )}
          {isMobile && !isOpen && (
            <IconButton
              icon={
                <MenuIcon fontSize="inherit" style={{ fontSize: "36px" }} />
              }
              variant="link"
              color="textColor"
              aria-label="Open Menu"
              onClick={onOpen}
              style={{ padding: 0 }}
            />
          )}
          {!isMobile && (
            <Flex align="center" justify="flex-end">
              <Link
                href="https://www.instagram.com/malma_stallbacken/"
                isExternal
              >
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  variant="ghost"
                  color="textColor"
                  className="icon-button"
                  mr={2}
                  fontSize="24px"
                  _hover={{ color: "menyTextHoverEffekt" }}
                />
              </Link>
            </Flex>
          )}
        </Flex>
      </Box>

      <Box position="relative" width="100%" paddingTop="60px">
        <Image
          src={horseFarm}
          objectFit="cover"
          width="100%"
          height="400px"
          margin="0"
          padding="0"
        />
      </Box>

      {isOpen && (
        <Box
          bg="background"
          zIndex="10"
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          padding="20px"
        >
          <IconButton
            icon={<CloseIcon style={{ fontSize: "36px" }} />}
            variant="link"
            color="textColor"
            aria-label="Close Menu"
            onClick={onClose}
            marginLeft="auto"
            marginBottom="30px"
            style={{ padding: 0, fontSize: "50px" }}
            _hover={{
              color: "menyTextHoverEffekt",
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
            }}
          />
          {visibleRoutes.map((route, index) => (
            <Box
              as={RouterLink}
              key={index}
              to={route.path}
              width="100%"
              textAlign="left"
              padding="5px 0"
              onClick={onClose}
            >
              <Text
                color="textColor"
                fontSize="lg"
                fontFamily="heading"
                _hover={{ color: "menyTextHoverEffekt" }}
              >
                {route.name}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default MainNavbar;
