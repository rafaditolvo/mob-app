import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import bg from '../src/img/mob-img.png';

export default function CardFooter(props) {
  if (!props?.data?.enterprise?.description) {
    return <div>Error: Invalid props</div>;
  }

  const { h1, h2, h3, items } = props.data.enterprise.description;

  if (!h1 || !h2 || !h3 || !items) {
    return <div>Error: Invalid props</div>;
  }

  console.log(props.data.enterprise.description.items);
  return (
    <Box bg={'gray.800'} position={'relative'}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: 'none', lg: 'flex' }}
        backgroundImage="url('/templates/stats-grid-with-image.png')"
        backgroundSize={'cover'}
        backgroundPosition="center"
        position={'absolute'}
        width={'100%'}
        insetY={0}
        right={0}
      >
        <Flex
          //bgGradient={'linear(to-r, gray.800 10%, transparent)'}
          w={'full'}
          h={'full'}
        />
      </Flex>
      <Container maxW={'7xl'} zIndex={10} position={'relative'}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            color={'red.700'}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
                color={'gray.500'}
              >
                {props.data.enterprise.description.h2}
              </Text>
              <Heading
                color={'white'}
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}
              >
                {props.data.enterprise.description.h1}
              </Heading>
              <Text fontSize={'xl'} color={'gray.400'}>
                {props.data.enterprise.description.h3}
              </Text>
            </Box>
            <Flex flex={1}>
              <Image src={bg}></Image>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {props.data.enterprise.description.items.map((item, index) => (
                <Box key={index}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    color={'white'}
                    mb={3}
                  >
                    {item.title}
                  </Text>
                  <Text fontSize={'xl'} color={'gray.400'}>
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

const StatsText = ({ children }) => (
  <Text as={'span'} fontWeight={700} color={'white'}>
    {children}
  </Text>
);

const stats = [
  {
    title: '10+',
    content: (
      <>
        <StatsText>Lorem</StatsText> Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book.
      </>
    ),
  },
  {
    title: '24/7',
    content: (
      <>
        <StatsText>Lorem</StatsText> Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book.
      </>
    ),
  },
  {
    title: '13%',
    content: (
      <>
        <StatsText>Lorem</StatsText> Lorem Ipsum is simply dummy text of the
        printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book.
      </>
    ),
  },
  {
    title: '250M+',
    content: (
      <>
        <StatsText>Lorem</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];