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

import SmallWithLogoLeft from "./SmallWithLogoLeft";

function Footer(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Flex
      as="footer"
      py={4}
      bg={isLight ? "white" : "gray.800"}
      justify="center"
    >
      <SmallWithLogoLeft props={props} />
    </Flex>
  );
}

export default Footer;
