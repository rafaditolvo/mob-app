import {
  AddIcon,
  createIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  RepeatIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ChakraCarousel from "./ChakraCarousel";

import { v4 as uuidv4 } from "uuid";

import bg from "../src/img/mob-img.png";

import ImageCarousel from "./ImageCarousel";
import UploadService from "./services/fileUpload.js";
const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

const DEBUG = false;

function App({ setInvalidAuth, token }) {
  const [isPersonal, setIsPersonal] = useState(true);
  const [global, setGlobal] = useState({});
  const [data, setData] = useState({});
  const [plan, setPlan] = useState(null);
  const [save, setSave] = useState(true);

  const [banner, setBanner] = useState(null);
  const [description, setDescription] = useState(null);
  const [appDescription, setAppDescription] = useState(null);

  const intervalIsAuth = useRef();

  function handleCategoryPlan(category) {
    if (category == "personal") {
      setIsPersonal(true);
      setData(global.personal);
      return;
    }
    setIsPersonal(false);
    setData(global.enterprise);
  }
  function loopIsAuth() {
    const idInterval = setInterval(() => {
      isAuth();
      // }, 120000000);
    }, 60000);
    intervalIsAuth.current = idInterval;
  }
  async function isAuth() {
    console.log("isAuth?", token);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: "{}",
    };
    const response = await fetch(
      "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws/isauth",
      options
    );
    const status = await response.status;
    console.log(status);
    if (status == 403) {
      logout();
      return;
    }
  }

  function logout() {
    clearInterval(intervalIsAuth.current);
    setTimeout(() => {
      setInvalidAuth();
    }, 1);
  }

  function Carrosel({ data }) {
    function PriceWrapper({ children }) {
      return (
        <Box
          mb={4}
          //gap={2}
          shadow="base"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          borderRadius="30px"
          width="100%" // define a largura em porcentagem
        >
          {children}
        </Box>
      );
    }

    function Skeleton(data) {
      return (
        <>
          <Container
            py={2}
            px={12}
            mt="1em"
            alignItems="center"
            maxW={{
              base: "100%",
              sm: "35rem",
              md: "43.75rem",
              lg: "57.5rem",
              xl: "75rem",
              xxl: "87.5rem",
            }}
            opacity={0.2}
          >
            <Divider />
            <ChakraCarousel gap={3}>
              {Array.from([1, 2, 3]).map((_, index) => (
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
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Text>
                            <Text fontSize="3xl" color="gray.500">
                              /mês
                            </Text>
                          </HStack>
                        </Box>
                        <VStack
                          //bg={useColorModeValue('gray.50', 'gray.700')}
                          py={4}
                          borderBottomRadius={"xl"}
                        >
                          <List spacing={3} textAlign="start" px={12}>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              &nbsp;
                            </ListItem>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              &nbsp;
                            </ListItem>
                            <ListItem>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              &nbsp;
                            </ListItem>
                          </List>
                          <Box w="80%" pt={7}>
                            <Button w="full" colorScheme="gray"></Button>
                          </Box>
                        </VStack>
                      </Box>
                    </PriceWrapper>
                  </Center>
                </motion.div>
              ))}
            </ChakraCarousel>
          </Container>
        </>
      );
    }

    function handleEditPlan(plan) {
      console.log(plan);
      setPlan(plan);
    }
    function handleAddNewPlan() {
      const newData = { ...data };
      const newPlan = {
        id: uuidv4(),
        name: "Novo Plano",
        price: 0,
        features: [],
      };
      newData.pricingData.push(newPlan);
      setData(newData);
      setPlan(newPlan);
    }

    const pricingData = data?.pricingData ?? [];

    if (pricingData.length == 0) {
      return <Skeleton />;
    }

    return (
      <>
        <Container
          py={2}
          px={12}
          mt="1em"
          alignItems="center"
          maxW={{
            base: "100%",
            sm: "35rem",
            md: "43.75rem",
            lg: "57.5rem",
            xl: "75rem",
            xxl: "87.5rem",
          }}
        >
          <Divider mb={4} />
          <IconButton
            aria-label="add plano"
            background={"gray.400"}
            p={4}
            mb={4}
            icon={
              <>
                <AddIcon me={4} /> Adicionar novo plano
              </>
            }
            onClick={() => handleAddNewPlan()}
          />
          <ChakraCarousel gap={3}>
            {pricingData.length > 0 ? (
              pricingData.map((item, index) => (
                <motion.div key={`carousel_${index}`}>
                  <Center>
                    <PriceWrapper>
                      <Box position="relative">
                        <IconButton
                          aria-label="Editar plano"
                          icon={<EditIcon />}
                          onClick={() => handleEditPlan(item)}
                        />
                        <Box py={4} px={9}>
                          {item.srcImage && (
                            <Image
                              src={
                                (DEBUG
                                  ? "https://reacts3teste.s3.amazonaws.com/"
                                  : "") + item.srcImage
                              }
                              height="200"
                              width="200"
                            />
                          )}
                          <Text fontWeight="500" fontSize="2xl">
                            {item.name}
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
                          borderBottomRadius={"xl"}
                        >
                          <List spacing={3} textAlign="start" px={12}>
                            {item.features.map((feat, index) => (
                              <ListItem key={`${item.id}${index}`}>
                                <ListIcon
                                  as={FaCheckCircle}
                                  color="green.500"
                                />
                                {feat}
                              </ListItem>
                            ))}
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

  function Form({ planItem }) {
    const [planEdited, setPlanEdited] = useState(planItem);
    const [image, setImage] = useState({
      currentFile: null,
    });

    function changeValue(event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      const id = target?.id ?? null;
      const newPlan = { ...planEdited };

      if (!id) {
        newPlan[inputName] = value;
      } else {
        newPlan[inputName] = newPlan[inputName].map((reg, index) =>
          index == id ? value : reg
        );
      }
      setPlanEdited((prev) => newPlan);
    }

    function handleAddFeaturePlan() {
      const newPlan = { ...planEdited };
      newPlan.features.push("");
      setPlanEdited((prev) => newPlan);
      if (save) {
        setSave(false);
      }
    }

    // todo: ajustar remoção, deleta mais na renderização nao ajusta
    function handleRemoveFeaturePlan(featIndex) {
      const newPlan = { ...planEdited };
      newPlan.features = newPlan.features.filter(
        (_, index) => index != featIndex
      );
      setPlanEdited(newPlan);
    }
    const handleSaveForm = async () => {
      if (!token) {
        setInvalidAuth();
        return;
      }

      const newData = { ...data };

      const newPlanEdited = { ...planEdited };

      console.log("fora upload", image.currentFile);
      if (image.currentFile) {
        console.log("entrou upload");
        const srcImage = await upload();
        newPlanEdited.srcImage = srcImage;
        console.log(srcImage, "srcImage");
      }

      newData.pricingData = newData.pricingData.map((planReg) =>
        planReg.id == planEdited.id ? newPlanEdited : planReg
      );
      const newGlobal = isPersonal
        ? { ...global, ...{ personal: newData } }
        : { ...global, ...{ enterprise: newData } };
      setData(newData);
      setGlobal(newGlobal);

      if (save) {
        setSave(false);
      }
      handleClearForm();
    };
    function handleClearForm() {
      setPlan(null);
    }
    function selectFile(event) {
      setImage({
        currentFile: event.target.files[0],
        previewImage: URL.createObjectURL(event.target.files[0]),
        progress: 0,
        message: "",
      });
    }
    const upload = async () =>
      new Promise((resolve, reject) => {
        UploadService.upload(image.currentFile, token, (event) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        })
          .then((response) => {
            resolve(response.data);
            setImage({
              currentFile: null,
              previewImage: null,
              progress: 0,
              message: "",
            });
          })
          .catch((err) => {
            reject();
          });
      });
    return (
      <>
        <Modal isOpen={!!plan} isCentered onClose={handleClearForm}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalCloseButton />
            <ModalHeader>Alteração plano</ModalHeader>
            <ModalBody>
              <Stack spacing={3} width={"100%"} alignItems="center">
                <Stack alignItems="center" width={300}>
                  {!!plan && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                      />
                      {plan.srcImage && (
                        <Image
                          src={
                            (DEBUG
                              ? "https://reacts3teste.s3.amazonaws.com/"
                              : "") + plan.srcImage
                          }
                          height="200"
                          width="200"
                        />
                      )}
                      <Stack alignItems="left" width={"100%"}>
                        <Text>Plano</Text>
                        <Input
                          key="planName"
                          defaultValue={plan.name}
                          name="name"
                          onChange={(event) => changeValue(event)}
                        />
                      </Stack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>Preço</Text>
                        <Input
                          key="preco"
                          defaultValue={plan.price}
                          name="price"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack alignItems="left" width={"100%"}>
                        <Text>Caracteristicas</Text>
                        <IconButton
                          aria-label="Editar plano"
                          width={20}
                          icon={<AddIcon />}
                          onClick={handleAddFeaturePlan}
                        />
                      </HStack>
                      {planEdited.features.map((feat, index) => (
                        <HStack alignItems="left" width={"100%"} key={uuidv4()}>
                          <Input
                            defaultValue={feat}
                            name="features"
                            id={index}
                            onChange={(event) => changeValue(event)}
                          />
                          <IconButton
                            aria-label="Features"
                            width={20}
                            icon={<DeleteIcon />}
                            onClick={() => handleRemoveFeaturePlan(index)}
                          />
                        </HStack>
                      ))}

                      <Divider my={8} />
                      <HStack alignItems="left">
                        <IconButton
                          aria-label="salvar plano"
                          background={"green.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Salvar</Text>
                              <EditIcon />
                            </>
                          }
                          onClick={handleSaveForm}
                        />
                        <IconButton
                          aria-label="Limpar plano"
                          background={"gray.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Voltar</Text>
                              <RepeatIcon />
                            </>
                          }
                          onClick={handleClearForm}
                        />
                      </HStack>
                    </>
                  )}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  function BoxSaveAlert() {
    return (
      <Box
        bg={save ? "green.400" : "red.300"}
        w="100%"
        p={4}
        color="white"
        display="flex"
        justifyContent="justify-between"
      >
        <IconButton
          aria-label="Sair"
          p={5}
          background={"gray.700"}
          icon={
            <>
              <LockIcon me={5} /> <Text fontWeight={"bold"}>Sair</Text>
            </>
          }
          onClick={logout}
        />
        <Spacer />
        <Box display="flex" justifyContent="flex-end">
          {!save && (
            <IconButton
              aria-label="Salvar"
              p={5}
              background={"red.600"}
              icon={
                <>
                  <TriangleDownIcon me={5} />{" "}
                  <Text fontWeight={"bold"}>Salvar!</Text>
                </>
              }
              onClick={() => salvarJSON()}
            />
          )}
          {save && <Text fontWeight={"bold"}>Salvo!</Text>}
        </Box>
      </Box>
    );
  }

  function Banner({ data }) {
    function BannerWrapper({ children }) {
      return (
        <Box
          mb={4}
          //gap={2}
          shadow="base"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.500")}
          borderRadius="30px"
          width="100%" // define a largura em porcentagem
        >
          {children}
        </Box>
      );
    }

    function handleEditBanner(banner) {
      setBanner(banner);
    }
    function handleAddNewBanner() {
      const newData = { ...data };
      const newBanner = {
        id: uuidv4(),
        src: "",
      };
      newData.banners.push(newBanner);
      setData(newData);
      setBanner(newBanner);
    }

    // console.log(data.banners);

    const bannersData = data?.banners ?? [];

    if (bannersData.length == 0) {
      return <></>;
    }
    return (
      <>
        <Container
          py={2}
          px={12}
          mt="1em"
          alignItems="center"
          maxW={{
            base: "100%",
            sm: "35rem",
            md: "43.75rem",
            lg: "57.5rem",
            xl: "75rem",
            xxl: "87.5rem",
          }}
        >
          <Divider mb={4} />
          <IconButton
            aria-label="add bannero"
            background={"gray.400"}
            p={4}
            mb={4}
            icon={
              <>
                <AddIcon me={4} /> Adicionar novo Banner
              </>
            }
            onClick={() => handleAddNewBanner()}
          />
          <ChakraCarousel gap={3}>
            {bannersData.length > 0 ? (
              bannersData.map((item, index) => (
                <motion.div key={`carousel_${index}`}>
                  <Center>
                    <BannerWrapper>
                      <Box position="relative">
                        <IconButton
                          aria-label="Editar bannero"
                          icon={<EditIcon />}
                          onClick={() => handleEditBanner(item)}
                        />
                        <Box py={4} px={9}>
                          {item.src && (
                            <Image
                              src={
                                (DEBUG
                                  ? "https://reacts3teste.s3.amazonaws.com/"
                                  : "") + item.src
                              }
                              maxHeight={200}
                              maxWidth={200}
                            />
                          )}
                        </Box>
                      </Box>
                    </BannerWrapper>
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

  function FormBanner({ bannerItem }) {
    const [bannerEdited, setBannerEdited] = useState(bannerItem);
    const [image, setImage] = useState({
      currentFile: null,
    });

    function changeValue(event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      const id = target?.id ?? null;
      const newBanner = { ...bannerEdited };

      if (!id) {
        newBanner[inputName] = value;
      } else {
        newBanner[inputName] = newBanner[inputName].map((reg, index) =>
          index == id ? value : reg
        );
      }
      setBannerEdited((prev) => newBanner);
    }

    function handleAddFeatureBanner() {
      const newBanner = { ...bannerEdited };
      newBanner.features.push("");
      setBannerEdited((prev) => newBanner);
      if (save) {
        setSave(false);
      }
    }

    // todo: ajustar remoção, deleta mais na renderização nao ajusta
    function handleRemoveFeatureBanner(featIndex) {
      const newBanner = { ...bannerEdited };
      newBanner.features = newBanner.features.filter(
        (_, index) => index != featIndex
      );
      setBannerEdited(newBanner);
    }
    const handleSaveBanner = async () => {
      if (!token) {
        setInvalidAuth();
        return;
      }

      const newData = { ...data };

      const newBannerEdited = { ...bannerEdited };

      console.log(newData, newBannerEdited);

      console.log("fora upload", image.currentFile);
      if (image.currentFile) {
        console.log("entrou upload");
        const src = await upload();
        newBannerEdited.src = src;
        console.log(src, "src");
      }

      newData.banners = newData.banners.map((bannerReg) =>
        bannerReg.id == bannerEdited.id ? newBannerEdited : bannerReg
      );
      const newGlobal = isPersonal
        ? { ...global, ...{ personal: newData } }
        : { ...global, ...{ enterprise: newData } };

      console.log("newGlobal", newGlobal);
      setData(newData);
      setGlobal(newGlobal);

      if (save) {
        setSave(false);
      }
      handleClearForm();
    };
    function handleClearForm() {
      setBanner(null);
    }
    function selectFile(event) {
      setImage({
        currentFile: event.target.files[0],
        previewImage: URL.createObjectURL(event.target.files[0]),
        progress: 0,
        message: "",
      });
    }
    const upload = async () =>
      new Promise((resolve, reject) => {
        UploadService.upload(image.currentFile, token, (event) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        })
          .then((response) => {
            resolve(response.data);
            setImage({
              currentFile: null,
              previewImage: null,
              progress: 0,
              message: "",
            });
          })
          .catch((err) => {
            reject();
          });
      });
    return (
      <>
        <Modal isOpen={!!banner} isCentered onClose={handleClearForm}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalCloseButton />
            <ModalHeader>Alteração banner</ModalHeader>
            <ModalBody>
              <Stack spacing={3} width={"100%"} alignItems="center">
                <Stack alignItems="center" width={300}>
                  {!!banner && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                      />
                      {banner.src && (
                        <Image
                          src={
                            (DEBUG
                              ? "https://reacts3teste.s3.amazonaws.com/"
                              : "") + banner.src
                          }
                          height="200"
                          width="200"
                        />
                      )}
                      <Divider my={8} />
                      <HStack alignItems="left">
                        <IconButton
                          aria-label="salvar banner"
                          background={"green.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Salvar</Text>
                              <EditIcon />
                            </>
                          }
                          onClick={handleSaveBanner}
                        />
                        <IconButton
                          aria-label="Limpar bannero"
                          background={"gray.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Voltar</Text>
                              <RepeatIcon />
                            </>
                          }
                          onClick={handleClearForm}
                        />
                      </HStack>
                    </>
                  )}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  function Description({ data }) {
    const descriptionData = data?.description ?? false;

    function handleEditDescription(desc) {
      setDescription(desc);
    }

    return (
      <>
        <Container
          py={2}
          px={12}
          mt="1em"
          alignItems="center"
          maxW={{
            base: "100%",
            sm: "35rem",
            md: "43.75rem",
            lg: "57.5rem",
            xl: "75rem",
            xxl: "87.5rem",
          }}
        >
          <Divider mb={4} />
          <IconButton
            aria-label="add bannero"
            background={"gray.400"}
            p={4}
            mb={4}
            icon={
              <>
                <AddIcon me={4} /> Editar
              </>
            }
            onClick={() => handleEditDescription(descriptionData)}
          />
          {descriptionData && (
            <Box bg={"gray.800"} position={"relative"}>
              <Flex
                flex={1}
                zIndex={0}
                display={{ base: "none", lg: "flex" }}
                backgroundImage="url('/templates/stats-grid-with-image.png')"
                backgroundSize={"cover"}
                backgroundPosition="center"
                position={"absolute"}
                width={"100%"}
                insetY={0}
                right={0}
              >
                <Flex w={"full"} h={"full"} />
              </Flex>
              <Container maxW={"7xl"} zIndex={10} position={"relative"}>
                <Stack direction={{ base: "column", lg: "row" }}>
                  <Stack
                    flex={1}
                    color={"red.700"}
                    justify={{ lg: "center" }}
                    py={{ base: 4, md: 20, xl: 60 }}
                  >
                    <Box mb={{ base: 8, md: 20 }}>
                      <Text
                        fontFamily={"heading"}
                        fontWeight={700}
                        textTransform={"uppercase"}
                        mb={3}
                        fontSize={"xl"}
                        color={"gray.500"}
                      >
                        {descriptionData.h2}
                      </Text>
                      <Heading
                        color={"white"}
                        mb={5}
                        fontSize={{ base: "3xl", md: "5xl" }}
                      >
                        {descriptionData.h1}
                      </Heading>
                      <Text fontSize={"xl"} color={"gray.400"}>
                        {descriptionData.h3}
                      </Text>
                    </Box>
                    <Flex flex={1}>
                      <Image src={bg}></Image>
                    </Flex>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                      {descriptionData.items.map((item, index) => (
                        <Box key={index}>
                          <Text
                            fontFamily={"heading"}
                            fontSize={"3xl"}
                            color={"white"}
                            mb={3}
                          >
                            {item.title}
                          </Text>
                          <Text fontSize={"xl"} color={"gray.400"}>
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
          )}
        </Container>
      </>
    );
  }

  function FormDescription({ descriptionItem }) {
    const [descriptionEdited, setDescriptionEdited] = useState(descriptionItem);

    function changeValue(event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      const id = target?.id ?? null;
      const newDescription = { ...descriptionEdited };

      if (!id) {
        newDescription[inputName] = value;
      } else {
        const [name, prop] = inputName.split("_");
        newDescription[name] = newDescription[name].map((reg, index) => {
          if (index == id) {
            reg[prop] = value;
          }
          return reg;
        });
      }
      setDescriptionEdited((prev) => newDescription);
    }

    function handleAddFeatureDescription() {
      const newDescription = { ...descriptionEdited };
      const newItem = {
        id: uuidv4(),
        title: "",
        text: "",
      };
      newDescription.items.push(newItem);
      setDescriptionEdited((prev) => newDescription);
      if (save) {
        setSave(false);
      }
    }

    // todo: ajustar remoção, deleta mais na renderização nao ajusta
    function handleRemoveFeatureDescription(id) {
      const newDescription = { ...descriptionEdited };
      newDescription.items = newDescription.items.filter(
        (reg, index) => reg.id != id
      );
      setDescriptionEdited(newDescription);
    }
    const handleSaveForm = async () => {
      if (!token) {
        setInvalidAuth();
        return;
      }

      const newData = { ...data };

      const newDescriptionEdited = { ...descriptionEdited };

      newData.description = newDescriptionEdited;
      const newGlobal = isPersonal
        ? { ...global, ...{ personal: newData } }
        : { ...global, ...{ enterprise: newData } };

      setData(newData);
      setGlobal(newGlobal);

      if (save) {
        setSave(false);
      }
      handleClearForm();
    };
    function handleClearForm() {
      setDescription(null);
    }

    return (
      <>
        <Modal isOpen={!!description} isCentered onClose={handleClearForm}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalCloseButton />
            <ModalHeader>Alteração descrição</ModalHeader>
            <ModalBody>
              <Stack spacing={3} width={"100%"} alignItems="center">
                <Stack alignItems="center" width={300}>
                  {!!description && (
                    <>
                      <Stack alignItems="left" width={"100%"}>
                        <HStack
                          justify={"center"}
                          alignItems="left"
                          width={"100%"}
                        >
                          <Text>h2</Text>
                          <Input
                            key="h2"
                            defaultValue={description.h2}
                            name="h2"
                            onChange={(event) => changeValue(event)}
                          />
                        </HStack>
                      </Stack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>h1</Text>
                        <Input
                          key="h1"
                          defaultValue={description.h1}
                          name="h1"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>h3</Text>
                        <Input
                          key="h3"
                          defaultValue={description.h3}
                          name="h3"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack alignItems="left" width={"100%"}>
                        <Text>Itens</Text>
                        <IconButton
                          aria-label="Add itens"
                          width={20}
                          icon={<AddIcon />}
                          onClick={handleAddFeatureDescription}
                        />
                      </HStack>
                      {descriptionEdited.items.map((feat, index) => (
                        <HStack alignItems="left" width={"100%"} key={feat.id}>
                          <VStack alignItems="center" my={4} width={"100%"}>
                            <Input
                              defaultValue={feat.title}
                              name={`items_title`}
                              id={index}
                              onChange={(event) => changeValue(event)}
                            />
                            <Textarea
                              defaultValue={feat.text}
                              name={`items_text`}
                              height={20}
                              id={index}
                              onChange={(event) => changeValue(event)}
                            />
                          </VStack>

                          <IconButton
                            mt="auto"
                            aria-label="Features"
                            width={20}
                            icon={<DeleteIcon />}
                            onClick={() =>
                              handleRemoveFeatureDescription(feat.id)
                            }
                          />
                        </HStack>
                      ))}

                      <Divider my={8} />
                      <HStack alignItems="left">
                        <IconButton
                          aria-label="salvar descriptiono"
                          background={"green.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Salvar</Text>
                              <EditIcon />
                            </>
                          }
                          onClick={handleSaveForm}
                        />
                        <IconButton
                          aria-label="Limpar descriptiono"
                          background={"gray.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Voltar</Text>
                              <RepeatIcon />
                            </>
                          }
                          onClick={handleClearForm}
                        />
                      </HStack>
                    </>
                  )}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  function AppDescription({ data }) {
    const appDescriptionData = data?.appDescription ?? false;

    function handleEditAppDescription(desc) {
      setAppDescription(desc);
    }

    return (
      <>
        <Container maxW={"7xl"}>
          <IconButton
            aria-label="add bannero"
            background={"gray.400"}
            p={4}
            mb={4}
            icon={
              <>
                <AddIcon me={4} /> Editar
              </>
            }
            onClick={() => handleEditAppDescription(appDescriptionData)}
          />
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                <Text as={"span"} position={"relative"}>
                  {appDescriptionData.h1}
                </Text>

                <br />
                <Text as={"span"} color={"red.600"}>
                  {appDescriptionData.appName}
                </Text>
              </Heading>
              <Text color={"gray.500"}>{appDescriptionData.h3}</Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Link href={appDescriptionData.downloadLink} passHref>
                  <Button
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    colorScheme={"red"}
                    bg={"red.400"}
                    _hover={{ bg: "red.500" }}
                  >
                    Baixar
                  </Button>
                </Link>
                <Link href={appDescriptionData.supportDownload} passHref>
                  <Button
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
                  >
                    Como Baixar
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={"center"}
              align={"center"}
              position={"relative"}
              w={"full"}
            >
              <Box
                position={"relative"}
                height={"300px"}
                rounded={"2xl"}
                mb="12em"
                width={"full"}
              >
                <Image
                  align={"center"}
                  maxHeight={600}
                  src={
                    (DEBUG ? "https://reacts3teste.s3.amazonaws.com/" : "") +
                    appDescriptionData.appImage
                  }
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </>
    );
  }

  function FormAppDescription({ appDescriptionItem }) {
    const [appDescriptionEdited, setAppDescriptionEdited] =
      useState(appDescriptionItem);
    const [image, setImage] = useState({
      currentFile: null,
    });

    function changeValue(event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      const newAppDescription = { ...appDescriptionEdited };

      newAppDescription[inputName] = value;

      setAppDescriptionEdited((prev) => newAppDescription);
    }

    const handleSaveForm = async () => {
      if (!token) {
        setInvalidAuth();
        return;
      }

      const newData = { ...data };

      const newAppDescriptionEdited = { ...appDescriptionEdited };

      try {
        if (image.currentFile) {
          console.log("entrou upload");
          const srcImage = await upload();
          newAppDescriptionEdited.appImage = srcImage;
        }
      } catch (e) {
        console.log("aaaa", e);
      }

      newData.appDescription = newAppDescriptionEdited;
      const newGlobal = isPersonal
        ? { ...global, ...{ personal: newData } }
        : { ...global, ...{ enterprise: newData } };

      setData(newData);
      setGlobal(newGlobal);

      if (save) {
        setSave(false);
      }
      console.log("tfim");
      handleClearForm();
    };
    function handleClearForm() {
      setAppDescription(null);
    }
    function selectFile(event) {
      setImage({
        currentFile: event.target.files[0],
        previewImage: URL.createObjectURL(event.target.files[0]),
        progress: 0,
        message: "",
      });
    }
    const upload = async () =>
      new Promise((resolve, reject) => {
        UploadService.upload(image.currentFile, token, (event) => {
          console.log(Math.round((100 * event.loaded) / event.total));
        })
          .then((response) => {
            resolve(response.data);
            setImage({
              currentFile: null,
              previewImage: null,
              progress: 0,
              message: "",
            });
          })
          .catch((err) => {
            reject();
          });
      });
    return (
      <>
        <Modal isOpen={!!appDescription} isCentered onClose={handleClearForm}>
          <ModalOverlay />
          <ModalContent w="90%">
            <ModalCloseButton />
            <ModalHeader>Alteração appDescriptiono</ModalHeader>
            <ModalBody>
              <Stack spacing={3} width={"100%"} alignItems="center">
                <Stack alignItems="center" width={300}>
                  {!!appDescription && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                      />
                      {appDescription.appImage && (
                        <Image
                          src={
                            (DEBUG
                              ? "https://reacts3teste.s3.amazonaws.com/"
                              : "") + appDescription.appImage
                          }
                          height="200"
                          width="200"
                        />
                      )}
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>H1</Text>
                        <Input
                          key="h1"
                          defaultValue={appDescription.h1}
                          name="h1"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>App Name</Text>
                        <Input
                          key="appName"
                          defaultValue={appDescription.appName}
                          name="appName"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>Texto</Text>
                        <Input
                          key="h3"
                          defaultValue={appDescription.h3}
                          name="h3"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>Download Link</Text>
                        <Input
                          key="downloadLink"
                          defaultValue={appDescription.downloadLink}
                          name="downloadLink"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>
                      <HStack
                        justify={"center"}
                        alignItems="left"
                        width={"100%"}
                      >
                        <Text>Support Download</Text>
                        <Input
                          key="supportDownload"
                          defaultValue={appDescription.supportDownload}
                          name="supportDownload"
                          onChange={(event) => changeValue(event)}
                        />
                      </HStack>

                      <Divider my={8} />
                      <HStack alignItems="left">
                        <IconButton
                          aria-label="salvar appDescriptiono"
                          background={"green.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Salvar</Text>
                              <EditIcon />
                            </>
                          }
                          onClick={handleSaveForm}
                        />
                        <IconButton
                          aria-label="Limpar appDescriptiono"
                          background={"gray.400"}
                          px={10}
                          icon={
                            <>
                              <Text mx={2}>Voltar</Text>
                              <RepeatIcon />
                            </>
                          }
                          onClick={handleClearForm}
                        />
                      </HStack>
                    </>
                  )}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  async function fetchJson(json) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(json),
    };
    const response = await fetch(
      "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws/save",
      options
    );
    const status = await response.status;
    if (status == 403) {
      setInvalidAuth();
      return;
    } else if (status == 200) {
      setSave(true);
    }
    return;
  }

  async function salvarJSON() {
    if (!token || token == "") {
      setInvalidAuth();
    }
    await fetchJson(global);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reacts3teste.s3.amazonaws.com/data.json"
      );
      const jsonData = await response.json();
      setTimeout(() => {
        if (isPersonal) {
          setData(jsonData.personal);
        } else {
          setData(jsonData.enterprise);
        }

        setGlobal(jsonData);
      }, 1);
      loopIsAuth();
    };
    //
    fetchData();
  }, []);

  // console.log("global", global);
  return (
    <Flex direction="column" height="100vh">
      <BoxSaveAlert />
      <HStack justifyContent="center" my={4}>
        <Button
          colorScheme={!isPersonal ? "gray" : "red"}
          onClick={() => {
            handleCategoryPlan("personal");
          }}
        >
          Para Você
        </Button>
        <Button
          colorScheme={isPersonal ? "gray" : "red"}
          onClick={() => {
            handleCategoryPlan("enterprise");
          }}
        >
          Para Empresa
        </Button>
      </HStack>

      <Divider my={4} />
      <h1>Banner</h1>
      <Divider my={4} />

      <FormBanner bannerItem={banner} />
      <Banner data={data} />
      <ImageCarousel statusEmpresa={!isPersonal} data={global} />

      <Divider my={4} />
      <h1>Planos</h1>
      <Divider my={4} />

      <Form planItem={plan} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carrosel data={data} />
      </motion.div>

      <Divider my={4} />
      <h1>Descrição</h1>
      <Divider my={4} />

      <Description data={data} />
      <FormDescription descriptionItem={description} />

      <Divider my={4} />
      <h1>App</h1>
      <Divider my={4} />

      <AppDescription data={data} />
      <FormAppDescription appDescriptionItem={appDescription} />
    </Flex>
  );
}

export default App;
