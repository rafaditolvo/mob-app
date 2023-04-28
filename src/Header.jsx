import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
  IconButton,
  Spinner,
  Center,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import logoDark from "../src/img/mob_logo.svg";
import logo from "../src/img/mob_logo_black.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import PrinceWrapper from "./PrinceWrapper";
import SmallWithLogoLeft from "./SmallWithLogoLeft";
import { FaWhatsapp } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

function Header({ onStatusChange, data }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isResidencial, setIsResidencial] = useState(false);
  const [isEmpresa, setIsEmpresa] = useState(false);

  const handleResidencialClick = () => {
    setIsResidencial(true);
    setIsEmpresa(false);
    onStatusChange(true, false);
  };

  const handleEmpresaClick = () => {
    setIsResidencial(false);
    setIsEmpresa(true);
    onStatusChange(false, true);
  };

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  return (
    <Flex direction="column" height="100vh">
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack mt="3em">
              <Button
                variant={isResidencial ? "outline" : ""}
                colorScheme={isResidencial ? "red" : ""}
                mb={4}
                onClick={handleResidencialClick}
              >
                Para Você
              </Button>
              <Button
                variant={isEmpresa ? "outline" : ""}
                colorScheme={isEmpresa ? "red" : ""}
                mb={4}
                onClick={handleEmpresaClick}
              >
                Para Empresa
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex
        as="header"
        align="center"
        justify="space-between"
        px={16}
        py={8}
        bg={isLight ? "white" : "gray.800"}
      >
        {!isLogoLoaded && <Spinner />}
        <Image
          src={isLight ? logo : logoDark}
          boxSize="5em"
          onLoad={handleLogoLoad}
          style={isLogoLoaded ? {} : { display: "none" }}
        />
        <Flex display={{ base: "none", md: "flex" }}>
          <Button
            variant={isResidencial ? "outline" : ""}
            colorScheme={isResidencial ? "red" : ""}
            mr={4}
            onClick={handleResidencialClick}
          >
            Para Você
          </Button>
          <Button
            variant={isEmpresa ? "outline" : ""}
            colorScheme={isEmpresa ? "red" : ""}
            mr={4}
            onClick={handleEmpresaClick}
          >
            Para Empresa
          </Button>
          {/*  <Button variant="solid" colorScheme="red">
                  Assinar
  </Button> */}
        </Flex>
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={() => setIsOpen(true)}
          display={{ base: "block", md: "none" }}
          ml={2}
        />
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={isLight ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
}

export default Header;
