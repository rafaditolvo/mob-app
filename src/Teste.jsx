import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      title: 'Pacote Básico',
      subtitle: 'Até 50 Mbps',
      price: 'R$ 79,90/mês',
    },
    {
      title: 'Pacote Intermediário',
      subtitle: 'Até 100 Mbps',
      price: 'R$ 99,90/mês',
    },
    {
      title: 'Pacote Avançado',
      subtitle: 'Até 500 Mbps',
      price: 'R$ 199,90/mês',
    },
    {
      title: 'Pacote Premium',
      subtitle: 'Até 1 Gbps',
      price: 'R$ 299,90/mês',
    },
  ];

  const Card = ({ title, subtitle, price, isActive, onClick }) => {
    const cardBg = isActive ? 'green.500' : 'gray.200';
    const textColor = isActive ? 'white' : 'gray.600';
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Box
          bg={cardBg}
          borderRadius="md"
          boxShadow="md"
          p={6}
          textAlign="center"
          cursor="pointer"
        >
          <Heading as="h3" size="md" color={textColor}>
            {title}
          </Heading>
          <Text color={textColor} mt={2}>
            {subtitle}
          </Text>
          <Text color={textColor} fontWeight="bold" mt={4}>
            {price}
          </Text>
          <Button
            variant="outline"
            colorScheme="white"
            borderColor={textColor}
            mt={4}
          >
            Assinar
          </Button>
        </Box>
      </motion.div>
    );
  };

  const handleSwipe = ({ dir }) => {
    const lastIndex = cards.length - 1;
    let newIndex;
    if (dir === 'Right') {
      newIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else {
      newIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    }
    setActiveIndex(newIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe({ dir: 'Left' }),
    onSwipedRight: () => handleSwipe({ dir: 'Right' }),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      maxW={{ base: '100%', md: '600px' }}
      {...swipeHandlers}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          price={card.price}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </Flex>
  );
};

export default Carousel;
