import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

export default function FAQ(props) {
  function checkProps(props) {
    if (!props?.data?.personal?.FAQ) {
      return false;
    }

    const { h1, items } = props.data.personal.FAQ;

    if (!h1 || !items) {
      return false;
    }

    return true;
  }

  if (!checkProps(props)) {
    return <div>Error: Invalid props</div>;
  }

  let status = props?.statusEmpresa ? "enterprise" : "personal";

  console.log(status, "isEmpresa");

  return (
    <Box p={4} mt="2em" mb="6em">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>{props.data[status].FAQ.h1}</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          {props.data[status].FAQ.text}
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {props.data[status].FAQ.items.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={QuestionIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
