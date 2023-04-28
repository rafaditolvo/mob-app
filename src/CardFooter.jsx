import { ReactNode } from "react";
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import bg from "../src/img/mob-img.png";

export default function CardFooter(props) {
  let status = props?.statusEmpresa ? "enterprise" : "personal";

  if (!props?.data[status]?.description) {
    return <div>Error: Invalid props</div>;
  }

  const { h1, h2, h3, items } = props?.data[status].description;

  if (!h1 || !h2 || !h3 || !items) {
    return <div>Error: Invalid props</div>;
  }

  return (
    <Box bg={"gray.800"} position={"relative"}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage="url('/templates/stats-grid-with-image.png')"
        backgroundSize={"cover"}
        backgroundPosition="center"
        position={"absolute"}
        width={"100%"}
        insetY={0}
        right={0}
      >
        <Flex w={"full"} h={"full"} />
      </Flex>
      <Container maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"red.700"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                {props?.data[status].description.h2}
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                {props?.data[status].description.h1}
              </Heading>
              <Text fontSize={"xl"} color={"gray.400"}>
                {props?.data[status].description.h3}
              </Text>
            </Box>
            <Flex flex={1}>
              <Image src={bg}></Image>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {props?.data[status].description.items.map((item, index) => (
                <Box key={index}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"white"}
                    mb={3}
                  >
                    {item.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {item.text}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}
