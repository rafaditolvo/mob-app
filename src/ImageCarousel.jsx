import {
  Box,
  Image,
  useBreakpointValue,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSwipeable } from 'react-swipeable';

const PREV = 'PREV';
const NEXT = 'NEXT';

export default function ImageCarousel(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const interval = 5000;

  let status = props?.statusEmpresa ? 'enterprise' : 'personal';
  useEffect(() => {
    // Verifica se props.data.enterprise.banners existe antes de mapeá-lo
    if (props?.data[status]?.banners) {
      const bannerImages = props?.data[status].banners.map(
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

        {images.length <= 1 ? (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red.500"
              size="lg"
            />
          </Center>
        ) : (
          <Image
            src={images[currentImage]}
            alt="Banner"
            objectFit="cover"
            maxH={{ base: '200px', md: '400px' }}
            maxW="full"
            onLoad={() => setIsImageLoaded(true)}
          />
        )}

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
