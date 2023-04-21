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

import SmallWithLogoLeft from "./SmallWithLogoLeft";
import { FaWhatsapp } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Flex
      as="footer"
      py={4}
      bg={isLight ? "white" : "gray.800"}
      justify="center"
    >
      <SmallWithLogoLeft />
    </Flex>
  );
}

export default Footer;
