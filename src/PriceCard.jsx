import { Box, Text, Stack, Button, Icon } from "@chakra-ui/react";

function PriceCard({ name, price, features }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
    <Text fontSize="2xl" fontWeight="semibold" mb={4}>
      {name}
    </Text>
    <Text fontSize="2xl" mb={4}>
      {price}
    </Text>
    <Stack spacing={4}>
      {features.map((feature) => (
        <Stack direction="row" key={feature}>
          <Icon name="check" color="green.500" mr={2} />
          <Text>{feature}</Text>
        </Stack>
      ))}
    </Stack>
    <Button mt={8} colorScheme="blue">
      Comprar
    </Button>
  </Box>
);
}

export default PriceCard;
