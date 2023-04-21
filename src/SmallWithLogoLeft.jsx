import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import logoDark from "../src/img/mob_logo.svg";
import logo from "../src/img/mob_logo_black.svg";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const isLight = colorMode === "light";

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      borderRadius="20px"
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image
          src={isLight ? logo : logoDark}
          boxSize="5em"
          onLoad={handleLogoLoad}
          style={isLogoLoaded ? {} : { display: "none" }}
        />
        <Text>© Copyright Mob Telecom 2023. Todos os direitos reservados.</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"#"}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
