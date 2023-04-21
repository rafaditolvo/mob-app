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

function Cards() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex
      as="main"
      flexGrow={1}
      align="center"
      justify="center"
      bg={isLight ? "gray.50" : "gray.900"}
    >
      <Container maxW="container.lg">
        <Flex>
          <Center>
            <PrinceWrapper />
          </Center>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Cards;
