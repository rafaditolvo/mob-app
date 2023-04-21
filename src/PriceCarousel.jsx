import { Box } from "@chakra-ui/react";
//import { Carousel, CarouselItem, CarouselItems } from "chakra-framer-carousel";
import PriceCard from "./PriceCard";

function PriceCarousel() {
  const packages = [
    {
      name: "Pacote Básico",
      price: "R$ 50/mês",
      features: ["10GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Intermediário",
      price: "R$ 80/mês",
      features: ["20GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Avançado",
      price: "R$ 120/mês",
      features: ["50GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Avançado 2",
      price: "R$ 150/mês",
      features: ["100GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Avançado 3",
      price: "R$ 180/mês",
      features: ["150GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Avançado 4",
      price: "R$ 200/mês",
      features: ["200GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
    {
      name: "Pacote Avançado 5",
      price: "R$ 220/mês",
      features: ["250GB de internet", "Sem fidelidade", "Atendimento 24h"],
    },
  ];

  return (
    <Box maxWidth="900px" mx="auto">
      {packages.map((pkg, index) => (
        <PriceCard index={index} key={pkg.name}>
          <PriceCard {...pkg} />
        </PriceCard>
      ))}
    </Box>
  );
}

export default PriceCarousel;
