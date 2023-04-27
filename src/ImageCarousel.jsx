import { Box, Image, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSwipeable } from 'react-swipeable';

const PREV = 'PREV';
const NEXT = 'NEXT';

export default function ImageCarousel(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);

  // Intervalo de tempo em milissegundos
  const interval = 5000;

  useEffect(() => {
    // Verifica se props.data.enterprise.banners existe antes de mapeá-lo
    if (props?.data?.personal?.banners) {
      const bannerImages = props.data.enterprise.banners.map(
        (banner) => banner.src,
      );
      setImages(bannerImages);
    }

    const intervalId = setInterval(handleNext, interval);
    return () => clearInterval(intervalId);
  }, [props]);

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const slide = (type) => {
    if (type === PREV) {
      handlePrev();
    } else if (type === NEXT) {
      handleNext();
    }
  };

  const handlePrev = () =>
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const showChevrons = useBreakpointValue({ base: true, md: true });

  return (
    <div {...handlers}>
      <Box position="relative" h={{ base: '200px', md: '400px' }}>
        {showChevrons && (
          <>
            <Box
              position="absolute"
              top="50%"
              left="0"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={handlePrev}
            >
              <ChevronLeftIcon fontSize="2xl" />
            </Box>
            <Box
              position="absolute"
              top="50%"
              right="0"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={handleNext}
            >
              <ChevronRightIcon fontSize="2xl" />
            </Box>
          </>
        )}
        <Image
          src={images[currentImage]}
          alt="Carousel"
          objectFit="cover"
          h={{ base: '200px', md: '400px' }}
          w="full"
        />
        <Box
          position="absolute"
          bottom="10px"
          left="50%"
          transform="translateX(-50%)"
          display="flex"
          justifyContent="center"
          w="full"
        >
          {images.map((_, index) => (
            <Box
              key={index}
              h="10px"
              w="10px"
              borderRadius="full"
              bg={index === currentImage ? 'white' : 'gray.300'}
              ml={index !== 0 ? '10px' : '0'}
              cursor="pointer"
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}
