import {
  Center,
  ChakraProvider,
  Divider,
  Flex,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
import { JsonUtils } from "./utils/convertJson";
import { JavaSpringUtils } from "./utils/convertToBean";

export default function App() {
  const [jsonConverted, setJsonConverted] = useState<string>("");
  const [path, setPath] = useState<string>("");

  function convert(object: string) {
    const objects = JsonUtils.convertToArrayOfObject(JSON.parse(object));

    let xmlBean: string = "";

    for (const object of objects) {
      let objectAux;
      let className: string;

      if (Array.isArray(Object.entries(object)[0][1])) {
        objectAux = Object.entries(object)[0][1][0];
      } else {
        objectAux = Object.entries(object)[0][1];
      }

      className = String(Object.entries(object)[0][0]);
      className = `${className[0].toUpperCase() + className.slice(1)}DTO`;

      xmlBean += JavaSpringUtils.generateBeanXml(
        objectAux as any,
        path,
        className
      );
    }

    setJsonConverted(xmlBean);
  }

  return (
    <ChakraProvider>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={10}
        width={"auto"}
        height={"100vh"}
      >
        <Stack width={"48%"} height={"80vh"}>
          <FormLabel>Path</FormLabel>
          <Input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Example: br.com.dummy.integration.rest.data.customer"
          />
          <FormLabel>JSON Object</FormLabel>
          <Textarea
            placeholder={"Type here your JSON Object"}
            height={"100%"}
            resize={"none"}
            onChange={(e) => convert(e.target.value)}
          />
        </Stack>
        <Center height={"100%"} width={"4%"}>
          <Divider orientation={"vertical"} padding={2} />
        </Center>
        <Stack width={"48%"} height={"80vh"}>
          <FormLabel>Java Spring Bean</FormLabel>
          <Textarea
            height={"100%"}
            resize={"none"}
            isReadOnly
            value={jsonConverted}
          />
        </Stack>
      </Flex>
    </ChakraProvider>
  );
}
