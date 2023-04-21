import {
  Button,
  Flex,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Container,
  Heading,
  Text,
  HStack,
  Tag,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  Center,
  ListIcon,
  Image,
  useMediaQuery,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon, PhoneIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaCheckCircle,
} from 'react-icons/fa';
import { capsFirst } from './utils';
import Header from './Header';
import Banner from './Baner';
import Cards from './Cards';
import Footer from './Footer';
import FAQ from './FAQ';
import CardFooter from './CardFooter';
import PriceCarousel from './PriceCarousel';
import ChakraCarousel from './ChakraCarousel';
import { motion } from 'framer-motion';
import AppContent from './AppContent';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  //const { ref, inView } = useInView();

  function WhatsAppButton() {
    return (
      <Box
        as="a"
        href="https://api.whatsapp.com/send?phone=0800 940 9777"
        target="_blank"
        rel="noopener noreferrer"
        position="fixed"
        bottom={{ base: '79', md: '8', lg: '12' }}
        right={{ base: '10', md: '8', lg: '12' }}
        width={{ base: '60px', md: '70px', lg: '80px' }}
        height={{ base: '60px', md: '70px', lg: '80px' }}
        padding={{ base: '10px', md: '14px', lg: '16px' }}
        borderRadius="full"
        backgroundColor="green.500"
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        transition="all 0.2s ease-out"
        _hover={{
          transform: 'scale(1.1)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <FaWhatsapp size={{ base: '24px', md: '28px', lg: '32px' }} />
      </Box>
    );
  }

  function Carrosel() {
    function PriceWrapper({ children }) {
      return (
        <Box
          mb={4}
          //gap={2}
          shadow="base"
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.500')}
          borderRadius="30px"
          width="100%" // define a largura em porcentagem
        >
          {children}
        </Box>
      );
    }

    const pricingData = [
      {
        name: 'Premium',
        price: '149',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '10TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Hobby',
        price: '179',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '5TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Premium',
        price: '149',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '10TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
      {
        name: 'Enterprise',
        price: '299',
        features: [
          'unlimited build minutes',
          'Lorem, ipsum dolor.',
          '50TB Lorem, ipsum dolor.',
        ],
      },
    ];

    return (
      <>
        <Container
          py={2}
          px={12}
          mt="1em"
          alignItems="center"
          maxW={{
            base: '100%',
            sm: '35rem',
            md: '43.75rem',
            lg: '57.5rem',
            xl: '75rem',
            xxl: '87.5rem',
          }}
        >
          <VStack spacing={2} mt="2em" mb="3em" textAlign="center">
            <Heading as="h1" fontSize="4xl">
              TURBINE A SUA VIDA COM A MOB
            </Heading>

            <Text fontSize="lg" mb="5em" mt="2em" color={'gray.500'}>
              CONHEÇA OS BENEFÍCIOS DE TER UMA INTERNET TURBINADA
            </Text>

            <HStack mb="2em">
              {/* <Button
                colorScheme="facebook"
                leftIcon={<CheckCircleIcon />}
              ></Button>
              <Button
                colorScheme="twitter"
                leftIcon={<CheckCircleIcon />}
              ></Button>{' '}
              <Button
                colorScheme="facebook"
                leftIcon={<CheckCircleIcon />}
              ></Button>
              <Button
                colorScheme="twitter"
                leftIcon={<CheckCircleIcon />}
        ></Button> */}
            </HStack>
          </VStack>
          <Divider />
          <ChakraCarousel gap={3}>
            {pricingData.length > 0 ? (
              pricingData.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Center>
                    <PriceWrapper>
                      <Box position="relative">
                        <Box py={4} px={9}>
                          <Text fontWeight="500" fontSize="2xl">
                            Plano
                          </Text>
                          <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                              $
                            </Text>
                            <Text fontSize="5xl" fontWeight="900">
                              {item.price}
                            </Text>
                            <Text fontSize="3xl" color="gray.500">
                              /mês
                            </Text>
                          </HStack>
                        </Box>
                        <VStack
                          //bg={useColorModeValue('gray.50', 'gray.700')}
                          py={4}
                          borderBottomRadius={'xl'}
                        >
                          <List spacing={3} textAlign="start" px={12}>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              unlimited build minutes
                            </ListItem>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              Lorem, ipsum dolor.
                            </ListItem>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              5TB Lorem, ipsum dolor.
                            </ListItem>
                          </List>
                          <Box w="80%" pt={7}>
                            <Button w="full" colorScheme="red">
                              Start trial
                            </Button>
                          </Box>
                        </VStack>
                      </Box>
                    </PriceWrapper>
                  </Center>
                </motion.div>
              ))
            ) : (
              <Text>No pricing data available.</Text>
            )}
          </ChakraCarousel>
        </Container>
      </>
    );
  }

  //console.log(data);

  return (
    <Flex direction="column" height="100vh">
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <VStack mt="3em">
              <Button variant="ghost" mb={4}>
                Para Você
              </Button>
              <Button variant="ghost" mb={4}>
                Para Empresa
              </Button>
              <Button variant="solid" colorScheme="red">
                Assinar
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Banner />

        <Carrosel />
        <Divider />
        <CardFooter />
        <Divider />
        <AppContent />

        <WhatsAppButton />
        <Divider />
        <FAQ />

        <Footer />
      </motion.div>
    </Flex>
  );
}

export default App;
