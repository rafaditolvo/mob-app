import { useState } from "react";
import { Input } from "@chakra-ui/react";

export default function CpfInput(props) {
  const [cpf, setCpf] = useState("");

  function handleCpfChange(event) {
    const { value } = event.target;
    const regex = /^([\d]{0,3})([\d]{0,3})([\d]{0,3})([\d]{0,2})$/;

    const newValue = value.replace(/\D/g, "").slice(0, 11);
    const maskedValue = newValue.replace(regex, (_, p1, p2, p3, p4) => {
      let parts = [p1, p2, p3].filter(Boolean);
      if (p4) parts.push(p4);
      return parts.join(".");
    });

    setCpf(maskedValue);
    props.onChange(newValue); // Alteração aqui: passando o valor sem a máscara
  }

  return (
    <input type="text" {...props} value={cpf} onChange={handleCpfChange} />
  );
}
