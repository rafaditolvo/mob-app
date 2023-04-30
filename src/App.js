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
  Icon,
  StackDivider,
  Heading,
  Stack,
  SimpleGrid,
  Badge,
  Text,
  HStack,
  Tag,
  VStack,
  useColorModeValue,
  Spinner,
  Skeleton,
  useColorMode,
  List,
  useToast,
  ListItem,
  Center,
  ListIcon,
  Image,
  useMediaQuery,
  Divider,
  InputRightElement,
  IconButton,
  Modal,
  InputGroup,
  InputLeftElement,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SkeletonCircle,
  SkeletonText,
  Spacer,
} from '@chakra-ui/react';
import { CheckCircleIcon, PhoneIcon, ChevronDownIcon } from '@chakra-ui/icons';
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
import ImageCarousel from './ImageCarousel';
import imgteste from './img/img-teste-mob.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import wpp from './img/wpp-icon.png';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('TESTE');
  //const [pricingData, setPricingData] = useState([]);
  const [isResidencial, setIsResidencial] = useState(false);
  const [isEmpresa, setIsEmpresa] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // define o estado de carregamento como verdadeiro
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1500)), // aguarda
      fetch('https://reacts3teste.s3.amazonaws.com/data.json')
        .then((res) => res.json())
        .then((res) => res),
    ]).then(([_, data]) => {
      setData(data); // atualiza os dados
      setIsLoading(false); // define o estado de carregamento como falso
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, Carrosel]);

  const handleStatusChange = (residencial, empresa) => {
    setIsResidencial(residencial);
    setIsEmpresa(empresa);
  };

  function BotaoEmpresa(id, values) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [planoId, setPlanoId] = useState(id.id);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Campo obrigatório'),
      cnpj: Yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ inválido'),
      endereco: Yup.string().required('Campo obrigatório'),
      bairro: Yup.string().required('Campo obrigatório'),

      addressNumber: Yup.string().required('Campo obrigatório'), // nova validação
      phone: Yup.string().required('Campo obrigatório'),
      cep: Yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{8}$/, 'CEP inválido'),
    });

    const handleSubmit = (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);
      onClose();
      toast({
        title: 'Dados enviados!',
        description: 'Seus dados foram enviados com sucesso.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    };

    const [autoPreenchido, setAutoPreenchido] = useState(false);

    const buscarEndereco = async (cep, setFieldValue) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );
        const { logradouro, bairro, localidade, uf } = response.data;
        const endereco = `${logradouro}`;
        const bairroVar = `${bairro}`;
        console.log(endereco);
        setFieldValue('endereco', endereco);
        setFieldValue('bairro', bairroVar);
        setAutoPreenchido(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Center>
          <Button
            w="100%"
            mt="2em"
            mb="1em"
            colorScheme="red"
            onClick={() => {
              onOpen();
            }}
          >
            Para Empresa
          </Button>
        </Center>

        <Modal isOpen={isOpen} isCentered onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalCloseButton />
            <ModalHeader color="red.400">Confirme seus Dados!</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  name: '',
                  cnpj: '',
                  bairro: '',
                  endereco: '',
                  addressNumber: '',
                  phone: '',
                  planoId: planoId,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, props) => {
                  console.log(values, 'DADOS FORMULARIO');
                  //props.setSubmitting(false);
                  onClose();
                  toast({
                    title: 'Dados enviados!',
                    description: 'Seus dados foram enviados com sucesso.',
                    status: 'success',
                    duration: 5000,
                    position: 'top-right',
                    isClosable: true,
                  });
                }}
                values={values}
                //setFieldValue={setFieldValue}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form spacing={1}>
                    <Field name="name">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.name && touched.name}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="name">Razão Social</FormLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Digite o nome"
                          />
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="cnpj">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.cnpj && touched.cnpj}
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
                          <Input
                            {...field}
                            as={InputMask}
                            mask="99.999.999/9999-99"
                            id="cnpj"
                            placeholder="__.___.___/____-__"
                            className="form-control form-input"
                          />
                          <FormErrorMessage>{errors.cnpj}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="cep">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.cep && touched.cep}
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="cep">CEP</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type="text"
                              onChange={(e) => {
                                setAutoPreenchido(false);
                                setFieldValue('cep', e.target.value);
                              }}
                            />
                            <InputRightElement>
                              <IconButton
                                icon={<FaMapMarkerAlt />}
                                type="button"
                                isDisabled={isLoading}
                                colorScheme={isLoading ? 'white' : 'red'}
                                onClick={() =>
                                  buscarEndereco(values.cep, setFieldValue)
                                }
                                variant="solid"
                                // colorScheme="blue"
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.cep}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="endereco">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.address && touched.address}
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="address">Endereço</FormLabel>
                          <Input
                            {...field}
                            id="address"
                            placeholder="Digite o endereço"
                            // defaultValue={values.address}
                          />
                          <FormErrorMessage>{errors.address}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="bairro">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.bairro && touched.bairro}
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="bairro">Bairro</FormLabel>
                          <Input
                            {...field}
                            id="bairro"
                            placeholder="Digite o Bairro"
                            // defaultValue={values.address}
                          />
                          <FormErrorMessage>{errors.address}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="addressNumber">
                      {({ field }) => (
                        <FormControl
                          isInvalid={
                            errors.addressNumber && touched.addressNumber
                          }
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="addressNumber">Número</FormLabel>
                          <Input
                            {...field}
                            id="addressNumber"
                            placeholder="Digite o número do endereço"
                          />
                          <FormErrorMessage>
                            {errors.addressNumber}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phone">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.phone && touched.phone}
                          marginTop="1.2rem"
                        >
                          <FormLabel htmlFor="phone">Telefone</FormLabel>
                          <Input
                            {...field}
                            id="phone"
                            placeholder="Digite o telefone"
                          />
                          <FormErrorMessage>{errors.phone}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Enviar
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  function BotaoResidencial(id, values) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [planoId, setPlanoId] = useState(id.id);
    const [isLoading, setIsLoading] = useState(false);
    const [autoPreenchido, setAutoPreenchido] = useState(false);
    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Campo obrigatório'),
      cpf: Yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/, 'CPF inválido')
        .test('cpf', 'CPF inválido', function (value) {
          const cpf = value?.replace(/[^\d]+/g, '');
          if (!cpf) return false;

          // Elimina CPFs invalidos conhecidos
          if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
          ) {
            return false;
          }

          // Valida 1o digito
          let add = 0;
          for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
          }
          let rev = 11 - (add % 11);
          if (rev === 10 || rev === 11) {
            rev = 0;
          }
          if (rev !== parseInt(cpf.charAt(9))) {
            return false;
          }

          // Valida 2o digito
          add = 0;
          for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
          }
          rev = 11 - (add % 11);
          if (rev === 10 || rev === 11) {
            rev = 0;
          }
          if (rev !== parseInt(cpf.charAt(10))) {
            return false;
          }

          return true;
        }),

      endereco: Yup.string().required('Campo obrigatório'),
      bairro: Yup.string().required('Campo obrigatório'),
      addressNumber: Yup.string().required('Campo obrigatório'),
      phone: Yup.string().required('Campo obrigatório'),
      cep: Yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{8}$/, 'CEP inválido'),
    });

    const handleSubmitResidencial = (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);
      onClose();
      toast({
        title: 'Dados enviados!',
        description: 'Seus dados foram enviados com sucesso.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    };

    const buscarEndereco = async (cep, setFieldValue) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );
        const { logradouro, bairro, localidade, uf } = response.data;
        const endereco = `${logradouro}`;
        const bairroVar = `${bairro}`;
        console.log(endereco);
        setFieldValue('endereco', endereco);
        setFieldValue('bairro', bairroVar);
        setAutoPreenchido(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <>
        <Center>
          <Button
            w="100%"
            mt="2em"
            mb="1em"
            colorScheme="red"
            onClick={() => {
              onOpen();
            }}
          >
            Para Você
          </Button>
        </Center>

        <Modal isOpen={isOpen} isCentered onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalHeader color="red">Confirme seus Dados!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  name: '',
                  cpf: '',
                  bairro: '',
                  endereco: '',
                  addressNumber: '',
                  phone: '',
                  planoId: planoId,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, props) => {
                  console.log(values, 'DADOS FORMULARIO');
                  props.setSubmitting(false);
                  onClose();
                  toast({
                    title: 'Dados enviados!',
                    description: 'Seus dados foram enviados com sucesso.',
                    status: 'success',
                    duration: 5000,
                    position: 'top-right',
                    isClosable: true,
                  });
                }}
                values={values}
                //setFieldValue={setFieldValue}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form spacing={2}>
                    <Field name="name">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.name && touched.name}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="name">Nome</FormLabel>
                          <Input
                            {...field}
                            id="name"
                            placeholder="Digite o nome"
                          />
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="cpf">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.cpf && touched.cpf}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="cpf">CPF</FormLabel>
                          <Input
                            {...field}
                            as={InputMask}
                            mask="999.999.999-99"
                            id="cpf"
                            placeholder="___.___.___-__"
                            value={values.cpf}
                            onChange={(event) => {
                              setFieldValue('cpf', event.target.value);
                            }}
                            className="form-control form-input"
                          />
                          <FormErrorMessage>{errors.cpf}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="cep">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.cep && touched.cep}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="cep">CEP</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type="text"
                              isDisabled={isLoading}
                              onChange={(e) => {
                                setAutoPreenchido(false);
                                setFieldValue('cep', e.target.value);
                              }}
                            />
                            <InputRightElement>
                              <IconButton
                                icon={<FaMapMarkerAlt />}
                                type="button"
                                isLoading={isLoading}
                                colorScheme={isLoading ? 'white' : 'red'}
                                onClick={() =>
                                  buscarEndereco(values.cep, setFieldValue)
                                }
                                variant="solid"
                                // colorScheme="blue"
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.cep}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="endereco">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.address && touched.address}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="address">Endereço</FormLabel>
                          <Input
                            {...field}
                            id="address"
                            placeholder="Digite o endereço"
                            // defaultValue={values.address}
                          />
                          <FormErrorMessage>{errors.address}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="bairro">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.bairro && touched.bairro}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="bairro">Bairro</FormLabel>
                          <Input
                            {...field}
                            id="bairro"
                            placeholder="Digite o Bairro"
                            // defaultValue={values.address}
                          />
                          <FormErrorMessage>{errors.address}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="addressNumber">
                      {({ field }) => (
                        <FormControl
                          isInvalid={
                            errors.addressNumber && touched.addressNumber
                          }
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="addressNumber">Número</FormLabel>
                          <Input
                            {...field}
                            id="addressNumber"
                            placeholder="Digite o número do endereço"
                          />
                          <FormErrorMessage>
                            {errors.addressNumber}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="phone">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.phone && touched.phone}
                          marginTop="1.5rem"
                        >
                          <FormLabel htmlFor="phone">Telefone</FormLabel>
                          <Input
                            {...field}
                            id="phone"
                            placeholder="Digite o telefone"
                          />
                          <FormErrorMessage>{errors.phone}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <ModalFooter>
                      <Button
                        colorScheme="red"
                        mr={3}
                        type="submit"
                        onClick={handleSubmitResidencial}
                      >
                        Enviar
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
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
        <FaWhatsapp color="white" size="md" />
      </Box>
    );
  }

  function Carrosel(props) {
    const [idCard, setIdCard] = useState(null);
    let status = props?.statusEmpresa ? 'enterprise' : 'personal';
    const [images, setImages] = useState([
      props?.data[status]?.pricingData?.srcImage,
    ]);
    if (!props?.data[status]?.pricingData) {
      return <div>Error: Invalid props</div>;
    }

    if (!props?.data[status]?.header?.h1.length) {
      return <div>Error: Invalid HEADER props</div>;
    }
    function handleClick(id) {
      setIdCard(id);
    }

    function formatCurrency(value) {
      return `R$ ${value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}`;
    }

    return (
      <Box mt="4em">
        <Container
          py={5}
          px={5}
          maxW={{
            base: '100%',
            sm: '35rem',
            md: '43.75rem',
            lg: '57.5rem',
            xl: '75rem',
            xxl: '90.5rem',
          }}
        >
          <VStack spacing={2}>
            <Heading as="h1" mb="2em" fontSize="2xl" fontWeight="hairline">
              {props?.data[status].header.h1.length}
            </Heading>
            <Spacer />
          </VStack>
          {props.isLoading ? ( // verifica se está carregando e exibe o Spinner
            <Box padding="6" mt="2em" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          ) : (
            <ChakraCarousel gap={32}>
              {props?.data[status].pricingData.map((item, index) =>
                item ? (
                  <Flex
                    key={item.id}
                    boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                    justifyContent="space-between"
                    flexDirection="column"
                    overflow="hidden"
                    //backgroundColor="gray.100"
                    rounded={20}
                    h="100%"
                    w="80%"
                    flex={1}
                    p={5}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      maxW={{
                        base: '100%',
                        sm: '35rem',
                        md: '43.75rem',
                        lg: '57.5rem',
                        xl: '75rem',
                        xxl: '90.5rem',
                      }}
                    >
                      <VStack mb={6}>
                        <Center>
                          <Image
                            src={item.srcImage}
                            type="image/svg+xml"
                            maxHeight="300"
                            maxWidth="400"
                          />
                        </Center>
                        <Heading
                          fontSize={{ base: '3xl', md: '5xl' }}
                          textAlign="left"
                          mb={2}
                        >
                          {item.name}
                        </Heading>
                        <Heading
                          fontSize={{ base: '4xl', md: '4xl' }}
                          textAlign="left"
                          mb={2}
                        >
                          {formatCurrency(item.price)}
                        </Heading>
                      </VStack>
                    </motion.div>

                    <Center>
                      <Box maxW="100%" mt="1em">
                        <List spacing={2} maxW="100%">
                          {item.features.map((feature, index) => (
                            <ListItem key={index}>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              {feature}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Center>
                    <motion.div whileTap={{ rotate: 0, scale: 0.85 }}>
                      <Flex justifyContent="center">
                        {isEmpresa ? (
                          <BotaoEmpresa id={item.id} />
                        ) : (
                          <BotaoResidencial id={item.id} />
                        )}
                      </Flex>
                    </motion.div>
                  </Flex>
                ) : (
                  <Box padding="6" boxShadow="lg" bg="white"></Box>
                ),
              )}
            </ChakraCarousel>
          )}{' '}
        </Container>
        <Spacer />
      </Box>
    );
  }

  return (
    <div style={{ touchAction: 'pan-y' }}>
      <Flex direction="column" height="10vh">
        <Header onStatusChange={handleStatusChange} data={data} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          //whileTap={{ rotate: 5, scale: 0.75 }}
        >
          <ImageCarousel statusEmpresa={isEmpresa} data={data} />
          <Divider />
          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <Carrosel
              statusEmpresa={isEmpresa}
              data={data}
              isLoading={isLoading}
            />
          )}
          <Divider />
          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <CardFooter statusEmpresa={isEmpresa} data={data} />
          )}

          <Divider />

          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <AppContent statusEmpresa={isEmpresa} data={data} />
          )}

          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <WhatsAppButton />
          )}

          <Divider />

          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <FAQ statusEmpresa={isEmpresa} data={data} />
          )}

          {isLoading ? (
            <Box padding="6" boxShadow="lg">
              <SkeletonText
                mt="4"
                noOfLines={8}
                spacing="4"
                skeletonHeight="20"
              />
            </Box>
          ) : (
            <Footer statusEmpresa={isEmpresa} data={data} />
          )}
        </motion.div>
      </Flex>
    </div>
  );
}

export default App;
