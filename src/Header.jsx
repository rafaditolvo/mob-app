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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import logoDark from '../src/img/mob_logo.svg';
import logo from '../src/img/mob_logo_black.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PrinceWrapper from './PrinceWrapper';
import SmallWithLogoLeft from './SmallWithLogoLeft';
import { FaWhatsapp } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

function Header({ onStatusChange }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isResidencial, setIsResidencial] = useState(false);
  const [isEmpresa, setIsEmpresa] = useState(false);

  const handleResidencialClick = () => {
    setIsResidencial(true);
    setIsEmpresa(false);
    onStatusChange(true, false);
  };

  const handleEmpresaClick = () => {
    setIsResidencial(false);
    setIsEmpresa(true);
    onStatusChange(false, true);
  };

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

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

          <DrawerBody>
            <VStack mt="3em">
              <Button
                variant={isResidencial ? 'outline' : ''}
                colorScheme={isResidencial ? 'red' : ''}
                mb={4}
                onClick={handleResidencialClick}
              >
                Para Você
              </Button>
              <Button
                variant={isEmpresa ? 'outline' : ''}
                colorScheme={isEmpresa ? 'red' : ''}
                mb={4}
                onClick={handleEmpresaClick}
              >
                Para Empresa
              </Button>
              <Button variant="solid" colorScheme="red">
                Assinar
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex
        as="header"
        align="center"
        justify="space-between"
        px={16}
        py={8}
        bg={isLight ? 'white' : 'gray.800'}
      >
        {!isLogoLoaded && <Spinner />}
        <Image
          src={isLight ? logo : logoDark}
          boxSize="5em"
          onLoad={handleLogoLoad}
          style={isLogoLoaded ? {} : { display: 'none' }}
        />
        <Flex display={{ base: 'none', md: 'flex' }}>
          <Button
            variant={isResidencial ? 'outline' : ''}
            colorScheme={isResidencial ? 'red' : ''}
            mr={4}
            onClick={handleResidencialClick}
          >
            Para Você
          </Button>
          <Button
            variant={isEmpresa ? 'outline' : ''}
            colorScheme={isEmpresa ? 'red' : ''}
            mr={4}
            onClick={handleEmpresaClick}
          >
            Para Empresa
          </Button>
          <Button variant="solid" colorScheme="red">
            Assinar
          </Button>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={() => setIsOpen(true)}
          display={{ base: 'block', md: 'none' }}
          ml={2}
        />
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={isLight ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
}

export default Header;
