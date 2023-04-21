import { ReactNode, useRef, useState } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  useColorMode,
  List,
  ListItem,
  ListIcon,
  Button,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";
  const pricingData = [
    {
      name: "Hobby",
      price: "79",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "5TB Lorem, ipsum dolor.",
      ],
    },
    {
      name: "Premium",
      price: "149",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "10TB Lorem, ipsum dolor.",
      ],
    },
    {
      name: "Enterprise",
      price: "299",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "50TB Lorem, ipsum dolor.",
      ],
    },
    {
      name: "Hobby",
      price: "79",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "5TB Lorem, ipsum dolor.",
      ],
    },
    {
      name: "Premium",
      price: "149",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "10TB Lorem, ipsum dolor.",
      ],
    },
    {
      name: "Enterprise",
      price: "299",
      features: [
        "unlimited build minutes",
        "Lorem, ipsum dolor.",
        "50TB Lorem, ipsum dolor.",
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const pricesPerPage = 3;

  const renderPricingData = () => {
    const start = currentPage * pricesPerPage;
    const end = start + pricesPerPage;
    return pricingData.slice(start, end).map((pricing, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PriceWrapper>
          <Box py={6} px={12}>
            <Text fontWeight="bold" fontSize="3xl" lineHeight="short">
              {pricing.title}
            </Text>
            <Text fontSize="5xl" fontWeight="bold" lineHeight="short" mt={2}>
              R${pricing.price}
              <Text
                as="span"
                fontSize="2xl"
                fontWeight="normal"
                color="gray.500"
              >
                /mês
              </Text>
            </Text>
            <Text fontSize="md" color="gray.500" lineHeight="short" mt={6}>
              {pricing.description}
            </Text>
          </Box>
          <VStack
            // bg={useColorModeValue("gray.50", "gray.700")}
            borderBottomRadius="xl"
            spacing={4}
            px={12}
            py={6}
          >
            <List spacing={3} textAlign="start" px={1}>
              {pricing.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  {feature}
                </ListItem>
              ))}
            </List>
            <Button colorScheme="red" variant="outline" px={8}>
              Começar teste
            </Button>
          </VStack>
        </PriceWrapper>
      </motion.div>
    ));
  };

  const renderPaginationItems = () => {
    const pageCount = Math.ceil(pricingData.length / pricesPerPage);
    const items = [];
    for (let i = 0; i < pageCount; i++) {
      items.push(
        <renderPricingData
          key={i}
          isCurrent={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </renderPricingData>
      );
    }
    return items;
  };

  return (
    <Center>
      <Box>
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Planos e preços
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {renderPricingData()}
        </SimpleGrid>
        <Stack direction="row" mt={8} spacing={4} justifyContent="center">
          {renderPaginationItems()}
        </Stack>
      </Box>
    </Center>
  );
}
