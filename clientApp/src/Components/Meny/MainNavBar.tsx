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
import { Link as RouterLink } from "react-router-dom";

import horseFarm from "../../assets/horseFarm.png";
import newHorseLogo from "../../assets/stall_backen_logo2.svg";

// MUI icons (default-import per ikon)
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook"; // om du behöver

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
    <Stack spacing={0} m="0" p="0" position="relative">
      <Box bg="navBar" w="100%" h="90px" position="fixed" top="0" zIndex="1">
        <Flex justify="space-between" align="center" h="100%" px={4}>
          {/* Logo + social (vänster) */}
          <Flex align="center" flex="1" mr="20px" position="relative">
            {isMobile ? (
              <Box display="flex" alignItems="center">
                <Image
                  src={newHorseLogo}
                  alt="Stall Backen Logo"
                  w="80px"
                  h="44px"
                  objectFit="contain"
                  ml="10px"
                />
                <Box display="flex" alignItems="center" ml={4}>
                  <Link
                    href="https://www.instagram.com/malma_stallbacken/"
                    isExternal
                  >
                    <IconButton
                      aria-label="Instagram"
                      icon={<InstagramIcon fontSize="inherit" />}
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
                w="280px"
                h="170px"
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
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    position="absolute"
                    top="0"
                    left="0"
                  />
                </Link>
              </Box>
            )}
          </Flex>

          {/* Menylänkar (center, desktop) */}
          {!isMobile && (
            <Flex align="center" justify="center" flex="1" my="0">
              {visibleRoutes.map((route, index) => (
                <Link
                  as={RouterLink}
                  key={index}
                  to={route.path}
                  mr="4"
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

          {/* Hamburger (mobil) */}
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

          {/* Social (höger, desktop) */}
          {!isMobile && (
            <Flex align="center" justify="flex-end">
              <Link
                href="https://www.instagram.com/malma_stallbacken/"
                isExternal
              >
                <IconButton
                  aria-label="Instagram"
                  icon={<InstagramIcon fontSize="inherit" />}
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

      {/* Hero-bild under navbaren */}
      <Box position="relative" w="100%" pt="60px">
        <Image
          src={horseFarm}
          objectFit="cover"
          w="100%"
          h="400px"
          m="0"
          p="0"
        />
      </Box>

      {/* Mobilmeny-overlay */}
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
          p="20px"
        >
          <IconButton
            icon={<CloseIcon style={{ fontSize: "36px" }} />}
            variant="link"
            color="textColor"
            aria-label="Close Menu"
            onClick={onClose}
            ml="auto"
            mb="30px"
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
              w="100%"
              textAlign="left"
              p="5px 0"
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
