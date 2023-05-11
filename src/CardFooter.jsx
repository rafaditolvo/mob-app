import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
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

  console.log(props?.data[status].description.items, "aqui");

  return (
    <Box bg={"gray.800"} w="100%" position={"relative"}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage="url('/templates/stats-grid-with-image.png')"
        backgroundSize={"cover"}
        backgroundPosition="center"
        position={"absolute"}
        width="100%"
        insetY={0}
        right={0}
      >
        <Flex w={"full"} h={"full"} />
      </Flex>
      <Container maxW={"7xl"} zIndex={10} w="100%" position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"red.700"}
            // justify={{ lg: 'center' }}
            w="100%"
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Flex
                flex={1}
                justify={"center"}
                align={"center"}
                position={"relative"}
                w="100%"
              >
                <Heading
                  color={"white"}
                  mb={5}
                  w="100%"
                  fontSize={{ base: "3xl", md: "5xl" }}
                >
                  {props?.data[status].description.h1}
                </Heading>
                <Box
                  position={"relative"}
                  rounded={"2xl"}
                  mb="4em" // altere o valor de mb conforme necessário
                  width={"full"}
                >
                  <Image
                    src={bg}
                    objectFit="cover" // ajusta o tamanho e posição da imagem para preencher a caixa
                    // /position="absolute" // posiciona a imagem absolutamente dentro da caixa
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    //zIndex="-1" // coloca a imagem atrás do conteúdo dentro da caixa
                  />
                </Box>
              </Flex>
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

              <Text fontSize={"xl"} color={"gray.400"}>
                {props?.data[status].description.h3}
              </Text>
            </Box>

            <Container maxW={"6xl"} w="100%" mt={10}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={50} w="full">
                {props?.data[status].description.items.map((item, index) => (
                  <Box key={index} w="100%">
                    <Text
                      fontFamily={"heading"}
                      fontSize={"3xl"}
                      color={"white"}
                      mb={3}
                      ml="1.5em"
                    >
                      {item.title}
                    </Text>
                    <Text fontSize={"xl"} color={"gray.400"}>
                      {item.text}
                    </Text>
                    <UnorderedList spacing={3} listStyleType="none">
                      {!!item.items &&
                        item.items.map((listItem, listItemIndex) => (
                          <ListItem
                            key={listItemIndex}
                            pl={4}
                            position="relative"
                          >
                            <CheckCircleIcon
                              position="absolute"
                              left={0}
                              mr="2em"
                              top={2}
                              color="red.500"
                              boxSize={4}
                            />
                            <Text
                              fontFamily={"heading"}
                              fontSize={"xl"}
                              color={"white"}
                              mb={3}
                              ml="0.5em"
                            >
                              {listItem.text.trim()}
                            </Text>
                          </ListItem>
                        ))}
                    </UnorderedList>
                  </Box>
                ))}
              </SimpleGrid>
            </Container>
          </Stack>

          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}
