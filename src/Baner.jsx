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

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Image
        // bgGradient={'linear(to-r, gray.800 10%, transparent)'}
        w={'full'}
        h={'full'}
        objectFit=""
        bgColor="red.800"
        height={{ base: '100px', md: '200px' }}
        width="100%"
      />
    </motion.div>
  );
}

export default Banner;
