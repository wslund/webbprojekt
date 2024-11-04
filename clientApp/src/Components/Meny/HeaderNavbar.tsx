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
import horseLogo from "../../assets/horseLogo.svg";
import RoutingObject from "../RoutingObject";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const MainNavbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newScale = Math.max(0.85, 1 - window.scrollY / 550);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack spacing={0} margin="0" padding="0" position="relative">
      <Box
        bg="primary"
        width="100%"
        height="85px"
        position="fixed"
        top="0"
        zIndex="1"
      >
        <Flex justify="space-between" align="center" height="100%" paddingX={4}>
          <Flex align="center" flex="1" marginRight="20px" position="relative">
            {isMobile ? (
              <Box display="flex" alignItems="center">
                <Image
                  src={horseLogo}
                  alt="Horse Logo"
                  width={"40px"}
                  height={"40px"}
                  marginRight="8px"
                />
                <Link as={RouterLink} to="/Om">
                  <Text
                    fontFamily="'Poppins', sans-serif"
                    fontSize="lg"
                    color="#2D0400"
                  >
                    Stall Backen
                  </Text>
                </Link>
              </Box>
            ) : (
              <Box
                backgroundColor="primary"
                width="250px"
                height="140px"
                position="absolute"
                bottom="-95px"
                left="50%"
                transform={`translateX(-50%) scale(${scale})`}
                zIndex="2"
                borderRadius="2px"
                overflow="hidden"
                textAlign="center"
                transition="transform 0.2s ease-out"
              >
                <Image
                  src={horseLogo}
                  alt="Horse Logo"
                  width={"250px"}
                  height={"95px"}
                  paddingTop={"5px"}
                />
                <Link as={RouterLink} to="/Om">
                  <Text
                    fontFamily="'Poppins', sans-serif"
                    fontSize="xx-large"
                    color="#2D0400"
                    textAlign="center"
                  >
                    Stall Backen
                  </Text>
                </Link>
              </Box>
            )}
          </Flex>
          {!isMobile && (
            <Flex align="center" justify="center" flex="1" marginY="0">
              {RoutingObject.map((route, index) => (
                <Link
                  as={RouterLink}
                  key={index}
                  to={route.path}
                  marginRight="4"
                  color="#2D0400"
                  fontSize="lg"
                  fontFamily="heading"
                  _hover={{ color: "white" }}
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
              color="#2D0400"
              aria-label="Open Menu"
              onClick={onOpen}
              style={{ padding: 0 }}
            />
          )}
          {!isMobile && (
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
          bg="rgba(255, 255, 255, 0.9)"
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
            color="#2D0400"
            aria-label="Close Menu"
            onClick={onClose}
            marginLeft="auto"
            marginBottom="30px"
            style={{ padding: 0, fontSize: "50px" }}
            _hover={{
              color: "white",
              transform: "scale(1.1)",
              transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
            }}
          />
          {RoutingObject.map((route, index) => (
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
                color="#2D0400"
                fontSize="lg"
                fontFamily="heading"
                _hover={{ color: "white" }}
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
