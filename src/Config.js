import {
  AddIcon,
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
  HStack,
  IconButton,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ChakraCarousel from "./ChakraCarousel";

import { v4 as uuidv4 } from "uuid";

import ImageCarousel from "./ImageCarousel";
import UploadService from "./services/fileUpload.js";

const DEBUG = true;

function App({ setInvalidAuth, token }) {
  const [isPersonal, setIsPersonal] = useState(true);
  const [global, setGlobal] = useState({});
  const [data, setData] = useState({});
  const [plan, setPlan] = useState(null);
  const [save, setSave] = useState(true);

  const [banner, setBanner] = useState(null);

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
    }, 120000000);
    // }, 120000);
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
      <FormBanner bannerItem={banner} />
      <Banner data={data} />
      <ImageCarousel statusEmpresa={!isPersonal} data={global} />

      <Form planItem={plan} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carrosel data={data} />
      </motion.div>
    </Flex>
  );
}

export default App;
