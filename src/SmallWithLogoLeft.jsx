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

export default function SmallWithLogoLeft(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const isLight = colorMode === "light";

  //console.log(props.props.data.enterprise.footer);
  let status = props?.statusEmpresa ? "enterprise" : "personal";

  if (!props?.props?.data[status]?.footer?.socialMedia) {
    return <div>Error: Invalid props</div>;
  }

  const { socialMedia, logoSrc } = props.props?.data[status]?.footer;

  if (!socialMedia || !logoSrc) {
    return <div>Error: Invalid props</div>;
  }

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  return (
    <Box
      //bg={useColorModeValue("gray.50", "gray.900")}
      borderRadius="20px"
      //color={useColorModeValue("gray.700", "gray.200")}
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
          src={isLight ? logoSrc : logoDark}
          boxSize="5em"
          onLoad={handleLogoLoad}
          style={isLogoLoaded ? {} : { display: "none" }}
        />
        <Text>© Copyright Mob Telecom 2023. Todos os direitos reservados.</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={props.props.data[status]?.footer.socialMedia[0].name}
            href={props.props.data[status]?.footer.socialMedia[0].href}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={props.props.data[status]?.footer.socialMedia[1].name}
            href={props.props.data[status]?.footer.socialMedia[1].href}
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton
            label={props.props.data[status]?.footer.socialMedia[2].name}
            href={props.props.data[status]?.footer.socialMedia[2].href}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
